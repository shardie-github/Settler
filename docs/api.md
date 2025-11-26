# Settler API Reference

Complete API reference for the Settler Reconciliation API.

## Base URL

```
Production: https://api.settler.io
Development: http://localhost:3000
```

## Authentication

All API requests require authentication via API key or JWT token.

### API Key

Include your API key in the `X-API-Key` header:

```bash
curl -H "X-API-Key: sk_your_api_key" https://api.settler.io/api/v1/jobs
```

### JWT Token

Include a Bearer token in the `Authorization` header:

```bash
curl -H "Authorization: Bearer your_jwt_token" https://api.settler.io/api/v1/jobs
```

## Rate Limiting

- **Limit**: 100 requests per 15 minutes per IP
- **Header**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

## Jobs API

### Create Reconciliation Job

```http
POST /api/v1/jobs
Content-Type: application/json
X-API-Key: sk_your_api_key

{
  "name": "Shopify-Stripe Reconciliation",
  "source": {
    "adapter": "shopify",
    "config": {
      "apiKey": "your_shopify_api_key",
      "shopDomain": "your-shop.myshopify.com"
    }
  },
  "target": {
    "adapter": "stripe",
    "config": {
      "apiKey": "sk_your_stripe_secret_key"
    }
  },
  "rules": {
    "matching": [
      {
        "field": "order_id",
        "type": "exact"
      },
      {
        "field": "amount",
        "type": "exact",
        "tolerance": 0.01
      },
      {
        "field": "date",
        "type": "range",
        "days": 1
      }
    ],
    "conflictResolution": "last-wins"
  },
  "schedule": "0 2 * * *"
}
```

**Response:**

```json
{
  "data": {
    "id": "job_1234567890",
    "userId": "user_123",
    "name": "Shopify-Stripe Reconciliation",
    "source": { ... },
    "target": { ... },
    "rules": { ... },
    "schedule": "0 2 * * *",
    "status": "active",
    "createdAt": "2026-01-15T10:00:00Z",
    "updatedAt": "2026-01-15T10:00:00Z"
  },
  "message": "Reconciliation job created successfully"
}
```

### List Jobs

```http
GET /api/v1/jobs
X-API-Key: sk_your_api_key
```

**Response:**

```json
{
  "data": [
    {
      "id": "job_1234567890",
      "userId": "user_123",
      "name": "Shopify-Stripe Reconciliation",
      "status": "active",
      "createdAt": "2026-01-15T10:00:00Z"
    }
  ],
  "count": 1
}
```

### Get Job

```http
GET /api/v1/jobs/:id
X-API-Key: sk_your_api_key
```

### Run Job

```http
POST /api/v1/jobs/:id/run
X-API-Key: sk_your_api_key
```

**Response:**

```json
{
  "data": {
    "id": "exec_1234567890",
    "jobId": "job_1234567890",
    "status": "running",
    "startedAt": "2026-01-15T10:00:00Z"
  },
  "message": "Job execution started"
}
```

### Delete Job

```http
DELETE /api/v1/jobs/:id
X-API-Key: sk_your_api_key
```

## Reports API

### Get Reconciliation Report

```http
GET /api/v1/reports/:jobId?startDate=2026-01-01&endDate=2026-01-31&format=json
X-API-Key: sk_your_api_key
```

**Response:**

```json
{
  "data": {
    "jobId": "job_1234567890",
    "dateRange": {
      "start": "2026-01-01T00:00:00Z",
      "end": "2026-01-31T23:59:59Z"
    },
    "summary": {
      "matched": 145,
      "unmatched": 3,
      "errors": 1,
      "accuracy": 98.7,
      "totalTransactions": 149
    },
    "matches": [
      {
        "id": "match_1",
        "sourceId": "order_123",
        "targetId": "payment_456",
        "amount": 99.99,
        "currency": "USD",
        "matchedAt": "2026-01-15T10:00:00Z",
        "confidence": 1.0
      }
    ],
    "unmatched": [
      {
        "id": "unmatch_1",
        "sourceId": "order_789",
        "amount": 49.99,
        "currency": "USD",
        "reason": "No matching payment found"
      }
    ],
    "errors": [
      {
        "id": "error_1",
        "message": "Webhook timeout",
        "occurredAt": "2026-01-15T10:00:00Z"
      }
    ],
    "generatedAt": "2026-01-15T10:00:00Z"
  }
}
```

