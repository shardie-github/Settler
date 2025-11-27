# Settler Architecture Documentation

## Overview

Settler is a Reconciliation-as-a-Service API built with TypeScript, Express, and PostgreSQL. The architecture follows Domain-Driven Design (DDD) principles with clear separation of concerns.

## Architecture Layers

### 1. Domain Layer (`packages/api/src/domain/`)
- **Entities**: Core business objects (User, Tenant, Job)
- **Value Objects**: Immutable domain values
- **Domain Events**: Business events
- **Repositories**: Abstract data access interfaces

### 2. Application Layer (`packages/api/src/application/`)
- **Services**: Application services orchestrating domain logic
- **Commands**: CQRS command handlers
- **Queries**: Read operations
- **Sagas**: Long-running business processes
- **Projections**: Read models for CQRS

### 3. Infrastructure Layer (`packages/api/src/infrastructure/`)
- **Database**: PostgreSQL connection and queries
- **Events**: Event bus implementation
- **Security**: Encryption, authentication, authorization
- **Observability**: Metrics, tracing, logging
- **Resilience**: Retry, circuit breakers, dead letter queues

### 4. Presentation Layer (`packages/api/src/routes/`)
- **Routes**: Express route handlers
- **Middleware**: Request/response processing
- **Validation**: Input validation with Zod

## Key Patterns

### CQRS (Command Query Responsibility Segregation)
- Commands: Write operations (create, update, delete)
- Queries: Read operations (list, get)
- Projections: Materialized views for read optimization

### Event Sourcing
- Events stored in event store
- Aggregates rebuilt from events
- Snapshots for performance

### Saga Pattern
- Long-running transactions
- Compensating actions for rollback
- Event-driven coordination

### Multi-Tenancy
- Row-level security (RLS)
- Tenant isolation at database level
- Tenant context in all requests

## Data Flow

1. **Request** → Middleware (auth, validation, tenant)
2. **Route Handler** → Application Service
3. **Application Service** → Domain Logic
4. **Domain Logic** → Repository
5. **Repository** → Database
6. **Events** → Event Bus → Subscribers

## Security

- **Authentication**: API keys and JWT tokens
- **Authorization**: Role-based access control (RBAC)
- **Encryption**: AES-256-GCM for sensitive data
- **Input Validation**: Zod schemas for all inputs
- **Rate Limiting**: Per API key and IP
- **SSRF Protection**: Webhook URL validation

## Performance Optimizations

- **Caching**: Redis for API responses
- **Materialized Views**: Pre-computed reconciliation summaries
- **Connection Pooling**: PostgreSQL connection pool
- **Cursor Pagination**: Efficient large dataset pagination
- **Query Optimization**: Indexes on foreign keys and common queries

## Error Handling

- **Typed Errors**: Strongly-typed error classes
- **Error Middleware**: Centralized error handling
- **Error Codes**: Standardized error codes
- **Logging**: Structured logging with context

## Testing Strategy

- **Unit Tests**: Domain logic and utilities
- **Integration Tests**: API endpoints
- **E2E Tests**: Full workflows
- **Type Tests**: Type safety verification

## Deployment

- **Serverless-Ready**: Vercel, AWS Lambda compatible
- **Docker**: Containerized deployment
- **Environment Variables**: Type-safe configuration
- **Health Checks**: Liveness and readiness probes

## Monitoring

- **Metrics**: Prometheus-compatible metrics
- **Tracing**: OpenTelemetry distributed tracing
- **Logging**: Structured JSON logs
- **Alerts**: Error rate and latency monitoring
