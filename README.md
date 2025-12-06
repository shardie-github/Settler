# 🚀 Settler App: Resend-Style Payment Reconciliation API

[![CI Status](https://img.shields.io/badge/CI-Passing-brightgreen)](https://github.com/shardie-github/Settler-API/actions)
[![Version](https://img.shields.io/badge/Version-v1.0.0-blue)](https://github.com/shardie-github/Settler-API/releases)

**Settler** is the **API-first payment reconciliation solution** built exclusively for developers. We embody a **Resend-style** philosophy to simplify complex financial services, delivering **composability and exceptional DX** where complexity previously reigned supreme.

## 💡 Why Settler? The Developer Experience (DX) Advantage

Achieve reliable, modern financial tooling with minimal effort. Settler focuses on predictable endpoints and clear data streams to handle reconciliation instantly.

- **API-First Design:** Clear, predictable, and fully documented RESTful endpoints for every workflow.
- **Composability:** Build and chain complex financial reconciliation processes using simple API primitives.
- **Simplicity:** Minimal configuration, maximal financial visibility and reliability.

## ⚡ Quick Start: Reconcile in Minutes

```bash
# 1. Install the SDK
npm install @settler/sdk

# 2. Reconcile a batch via the CLI
SETTLER_API_KEY=sk_live_... settler reconcile \
  --source=s3://settlements/deposit-001.csv \
  --target=database://transactions_2024_03
```

## 📚 Documentation & Support

- [Read the Official Settler API Documentation](https://docs.settler.dev)
- [Get Support](https://github.com/shardie-github/Settler-API/issues)
- [Website](https://settler.dev)

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19.6+ (see `.nvmrc`)
- npm 10.0.0+
- PostgreSQL 15+ (or Supabase account)
- Redis (or Upstash account)

### Installation

```bash
# Clone the repository
git clone https://github.com/shardie-github/Settler-API.git
cd Settler-API

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run db:migrate:local

# Start development server
npm run dev
```

### Development Commands

```bash
# Run linting
npm run lint
npm run lint:fix

# Run type checking
npm run typecheck

# Run tests
npm run test

# Format code
npm run format
npm run format:check

# Build all packages
npm run build
```

### Documentation

See [docs/README.md](./docs/README.md) for comprehensive documentation including:

- Architecture overview
- API documentation
- Deployment guides
- Security guidelines
- Contributing guide

---

**Note:** The internal business and investor relations documents for Settler are secured in the `/INVESTOR-RELATIONS-PRIVATE` folder and are encrypted via Git-crypt.
