# @settler/react-settler

**Enterprise-grade React components for building reconciliation workflows declaratively.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

React.Settler is the **best-in-show** open-source protocol for reconciliation workflows. Built with enterprise-grade security, performance optimizations, and developer experience in mind.

## Why React.Settler?

✅ **Enterprise Security** - Built-in XSS protection, input validation, audit logging  
✅ **High Performance** - Virtualized tables, memoization, optimized rendering  
✅ **Developer Friendly** - TypeScript-first, comprehensive hooks, testing utilities  
✅ **Non-Intrusive** - Works everywhere, no vendor lock-in, backend agnostic  
✅ **Production Ready** - Error boundaries, telemetry, comprehensive documentation  
✅ **Free to Start** - OSS tier includes everything you need to get started

## Pricing

- 🆓 **OSS (Free)** - Core protocol, basic components, security basics, mobile & accessibility
- 💼 **Commercial ($99/month)** - Platform integrations (Shopify, Stripe, MCP), virtualization, telemetry, audit logging
- 🏢 **Enterprise (Custom)** - SSO, RBAC, white-label, dedicated support

[View Pricing Details →](./docs/PRICING.md)  

## Installation

```bash
npm install @settler/react-settler @settler/protocol
```

## Overview

`@settler/react-settler` provides React components that let you define reconciliation UIs and rules declaratively. These components can be:

1. **Rendered as UI** - Display reconciliation dashboards with live data
2. **Compiled to JSON** - Extract configuration for backend reconciliation engines

## Quick Start

### UI Mode - Rendering a Dashboard

```tsx
import {
  ReconciliationDashboard,
  TransactionTable,
  ExceptionTable,
  MetricCard
} from '@settler/react-settler';
import type { ReconciliationTransaction, ReconciliationException } from '@settler/react-settler';

function MyDashboard() {
  const transactions: ReconciliationTransaction[] = [
    {
      id: 'tx-1',
      provider: 'stripe',
      providerTransactionId: 'ch_123',
      amount: { value: 100.00, currency: 'USD' },
      currency: 'USD',
      date: '2024-01-01T00:00:00Z',
      status: 'succeeded'
    }
  ];

  const exceptions: ReconciliationException[] = [
    {
      id: 'exc-1',
      category: 'amount_mismatch',
      severity: 'high',
      description: 'Transaction amount does not match settlement',
      resolutionStatus: 'open',
      createdAt: '2024-01-01T00:00:00Z'
    }
  ];

  return (
    <ReconciliationDashboard>
      <MetricCard title="Match Rate" value="95%" />
      <TransactionTable transactions={transactions} />
      <ExceptionTable exceptions={exceptions} />
    </ReconciliationDashboard>
  );
}
```

### Config Mode - Compiling to JSON

```tsx
import {
  ReconciliationDashboard,
  RuleSet,
  MatchRule,
  compileToJSON
} from '@settler/react-settler';

const workflow = (
  <ReconciliationDashboard>
    <RuleSet id="rules-1" name="Primary Rules" priority="exact-first">
      <MatchRule
        id="rule-1"
        name="Exact Amount Match"
        field="amount"
        type="exact"
        priority={1}
      />
      <MatchRule
        id="rule-2"
        name="Date Range Match"
        field="date"
        type="range"
        tolerance={{ days: 7 }}
        priority={2}
      />
    </RuleSet>
  </ReconciliationDashboard>
);

const jsonConfig = compileToJSON(workflow, {
  name: 'My Reconciliation Workflow',
  description: 'E-commerce payment reconciliation',
  pretty: true
});

console.log(jsonConfig);
```

## Key Features

### 🔒 Security
- **XSS Protection** - Automatic string sanitization
- **Input Validation** - Comprehensive validation hooks
- **Audit Logging** - Built-in compliance tracking
- **PII Masking** - Privacy-first telemetry

### ⚡ Performance
- **Virtualization** - Handle 10,000+ transactions smoothly
- **Memoization** - Optimized re-renders
- **Debouncing** - Efficient search and filtering
- **Lazy Loading** - Incremental data loading

### 🛠️ Developer Experience
- **TypeScript** - Full type safety
- **React Hooks** - `useValidation`, `useTelemetry`, `useSecurity`
- **Testing Utilities** - Mock data generators, test wrappers
- **Error Boundaries** - Graceful error handling

### 🏢 Enterprise Features
- **Telemetry** - Performance and usage tracking
- **Error Tracking** - Comprehensive error reporting
- **Access Control** - Security context and permissions
- **Export** - CSV, JSON, XLSX export support

## Components

### `<ReconciliationDashboard>`

Main wrapper component that provides compilation context and security.

**Props:**
- `mode?: 'ui' | 'config'` - Rendering mode (default: 'ui')
- `config?: Partial<ReconciliationConfig>` - Initial config (for config mode)
- `children: ReactNode` - Child components

### `<TransactionTable>`

Displays reconciliation transactions in a table.

**Props:**
- `transactions: ReconciliationTransaction[]` - Array of transactions
- `onSelect?: (tx: ReconciliationTransaction) => void` - Selection handler
- `showProvider?: boolean` - Show provider column (default: true)
- `showStatus?: boolean` - Show status column (default: true)

### `<ExceptionTable>`

Displays exceptions requiring manual review.

