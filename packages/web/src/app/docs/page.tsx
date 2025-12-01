'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ConversionCTA } from "@/components/ConversionCTA";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { AnimatedHero } from "@/components/AnimatedHero";
import { AnimatedSidebar } from "@/components/AnimatedSidebar";
import Link from "next/link";

export default function Docs() {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Introduction</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Settler is a Reconciliation-as-a-Service API that automates financial and event data reconciliation 
              across fragmented SaaS and e-commerce ecosystems. With Settler, you can reconcile transactions, 
              orders, and events between any two platforms in real-time.
            </p>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Our API-first approach means you can integrate reconciliation into your existing workflows without 
              building custom infrastructure or maintaining complex matching logic.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>💡 Pro Tip:</strong> Try our <Link href="/playground" className="underline hover:text-blue-600 dark:hover:text-blue-300">interactive playground</Link> to test the API without signing up, or explore our <Link href="/cookbooks" className="underline hover:text-blue-600 dark:hover:text-blue-300">cookbooks</Link> for ready-to-use examples.
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Quick Start</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Get started in 5 minutes:
            </p>
            <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto mb-4">
              <pre className="text-green-400 text-sm">
                <code>{`# Install the SDK
npm install @settler/sdk

# Or with yarn
yarn add @settler/sdk

# Or with pnpm
pnpm add @settler/sdk`}</code>
              </pre>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Need help? Check out our <Link href="/support" className="text-blue-600 dark:text-blue-400 hover:underline">support page</Link> or <Link href="/community" className="text-blue-600 dark:text-blue-400 hover:underline">join our community</Link>.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'installation',
      title: 'Installation',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Node.js / TypeScript</h3>
            <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto mb-4">
              <pre className="text-green-400 text-sm">
                <code>{`import { Settler } from '@settler/sdk';

const client = new Settler({
  apiKey: process.env.SETTLER_API_KEY,
});`}</code>
              </pre>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">React</h3>
            <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto mb-4">
              <pre className="text-green-400 text-sm">
                <code>{`import { useSettler } from '@settler/react-settler';

function MyComponent() {
  const { createJob, runJob } = useSettler({
    apiKey: 'sk_...',
  });
  
  // Use the hooks...
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Jobs API</h3>
            <div className="space-y-4">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">POST</Badge>
                    <CardTitle className="text-lg">/api/v1/jobs</CardTitle>
                  </div>
                  <CardDescription>Create a new reconciliation job</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{`const job = await client.jobs.create({
  name: "Shopify-Stripe Reconciliation",
  source: {
    adapter: "shopify",
    config: { apiKey: "..." }
  },
  target: {
    adapter: "stripe",
    config: { apiKey: "..." }
  },
  rules: {
    matching: [
      { field: "order_id", type: "exact" },
      { field: "amount", type: "exact", tolerance: 0.01 }
    ]
  }
});`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">GET</Badge>
                    <CardTitle className="text-lg">/api/v1/jobs/:id</CardTitle>
                  </div>
                  <CardDescription>Get reconciliation job details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{`const job = await client.jobs.get(jobId);
console.log(job.status); // 'pending' | 'running' | 'completed' | 'failed'`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">GET</Badge>
                    <CardTitle className="text-lg">/api/v1/reports/:jobId</CardTitle>
                  </div>
                  <CardDescription>Get reconciliation report</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{`const report = await client.reports.get(jobId);
console.log(report.summary);
// {
//   total: 150,
//   matched: 145,
//   unmatched: 3,
//   conflicts: 2,
//   accuracy: 0.987
// }`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'examples',
      title: 'Examples',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">E-commerce Reconciliation</h3>
            <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                <code>{`// Reconcile Shopify orders with Stripe payments
const job = await client.jobs.create({
  name: "Monthly Reconciliation",
  source: {
    adapter: "shopify",
    config: {
      shop: "your-shop.myshopify.com",
      accessToken: process.env.SHOPIFY_TOKEN
    }
  },
  target: {
    adapter: "stripe",
    config: {
      apiKey: process.env.STRIPE_SECRET_KEY
    }
  },
  rules: {
    matching: [
      { field: "order_id", type: "exact" },
      { field: "amount", type: "exact", tolerance: 0.01 },
      { field: "currency", type: "exact" }
    ],
    conflictResolution: "last-wins"
  }
});

// Run the job
const report = await client.jobs.run(job.id);
console.log(\`Matched: \${report.summary.matched}/\${report.summary.total}\`);`}</code>
              </pre>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'adapters',
      title: 'Adapters',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Platform Adapters</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Settler supports 50+ platform adapters out of the box. Each adapter handles authentication, data fetching, and normalization automatically.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">Payment Processors</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• Stripe</li>
                  <li>• PayPal</li>
                  <li>• Square</li>
                  <li>• Amazon Pay</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">E-commerce</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• Shopify</li>
                  <li>• WooCommerce</li>
                  <li>• BigCommerce</li>
                  <li>• Magento</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">Accounting</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• QuickBooks</li>
                  <li>• Xero</li>
                  <li>• Sage</li>
                  <li>• NetSuite</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">More Platforms</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• Custom adapters</li>
                  <li>• REST APIs</li>
                  <li>• GraphQL APIs</li>
                  <li>• Webhooks</li>
                </ul>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              See our <Link href="/cookbooks" className="text-blue-600 dark:text-blue-400 hover:underline">cookbooks</Link> for integration examples.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'integrations',
      title: 'Integrations',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Integration Guide</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Learn how to integrate Settler with popular platforms and services.
            </p>
            <div className="space-y-4">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">Stripe Integration</CardTitle>
                  <CardDescription>Connect Stripe for payment reconciliation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Stripe integration enables real-time payment reconciliation. Configure webhooks in your Stripe Dashboard to receive payment events.
                  </p>
                  <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{`// Configure Stripe adapter
source: {
  adapter: "stripe",
  config: {
    apiKey: process.env.STRIPE_SECRET_KEY
  }
}`}</code>
                    </pre>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    See <Link href="/pricing" className="text-blue-600 dark:text-blue-400 hover:underline">pricing page</Link> for webhook configuration details.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">Shopify Integration</CardTitle>
                  <CardDescription>Connect Shopify for order reconciliation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Shopify integration allows you to reconcile orders with payment providers. Requires Shopify API credentials.
                  </p>
                  <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{`// Configure Shopify adapter
source: {
  adapter: "shopify",
  config: {
    shop: "your-shop.myshopify.com",
    accessToken: process.env.SHOPIFY_TOKEN
  }
}`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'webhooks',
      title: 'Webhooks',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Webhook Configuration</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Webhooks allow Settler to receive real-time events from external platforms, enabling instant reconciliation.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">Stripe Webhooks</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                Configure Stripe webhooks to receive payment events:
              </p>
              <ul className="text-sm text-blue-800 dark:text-blue-200 list-disc list-inside space-y-1">
                <li>Endpoint: <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">/api/webhooks/stripe</code></li>
                <li>Events: payment_intent.succeeded, customer.subscription.created, etc.</li>
                <li>See <Link href="/pricing" className="underline">pricing page</Link> for full configuration guide</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900 dark:text-white">Creating Webhooks</h4>
              <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto">
                <pre className="text-green-400 text-sm">
                  <code>{`// Create webhook endpoint
const webhook = await client.webhooks.create({
  url: "https://your-domain.com/webhook",
  events: ["payment.succeeded", "payment.failed"]
});`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'security',
      title: 'Security',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Security Best Practices</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              Settler is built with security as a top priority. Here are key security features and best practices.
            </p>
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">🔐 Authentication</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• API keys for authentication</li>
                  <li>• JWT tokens for session management</li>
                  <li>• Webhook signature verification</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">🛡️ Data Protection</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• Encryption at rest and in transit</li>
                  <li>• Secure credential storage</li>
                  <li>• SSRF protection</li>
                </ul>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-white">✅ Compliance</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
                  <li>• SOC 2 Type II compliant</li>
                  <li>• GDPR compliant</li>
                  <li>• PCI-DSS compliant</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Common Issues</h3>
            <div className="space-y-4">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">Authentication Errors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    <strong>Issue:</strong> API key authentication fails
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    <strong>Solution:</strong> Verify your API key is correct and has the required permissions. Check environment variables are set correctly.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">Webhook Not Receiving Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    <strong>Issue:</strong> Webhooks not being received
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    <strong>Solution:</strong> Verify webhook URL is accessible, check webhook secret configuration, and ensure events are subscribed in platform dashboard.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">Low Matching Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    <strong>Issue:</strong> Reconciliation accuracy is lower than expected
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    <strong>Solution:</strong> Review matching rules, check data normalization, adjust tolerance values, and verify field mappings.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6">
              <p className="text-slate-600 dark:text-slate-300">
                Need more help? Check out our <Link href="/support" className="text-blue-600 dark:text-blue-400 hover:underline">support page</Link> or <Link href="/community" className="text-blue-600 dark:text-blue-400 hover:underline">community forum</Link>.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'legal',
      title: 'Legal & Compliance',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Legal Documents</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Important legal documents and compliance information for Settler users.
            </p>
            <div className="space-y-4">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">Terms of Service</CardTitle>
                  <CardDescription>Service terms and conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Our Terms of Service outline the terms and conditions for using Settler, including license tiers, payment terms, and acceptable use policies.
                  </p>
                  <Link href="/legal/terms" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Read Terms of Service →
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">Privacy Policy</CardTitle>
                  <CardDescription>How we handle your data</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Our Privacy Policy explains how we collect, use, and protect your data. We're committed to GDPR compliance and data security.
                  </p>
                  <Link href="/legal/privacy" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Read Privacy Policy →
                  </Link>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">Commercial License</CardTitle>
                  <CardDescription>Commercial license terms</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    The Commercial License covers platform integrations, virtualization, telemetry, and other commercial features. Requires a subscription.
                  </p>
                  <Link href="/legal/license" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                    Read Commercial License →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const activeContent = sections.find(s => s.id === activeSection)?.content;

  return (
    <AnimatedPageWrapper aria-label="Documentation page">
      <Navigation />

      {/* Hero Section */}
      <AnimatedHero
        badge="Developer Documentation"
        title="Documentation"
        description="Everything you need to integrate Settler into your application"
      />

      {/* Documentation Content */}
      <section
        className="py-12 px-4 sm:px-6 lg:px-8"
        aria-labelledby="docs-content-heading"
      >
        <div className="max-w-7xl mx-auto">
          <h2 id="docs-content-heading" className="sr-only">
            Documentation Content
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <AnimatedSidebar
              items={sections.map((s) => ({ id: s.id, title: s.title }))}
              activeId={activeSection}
              onItemClick={setActiveSection}
            />

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-lg"
                role="article"
                aria-labelledby={`section-${activeSection}`}
              >
                <CardContent className="p-8">
                  {activeContent}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ConversionCTA
            title="Ready to Get Started?"
            description="Try Settler in our interactive playground. No signup required."
            primaryAction="Try Playground"
            primaryLink="/playground"
            secondaryAction="View Pricing"
            secondaryLink="/pricing"
            variant="gradient"
          />
        </div>
      </section>

      <Footer />
    </AnimatedPageWrapper>
  );
}
