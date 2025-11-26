// Simple in-memory cache (for MVP)
// In production, use Redis
interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry<any>>();

export function get<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) {
    return null;
  }

  if (entry.expiresAt < Date.now()) {
    cache.delete(key);
    return null;
  }

  return entry.value as T;
}

export function set<T>(key: string, value: T, ttlSeconds: number): void {
  cache.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });

  // Cleanup expired entries periodically
  if (cache.size > 10000) {
    const now = Date.now();
    for (const [k, v] of cache.entries()) {
      if (v.expiresAt < now) {
        cache.delete(k);
      }
    }
  }
}

export function del(key: string): void {
  cache.delete(key);
}

export function clear(): void {
  cache.clear();
}