**Props:**
- `exceptions: ReconciliationException[]` - Array of exceptions
- `onResolve?: (exc: ReconciliationException) => void` - Resolution handler
- `showSeverity?: boolean` - Show severity column (default: true)
- `showCategory?: boolean` - Show category column (default: true)

### `<MetricCard>`

Displays a key reconciliation metric.

**Props:**
- `title: string` - Metric title
- `value: string | number` - Metric value
- `subtitle?: string` - Optional subtitle
- `trend?: 'up' | 'down' | 'neutral'` - Trend indicator

### `<RuleSet>`

Defines a collection of reconciliation rules.

**Props:**
- `id: string` - Unique ruleset ID
- `name: string` - Ruleset name
- `priority?: 'exact-first' | 'fuzzy-first' | 'custom'` - Rule priority strategy
- `conflictResolution?: 'first-wins' | 'last-wins' | 'manual-review'` - Conflict resolution
- `children: ReactNode` - `<MatchRule>` components

### `<MatchRule>`

Defines a single reconciliation matching rule.

**Props:**
- `id: string` - Unique rule ID
- `name: string` - Rule name
- `field: RuleField` - Field to match on
- `type: RuleType` - Match type ('exact' | 'fuzzy' | 'range' | 'regex')
- `tolerance?: RuleTolerance` - Tolerance settings
- `priority?: number` - Rule priority (lower = higher priority)
- `enabled?: boolean` - Whether rule is enabled (default: true)

## Compiler API

### `compileToConfig(component, options?)`

Compiles a React component tree into a `ReconciliationConfig` object.

```tsx
import { compileToConfig } from '@settler/react-settler';

const config = compileToConfig(workflow, {
  name: 'My Workflow',
  description: 'Payment reconciliation'
});
```

### `compileToJSON(component, options?)`

Compiles a React component tree into a JSON string.

```tsx
import { compileToJSON } from '@settler/react-settler';

const json = compileToJSON(workflow, {
  name: 'My Workflow',
  pretty: true // Pretty-print JSON
});
```

## Usage Modes

### UI Mode (Default)

Components render as normal React UI with live data:

```tsx
<ReconciliationDashboard mode="ui">
  <TransactionTable transactions={transactions} />
</ReconciliationDashboard>
```

### Config Mode

Components extract configuration without rendering UI:

```tsx
<ReconciliationDashboard mode="config">
  <RuleSet id="rules-1" name="My Rules">
    <MatchRule id="rule-1" name="Amount Match" field="amount" type="exact" />
  </RuleSet>
</ReconciliationDashboard>
```

## Enterprise Features

### Security & Validation

```tsx
import { useValidation, sanitizeString } from '@settler/react-settler';

const { validateTransaction } = useValidation();
const result = validateTransaction(transaction);
if (!result.valid) {
  // Handle validation errors
}
```

### Telemetry & Observability

```tsx
import { setTelemetryProvider, useTelemetry } from '@settler/react-settler';

// Set up telemetry
setTelemetryProvider({
  track: (event) => sendToAnalytics(event),
  trackError: (error) => sendToErrorTracking(error)
});

// Use in components
const { track } = useTelemetry('MyComponent');
track('user.action', { action: 'click' });
```

### Error Boundaries

```tsx
import { ErrorBoundary } from '@settler/react-settler';

<ErrorBoundary
  onError={(error, errorInfo) => {
    logError(error);
  }}
>
  <YourComponent />
</ErrorBoundary>
```

### Performance Optimization

```tsx
import { VirtualizedTable, useFilteredTransactions } from '@settler/react-settler';

// Virtualized table for large datasets
<VirtualizedTable
  transactions={transactions}
  height={600}
  rowHeight={50}
/>

// Optimized filtering
const filtered = useFilteredTransactions(transactions, filters);
```

## Examples

See the `examples/` directory for complete examples:

- `basic-dashboard.tsx` - Simple dashboard with transactions and exceptions
- `rule-definition.tsx` - Defining reconciliation rules
- `config-compilation.tsx` - Compiling workflows to JSON

## Integrations

React.Settler integrates seamlessly with popular platforms:

- **MCP Server** - AI assistant integration via Model Context Protocol
- **Shopify** - App store integration with Polaris design system
- **Stripe** - Connect app integration
- **Webhooks** - Real-time event system for Shopify, Stripe, and custom backends

## Mobile & Accessibility

- **Mobile-First** - Touch-optimized components with responsive breakpoints
- **WCAG 2.1 AA** - Full accessibility compliance
- **Keyboard Navigation** - Complete keyboard support
- **Screen Readers** - ARIA labels and semantic HTML throughout

## Documentation

- [Pricing & Licensing](./docs/PRICING.md) - Feature tiers and pricing
- [OSS vs Commercial](./docs/OSS_VS_COMMERCIAL.md) - Strategic feature split
- [Security Guide](./docs/SECURITY.md) - Security best practices
- [Performance Guide](./docs/PERFORMANCE.md) - Performance optimization
- [Testing Guide](./docs/TESTING.md) - Testing utilities and patterns
- [Integrations Guide](./docs/INTEGRATIONS.md) - Platform integrations
- [Accessibility Guide](./docs/ACCESSIBILITY.md) - Accessibility features
- [Protocol Specification](../protocol/PROTOCOL.md) - Complete protocol docs

## Protocol

This library uses `@settler/protocol` for type definitions. See [@settler/protocol](../protocol/README.md) for the complete protocol specification.

## License

MIT
