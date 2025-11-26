# Settler API

**Reconciliation-as-a-Service API** - Automate financial and event data reconciliation across fragmented SaaS and e-commerce ecosystems.

> Think "Resend for reconciliation"—dead-simple onboarding, pure API, usage-based pricing, and composable adapters for every platform.

## 🚀 Quick Start

```bash
npm install @settler/sdk
```

```typescript
import Settler from "@settler/sdk";

const client = new Settler({
  apiKey: "sk_your_api_key_here",
});

// Create a reconciliation job
const job = await client.jobs.create({
  name: "Shopify-Stripe Reconciliation",
  source: {
    adapter: "shopify",
    config: { apiKey: process.env.SHOPIFY_API_KEY },
  },
  target: {
    adapter: "stripe",
    config: { apiKey: process.env.STRIPE_SECRET_KEY },
  },
  rules: {
    matching: [
      { field: "order_id", type: "exact" },
      { field: "amount", type: "exact", tolerance: 0.01 },
    ],
    conflictResolution: "last-wins",
  },
});

// Get reconciliation report
const report = await client.reports.get(job.data.id);
console.log(report.data.summary);
```

## 📦 Monorepo Structure

This is a monorepo containing:

- **`packages/api`** - Serverless API server (Express, TypeScript)
- **`packages/sdk`** - npm installable TypeScript SDK (`@settler/sdk`)
- **`packages/cli`** - Command-line tool (`@settler/cli`)
- **`packages/web`** - Next.js web UI with playground
- **`packages/adapters`** - Platform adapters (Stripe, Shopify, QuickBooks, PayPal)

## 🛠️ Development

### Prerequisites

- Node.js 20+
- npm 10+

### Setup

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run development servers
npm run dev
```

### Individual Packages

```bash
# API Server
cd packages/api
npm run dev  # Runs on http://localhost:3000

# Web UI
cd packages/web
npm run dev  # Runs on http://localhost:3001

# SDK
cd packages/sdk
npm run build

# CLI
cd packages/cli
npm run build
npm link  # Link globally for testing
```

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run E2E tests
npm run test:e2e

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Adapter Guide](./docs/adapters.md)
- [Contributing Guide](./docs/contributing.md)
- [Troubleshooting](./docs/troubleshooting.md)

## 🔐 Security

- **Authentication**: API keys and JWT tokens
- **Rate Limiting**: Built-in per API key
- **Input Validation**: Zod schemas for all endpoints
- **Secrets Management**: Environment variables, encrypted storage

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Applications                  │
│         (E-commerce, SaaS, Custom Apps)                 │
└───────────────────────┬─────────────────────────────────┘
                        │
                        │ HTTPS
                        │
┌───────────────────────▼─────────────────────────────────┐
│                  Settler API Gateway                    │
│         (Express, Serverless-ready)                     │
│  - Authentication (API Keys, JWT)                        │
│  - Rate Limiting                                        │
│  - Request Validation                                   │
└───────────────────────┬─────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Job Service │ │ Webhook      │ │  Adapter      │
│  (Reconciler)│ │  Service     │ │  Registry    │
└──────────────┘ └──────────────┘ └──────────────┘
```

## 🔌 Adapters

Built-in adapters:

- **Stripe** - Payment reconciliation
- **Shopify** - Order reconciliation
- **QuickBooks** - Accounting reconciliation
- **PayPal** - Payment reconciliation

[Create custom adapters →](./docs/adapters.md)

## 📊 API Endpoints

### Jobs

- `POST /api/v1/jobs` - Create reconciliation job
- `GET /api/v1/jobs` - List all jobs
- `GET /api/v1/jobs/:id` - Get job details
- `POST /api/v1/jobs/:id/run` - Trigger job execution
- `DELETE /api/v1/jobs/:id` - Delete job

### Reports

- `GET /api/v1/reports/:jobId` - Get reconciliation report
- `GET /api/v1/reports` - List all reports

### Webhooks

- `POST /api/v1/webhooks` - Create webhook endpoint
- `GET /api/v1/webhooks` - List webhooks
- `POST /api/v1/webhooks/receive/:adapter` - Receive external webhooks

### Adapters

- `GET /api/v1/adapters` - List available adapters
- `GET /api/v1/adapters/:id` - Get adapter details

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Deploy API
vercel --prod packages/api

# Deploy Web UI
vercel --prod packages/web
```

### Docker

```bash
docker build -t settler-api packages/api
docker run -p 3000:3000 settler-api
```

### Serverless

The API is designed to be serverless-ready. Deploy to:
- Vercel Functions
- AWS Lambda
- Cloudflare Workers
- Google Cloud Functions

## 📝 License

MIT

## 🤝 Contributing

See [CONTRIBUTING.md](./docs/contributing.md) for guidelines.

## 📞 Support

- **Documentation**: [docs.settler.io](https://docs.settler.io)
- **Issues**: [GitHub Issues](https://github.com/settler/settler/issues)
- **Email**: support@settler.io

---

Made with ❤️ for developers who hate manual reconciliation.
