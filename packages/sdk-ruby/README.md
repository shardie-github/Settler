# Settler Ruby SDK

Production-grade Ruby SDK for Settler Reconciliation API.

## Installation

Add to your Gemfile:

```ruby
gem "settler-sdk"
```

Or install directly:

```bash
gem install settler-sdk
```

## Quick Start

```ruby
require "settler"

# Initialize client
client = Settler::Client.new(api_key: "sk_your_api_key")

# Create a reconciliation job
job = client.jobs.create(
  name: "Shopify-Stripe Reconciliation",
  source: {
    adapter: "shopify",
    config: {
      api_key: "your_shopify_api_key",
      shop: "your-shop",
    },
  },
  target: {
    adapter: "stripe",
    config: {
      api_key: "sk_your_stripe_key",
    },
  },
  rules: {
    matching: [
      { field: "order_id", type: "exact" },
      { field: "amount", type: "exact", tolerance: 0.01 },
    ],
  },
)

# Run the job
execution = client.jobs.run(job["id"])

# Get report
report = client.reports.get(job["id"])
puts "Matched: #{report["summary"]["matched"]}"
puts "Unmatched: #{report["summary"]["unmatched"]}"
```

## Features

- ✅ Automatic retries with exponential backoff
- ✅ Request deduplication
- ✅ Type-safe error handling
- ✅ Full API coverage
- ✅ Production-ready

## Documentation

See [docs.settler.io](https://docs.settler.io) for complete documentation.

## License

MIT