### List Reports

```http
GET /api/v1/reports
X-API-Key: sk_your_api_key
```

## Webhooks API

### Create Webhook

```http
POST /api/v1/webhooks
Content-Type: application/json
X-API-Key: sk_your_api_key

{
  "url": "https://your-app.com/webhooks/reconcile",
  "events": [
    "reconciliation.matched",
    "reconciliation.mismatch",
    "reconciliation.error"
  ],
  "secret": "optional_webhook_secret"
}
```

**Response:**

```json
{
  "data": {
    "id": "wh_1234567890",
    "userId": "user_123",
    "url": "https://your-app.com/webhooks/reconcile",
    "events": ["reconciliation.matched", "reconciliation.mismatch"],
    "secret": "whsec_abc123",
    "status": "active",
    "createdAt": "2026-01-15T10:00:00Z"
  },
  "message": "Webhook created successfully"
}
```

### List Webhooks

```http
GET /api/v1/webhooks
X-API-Key: sk_your_api_key
```

### Receive External Webhook

```http
POST /api/v1/webhooks/receive/:adapter
Content-Type: application/json

{
  "id": "evt_123",
  "type": "order.created",
  "data": { ... }
}
```

## Adapters API

### List Adapters

```http
GET /api/v1/adapters
X-API-Key: sk_your_api_key
```

**Response:**

```json
{
  "data": [
    {
      "id": "stripe",
      "name": "Stripe",
      "description": "Reconcile Stripe payments and charges",
      "version": "1.0.0",
      "config": {
        "required": ["apiKey"],
        "optional": ["webhookSecret"]
      },
      "supportedEvents": ["payment.succeeded", "charge.refunded"]
    },
    {
      "id": "shopify",
      "name": "Shopify",
      "description": "Reconcile Shopify orders and transactions",
      "version": "1.0.0",
      "config": {
        "required": ["apiKey", "shopDomain"],
        "optional": ["webhookSecret"]
      },
      "supportedEvents": ["order.created", "order.updated"]
    }
  ],
  "count": 2
}
```

### Get Adapter

```http
GET /api/v1/adapters/:id
X-API-Key: sk_your_api_key
```

## Error Responses

All errors follow this format:

```json
{
  "error": "Error Type",
  "message": "Human-readable error message",
  "details": [
    {
      "field": "field_name",
      "message": "Validation error message"
    }
  ]
}
```

### Status Codes

- `200` - Success
- `201` - Created
- `202` - Accepted (async operation started)
- `204` - No Content (successful deletion)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid auth)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

## Webhook Events

When reconciliation events occur, webhooks are sent to your configured endpoints:

### reconciliation.matched

```json
{
  "event": "reconciliation.matched",
  "data": {
    "jobId": "job_123",
    "matchId": "match_456",
    "sourceId": "order_123",
    "targetId": "payment_456",
    "amount": 99.99,
    "currency": "USD",
    "matchedAt": "2026-01-15T10:00:00Z"
  }
}
```

### reconciliation.mismatch

```json
{
  "event": "reconciliation.mismatch",
  "data": {
    "jobId": "job_123",
    "sourceId": "order_789",
    "expectedAmount": 99.99,
    "actualAmount": 89.99,
    "reason": "Amount mismatch"
  }
}
```

### reconciliation.error

```json
{
  "event": "reconciliation.error",
  "data": {
    "jobId": "job_123",
    "error": "Webhook timeout",
    "occurredAt": "2026-01-15T10:00:00Z"
  }
}
```
