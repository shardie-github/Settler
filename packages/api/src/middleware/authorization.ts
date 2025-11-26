import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";
import { query } from "../db";

export enum Role {
  OWNER = 'owner',
  ADMIN = 'admin',
  DEVELOPER = 'developer',
  VIEWER = 'viewer',
}

interface Permission {
  resource: string;
  actions: string[];
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.OWNER]: [{ resource: '*', actions: ['*'] }],
  [Role.ADMIN]: [
    { resource: 'jobs', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'reports', actions: ['read'] },
    { resource: 'webhooks', actions: ['create', 'read', 'update', 'delete'] },
  ],
  [Role.DEVELOPER]: [
    { resource: 'jobs', actions: ['create', 'read', 'update'] },
    { resource: 'reports', actions: ['read'] },
    { resource: 'webhooks', actions: ['create', 'read', 'update'] },
  ],
  [Role.VIEWER]: [
    { resource: 'jobs', actions: ['read'] },
    { resource: 'reports', actions: ['read'] },
    { resource: 'webhooks', actions: ['read'] },
  ],
};

export function requirePermission(resource: string, action: string) {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    try {
      // Get user role
      const users = await query<{ role: Role }>(
        'SELECT role FROM users WHERE id = $1',
        [req.userId]
      );

      if (users.length === 0) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      const userRole = users[0].role as Role;
      const permissions = rolePermissions[userRole] || [];

      // Check if user has permission
      const hasPermission = permissions.some(p =>
        (p.resource === '*' || p.resource === resource) &&
        (p.actions.includes('*') || p.actions.includes(action))
      );

      if (!hasPermission) {
        res.status(403).json({
          error: 'Forbidden',
          message: `Insufficient permissions: ${action} on ${resource}`,
        });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export async function requireResourceOwnership(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
  resourceType: 'job' | 'report' | 'webhook',
  resourceId: string
): Promise<void> {
  if (!req.userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    let tableName: string;
    let idColumn: string;

    switch (resourceType) {
      case 'job':
        tableName = 'jobs';
        idColumn = 'id';
        break;
      case 'report':
        tableName = 'reports';
        idColumn = 'id';
        break;
      case 'webhook':
        tableName = 'webhooks';
        idColumn = 'id';
        break;
      default:
        res.status(400).json({ error: 'Invalid resource type' });
        return;
    }

    // Check ownership
    const resources = await query<{ user_id: string }>(
      `SELECT user_id FROM ${tableName} WHERE ${idColumn} = $1`,
      [resourceId]
    );

    if (resources.length === 0) {
      res.status(404).json({ error: `${resourceType} not found` });
      return;
    }

    if (resources[0].user_id !== req.userId) {
      res.status(403).json({
        error: 'Forbidden',
        message: `You do not have access to this ${resourceType}`,
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
