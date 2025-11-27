/**
 * Pagination Utilities
 * Cursor-based pagination for better performance at scale
 */

export interface CursorPaginationParams {
  cursor?: string; // Base64 encoded cursor: {created_at, id}
  limit?: number; // Max items per page (default: 100, max: 1000)
  direction?: 'next' | 'prev'; // Pagination direction
}

export interface CursorPaginationResult<T> {
  items: T[];
  nextCursor?: string;
  prevCursor?: string;
  hasMore: boolean;
}

/**
 * Decodes a base64-encoded cursor string into pagination parameters.
 * 
 * @param cursor - Base64-encoded cursor string from previous pagination response
 * @returns Decoded cursor object with `created_at` and `id`, or `null` if invalid
 * 
 * @example
 * ```typescript
 * const cursor = decodeCursor("eyJjcmVhdGVkX2F0IjoiMjAyNC0wMS0wMSIsImlkIjoiMTIzIn0=");
 * // Returns: { created_at: "2024-01-01", id: "123" }
 * ```
 */
export function decodeCursor(cursor: string): { created_at: string; id: string } | null {
  try {
    const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

/**
 * Encodes pagination parameters into a base64-encoded cursor string.
 * 
 * @param created_at - Creation timestamp (ISO string or Date)
 * @param id - Item ID
 * @returns Base64-encoded cursor string
 * 
 * @example
 * ```typescript
 * const cursor = encodeCursor(new Date(), "123");
 * // Returns: "eyJjcmVhdGVkX2F0IjoiMjAyNC0wMS0wMSIsImlkIjoiMTIzIn0="
 * ```
 */
export function encodeCursor(created_at: string | Date, id: string): string {
  const cursor = {
    created_at: created_at instanceof Date ? created_at.toISOString() : created_at,
    id,
  };
  return Buffer.from(JSON.stringify(cursor)).toString('base64');
}

/**
 * Build cursor-based WHERE clause for SQL
 */
export function buildCursorWhereClause(
  params: CursorPaginationParams,
  tableAlias: string = ''
): { whereClause: string; params: (string | number)[]; paramIndex: number } {
  const prefix = tableAlias ? `${tableAlias}.` : '';
  const limit = Math.min(params.limit || 100, 1000);
  const direction = params.direction || 'next';
  let paramIndex = 1;
  const queryParams: (string | number)[] = [];
  let whereClause = '';

  if (params.cursor) {
    const decoded = decodeCursor(params.cursor);
    if (decoded) {
      if (direction === 'next') {
        // Get items after cursor
        whereClause = `WHERE (${prefix}created_at, ${prefix}id) < ($${paramIndex}, $${paramIndex + 1})`;
        queryParams.push(decoded.created_at, decoded.id);
        paramIndex += 2;
      } else {
        // Get items before cursor
        whereClause = `WHERE (${prefix}created_at, ${prefix}id) > ($${paramIndex}, $${paramIndex + 1})`;
        queryParams.push(decoded.created_at, decoded.id);
        paramIndex += 2;
      }
    }
  }

  return {
    whereClause,
    params: queryParams,
    paramIndex,
  };
}

/**
 * Build cursor-based ORDER BY clause
 */
export function buildCursorOrderBy(
  direction: 'next' | 'prev' = 'next',
  tableAlias: string = ''
): string {
  const prefix = tableAlias ? `${tableAlias}.` : '';
  if (direction === 'next') {
    return `ORDER BY ${prefix}created_at DESC, ${prefix}id DESC`;
  } else {
    return `ORDER BY ${prefix}created_at ASC, ${prefix}id ASC`;
  }
}

/**
 * Generate pagination response with cursors
 */
export function createCursorPaginationResponse<T extends { created_at: Date | string; id: string }>(
  items: T[],
  limit: number,
  direction: 'next' | 'prev' = 'next'
): CursorPaginationResult<T> {
  const hasMore = items.length > limit;
  const paginatedItems = hasMore ? items.slice(0, limit) : items;

  let nextCursor: string | undefined;
  let prevCursor: string | undefined;

  if (paginatedItems.length > 0) {
    const firstItem = paginatedItems[0];
    const lastItem = paginatedItems[paginatedItems.length - 1];

    if (direction === 'next') {
      // For next page, use last item as cursor
      if (hasMore) {
        nextCursor = encodeCursor(lastItem.created_at, lastItem.id);
      }
      // For previous page, use first item as cursor (reversed)
      prevCursor = encodeCursor(firstItem.created_at, firstItem.id);
    } else {
      // For prev page, use first item as cursor
      if (hasMore) {
        prevCursor = encodeCursor(firstItem.created_at, firstItem.id);
      }
      // For next page, use last item as cursor (reversed)
      nextCursor = encodeCursor(lastItem.created_at, lastItem.id);
    }
  }

  return {
    items: paginatedItems,
    nextCursor,
    prevCursor,
    hasMore,
  };
}

/**
 * Parse pagination params from query string
 */
export function parseCursorPaginationParams(req: { query: Record<string, string | undefined> }): CursorPaginationParams {
  return {
    cursor: req.query.cursor,
    limit: req.query.limit ? parseInt(req.query.limit, 10) : undefined,
    direction: (req.query.direction as 'next' | 'prev') || 'next',
  };
}
