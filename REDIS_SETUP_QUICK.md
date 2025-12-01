# Quick Redis Setup Guide

## ✅ What You Have

- **REST URL:** `https://pretty-buck-23396.upstash.io`
- **REST Token:** `AVtkAAIncDJjZmUxNTlhNmMyMjI0YmNjYTk5YjY4YzI2YzEyZjUyN3AyMjMzOTY`

## ⚠️ What You Still Need

**TCP Connection Details** (required for BullMQ job queues)

---

## How to Get TCP Details

1. Go to [console.upstash.com](https://console.upstash.com)
2. Click on your database: **pretty-buck-23396**
3. Look for **"TCP Endpoint"** or **"Endpoint"** section
4. Copy:
   - **Host:** `pretty-buck-23396.upstash.io` (without `:6379`)
   - **Port:** `6379`
   - **Password:** `Axxxxx...` (this is DIFFERENT from REST token!)

---

## Environment Variables for Vercel

Once you have TCP details, set these in **Vercel Dashboard → Settings → Environment Variables**:

```bash
# REST API (for caching)
UPSTASH_REDIS_REST_URL=https://pretty-buck-23396.upstash.io
UPSTASH_REDIS_REST_TOKEN=AVtkAAIncDJjZmUxNTlhNmMyMjI0YmNjYTk5YjY4YzI2YzEyZjUyN3AyMjMzOTY

# TCP Connection (for BullMQ - REQUIRED)
REDIS_HOST=pretty-buck-23396.upstash.io
REDIS_PORT=6379
REDIS_PASSWORD=your-tcp-password-from-dashboard
REDIS_TLS=true
```

**Important:**
- `REDIS_PASSWORD` = TCP password (NOT the REST token!)
- `REDIS_TLS=true` is required
- `REDIS_HOST` should NOT include `https://` or port number

---

## Testing

After setting variables, your app will automatically test the connection on startup. Check logs for:
- ✅ "Redis connected successfully"
- ❌ "Redis connection failed" (if TCP details are wrong)

---

## Security ⚠️

**Never commit these to git!** Store only in Vercel environment variables.

See `docs/UPSTASH_TCP_SETUP.md` for detailed troubleshooting.
