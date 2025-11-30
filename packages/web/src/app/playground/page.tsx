'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function Playground() {
  const [apiKey, setApiKey] = useState("");
  const [code, setCode] = useState(`import { Settler } from "@settler/sdk";

const client = new Settler({
  apiKey: "${apiKey || "sk_your_api_key"}",
});

// Create a reconciliation job
const job = await client.jobs.create({
  name: "Shopify-Stripe Reconciliation",
  source: {
    adapter: "shopify",
    config: {
      apiKey: process.env.SHOPIFY_API_KEY,
    },
  },
  target: {
    adapter: "stripe",
    config: {
      apiKey: process.env.STRIPE_SECRET_KEY,
    },
  },
  rules: {
    matching: [
      { field: "order_id", type: "exact" },
      { field: "amount", type: "exact", tolerance: 0.01 },
    ],
    conflictResolution: "last-wins",
  },
});

console.log("Job created:", job.data.id);

// Run the job and get report
const report = await client.jobs.run(job.data.id);
console.log("Report:", report.data.summary);
// {
//   total: 150,
//   matched: 145,
//   unmatched: 3,
//   conflicts: 2,
//   accuracy: 0.987
// }`);

  const [output, setOutput] = useState<string>("// Click 'Run Code' to execute and see results here");
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("// Running...\n");
    
    // Simulate API call (in production, this would call your backend)
    setTimeout(() => {
      setOutput(`✅ Job created: job_abc123xyz
📊 Report Summary:
   Total: 150
   Matched: 145
   Unmatched: 3
   Conflicts: 2
   Accuracy: 98.7%

🎉 Reconciliation completed successfully!`);
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800">
            Interactive Playground
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Try Settler API
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Test the API, see examples, and experiment with reconciliation jobs
          </p>
        </div>
      </section>

      {/* Playground Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* API Key Input */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 mb-6">
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">API Configuration</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                Enter your API key to test with real credentials, or leave empty for demo mode
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    setCode(code.replace(/sk_your_api_key/g, e.target.value || "sk_your_api_key"));
                  }}
                  placeholder="sk_your_api_key"
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                />
                <Button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8"
                >
                  {isRunning ? 'Running...' : 'Run Code'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Code Editor and Output */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Editor */}
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-900 dark:text-white">Code Editor</CardTitle>
                  <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    TypeScript
                  </Badge>
                </div>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                  Edit the code below to experiment with the Settler API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-[500px] p-4 font-mono text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-slate-900 dark:bg-slate-950 text-green-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  spellCheck={false}
                />
              </CardContent>
            </Card>

            {/* Output */}
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-slate-900 dark:text-white">Output</CardTitle>
                  <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Console
                  </Badge>
                </div>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                  Results and logs from your code execution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[500px] p-4 bg-slate-900 dark:bg-slate-950 text-green-400 font-mono text-sm rounded-md overflow-auto border border-slate-300 dark:border-slate-700">
                  <pre className="whitespace-pre-wrap">{output}</pre>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Examples */}
          <div className="mt-8">
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">Quick Examples</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                  Try these pre-configured examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCode(`import { Settler } from "@settler/sdk";

const client = new Settler({
  apiKey: "${apiKey || "sk_your_api_key"}",
});

// QuickBooks to Stripe reconciliation
const job = await client.jobs.create({
  name: "QuickBooks-Stripe",
  source: { adapter: "quickbooks", config: { apiKey: "..." } },
  target: { adapter: "stripe", config: { apiKey: "..." } },
  rules: {
    matching: [
      { field: "transaction_id", type: "exact" },
      { field: "amount", type: "exact", tolerance: 0.01 }
    ]
  }
});

const report = await client.jobs.run(job.data.id);
console.log(report.data.summary);`);
                    }}
                    className="h-auto py-4 text-left"
                  >
                    <div>
                      <div className="font-semibold mb-1">QuickBooks → Stripe</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Accounting to payments
                      </div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCode(`import { Settler } from "@settler/sdk";

const client = new Settler({
  apiKey: "${apiKey || "sk_your_api_key"}",
});

// PayPal to Shopify reconciliation
const job = await client.jobs.create({
  name: "PayPal-Shopify",
  source: { adapter: "paypal", config: { apiKey: "..." } },
  target: { adapter: "shopify", config: { apiKey: "..." } },
  rules: {
    matching: [
      { field: "order_id", type: "exact" },
      { field: "amount", type: "exact", tolerance: 0.01 },
      { field: "date", type: "range", days: 1 }
    ]
  }
});

const report = await client.jobs.run(job.data.id);
console.log(report.data.summary);`);
                    }}
                    className="h-auto py-4 text-left"
                  >
                    <div>
                      <div className="font-semibold mb-1">PayPal → Shopify</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Payment to e-commerce
                      </div>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCode(`import { Settler } from "@settler/sdk";

const client = new Settler({
  apiKey: "${apiKey || "sk_your_api_key"}",
});

// Real-time webhook reconciliation
const job = await client.jobs.create({
  name: "Real-time Webhook Sync",
  source: { adapter: "webhook", config: { endpoint: "..." } },
  target: { adapter: "stripe", config: { apiKey: "..." } },
  rules: {
    matching: [{ field: "id", type: "exact" }],
    realtime: true
  }
});

// Listen for webhook events
client.webhooks.on("reconciliation.complete", (event) => {
  console.log("Reconciliation complete:", event.data);
});`);
                    }}
                    className="h-auto py-4 text-left"
                  >
                    <div>
                      <div className="font-semibold mb-1">Real-time Webhooks</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Live event reconciliation
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl text-white mb-4">
                Ready to Integrate?
              </CardTitle>
              <CardDescription className="text-blue-100 text-lg">
                Get your API key and start reconciling in minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">
                  <a href="/docs">View Documentation</a>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  <a href="/pricing">Get API Key</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
