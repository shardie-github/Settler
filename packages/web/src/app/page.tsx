'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TrustBadges } from "@/components/TrustBadges";
import { CustomerLogos } from "@/components/CustomerLogos";
import { StatsSection } from "@/components/StatsSection";
import { SocialProof } from "@/components/SocialProof";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ConversionCTA } from "@/components/ConversionCTA";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: "⚡",
      title: "5-Minute Integration",
      description: "Get started in minutes with our simple API. No complex setup required."
    },
    {
      icon: "🔒",
      title: "Enterprise Security",
      description: "SOC 2 Type II, GDPR, and PCI-DSS compliant. Your data is always secure."
    },
    {
      icon: "🚀",
      title: "Real-Time Processing",
      description: "Reconcile transactions in real-time with webhook support and instant updates."
    },
    {
      icon: "🎯",
      title: "99.7% Accuracy",
      description: "Advanced matching algorithms ensure high accuracy with confidence scoring."
    },
    {
      icon: "🔌",
      title: "50+ Integrations",
      description: "Pre-built adapters for Stripe, Shopify, QuickBooks, PayPal, and more."
    },
    {
      icon: "📊",
      title: "Complete Visibility",
      description: "Full audit trails, detailed reports, and real-time dashboards."
    }
  ];

  const codeExample = `npm install @settler/sdk

import Settler from "@settler/sdk";

const client = new Settler({
  apiKey: "sk_your_api_key",
});

const job = await client.jobs.create({
  name: "Shopify-Stripe Reconciliation",
  source: { adapter: "shopify", config: {} },
  target: { adapter: "stripe", config: {} },
  rules: {
    matching: [
      { field: "order_id", type: "exact" },
      { field: "amount", type: "exact", tolerance: 0.01 },
    ],
  },
});

const report = await client.jobs.run(job.id);
// ✅ 98.7% accuracy, 145 matched, 3 unmatched`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800">
              Reconciliation-as-a-Service API
            </Badge>
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Make Reconciliation
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                As Simple As Email
              </span>
            </h1>
            <p className={`text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Automate financial data reconciliation across fragmented SaaS and e-commerce ecosystems. 
              One API. All platforms. Real-time.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                <Link href="/playground">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="px-8 py-6 text-lg border-2">
                <Link href="/docs">View Documentation</Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">99.7%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">&lt;50ms</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">API Latency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">50+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Integrations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">5min</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">Setup Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Trust Badges */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <TrustBadges />
        </div>
      </section>

      {/* Customer Logos */}
      <CustomerLogos />

      {/* Code Example Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Get Started in Minutes
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Simple, developer-friendly API that works with any platform
            </p>
          </div>
          <Card className="max-w-4xl mx-auto bg-slate-900 border-slate-800 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Quick Start Example</CardTitle>
              <CardDescription className="text-slate-400">
                Reconcile Shopify orders with Stripe payments in just a few lines of code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-950 rounded-lg p-6 overflow-x-auto">
                <code className="text-sm text-green-400 font-mono">
                  {codeExample}
                </code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Everything You Need
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Built for developers, designed for scale
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-slate-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <SocialProof />

      {/* Newsletter Signup */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ConversionCTA
            title="Ready to Automate Your Reconciliation?"
            description="Join thousands of companies using Settler to automate their financial operations. Start free, no credit card required."
            primaryAction="Start Free Trial"
            primaryLink="/playground"
            secondaryAction="View Pricing"
            secondaryLink="/pricing"
            variant="gradient"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
