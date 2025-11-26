/**
 * User Repository Implementation
 * PostgreSQL implementation of IUserRepository
 */

import { User, UserRole } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { query } from '../../db';

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const rows = await query<UserProps>(
      `SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL`,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return User.fromPersistence(this.mapRowToProps(rows[0]));
  }

  async findByEmail(email: string): Promise<User | null> {
    const rows = await query<UserProps>(
      `SELECT * FROM users WHERE email = $1 AND deleted_at IS NULL`,
      [email]
    );

    if (rows.length === 0) {
      return null;
    }

    return User.fromPersistence(this.mapRowToProps(rows[0]));
  }

  async save(user: User): Promise<User> {
    const props = user.toPersistence();
    const existing = await this.findById(props.id);

    if (existing) {
      // Update
      await query(
        `UPDATE users SET
          tenant_id = $1,
          email = $2,
          password_hash = $3,
          name = $4,
          role = $5,
          data_residency_region = $6,
          data_retention_days = $7,
          deleted_at = $8,
          deletion_scheduled_at = $9,
          updated_at = NOW()
        WHERE id = $10`,
        [
          props.tenantId,
          props.email,
          props.passwordHash,
          props.name,
          props.role,
          props.dataResidencyRegion,
          props.dataRetentionDays,
          props.deletedAt,
          props.deletionScheduledAt,
          props.id,
        ]
      );
    } else {
      // Insert
      await query(
        `INSERT INTO users (
          id, tenant_id, email, password_hash, name, role,
          data_residency_region, data_retention_days,
          deleted_at, deletion_scheduled_at, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())`,
        [
          props.id,
          props.tenantId,
          props.email,
          props.passwordHash,
          props.name,
          props.role,
          props.dataResidencyRegion,
          props.dataRetentionDays,
          props.deletedAt,
          props.deletionScheduledAt,
        ]
      );
    }

    return user;
  }

  async delete(id: string): Promise<void> {
    await query(`UPDATE users SET deleted_at = NOW() WHERE id = $1`, [id]);
  }

  async findAll(limit: number, offset: number): Promise<User[]> {
    const rows = await query<UserProps>(
      `SELECT * FROM users WHERE deleted_at IS NULL
       ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    return rows.map((row) => User.fromPersistence(this.mapRowToProps(row)));
  }

  async count(): Promise<number> {
    const rows = await query<{ count: string }>(
      `SELECT COUNT(*) as count FROM users WHERE deleted_at IS NULL`
    );
    return parseInt(rows[0].count, 10);
  }

  private mapRowToProps(row: any): ReturnType<typeof User.fromPersistence> extends User ? Parameters<typeof User.fromPersistence>[0] : never {
    return {
      id: row.id,
      tenantId: row.tenant_id,
      email: row.email,
      passwordHash: row.password_hash,
      name: row.name,
      role: row.role as UserRole,
      dataResidencyRegion: row.data_residency_region,
      dataRetentionDays: row.data_retention_days,
      deletedAt: row.deleted_at ? new Date(row.deleted_at) : undefined,
      deletionScheduledAt: row.deletion_scheduled_at
        ? new Date(row.deletion_scheduled_at)
        : undefined,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}

// Type helper for UserProps
type UserProps = {
  id: string;
  tenantId: string;
  email: string;
  passwordHash: string;
  name?: string;
  role: UserRole;
  dataResidencyRegion: string;
  dataRetentionDays: number;
  deletedAt?: Date;
  deletionScheduledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};
