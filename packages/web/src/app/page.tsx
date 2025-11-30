'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TrustBadges } from "@/components/TrustBadges";
import { CustomerLogos } from "@/components/CustomerLogos";
import { SocialProof } from "@/components/SocialProof";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ConversionCTA } from "@/components/ConversionCTA";
import { AnimatedFeatureCard } from "@/components/AnimatedFeatureCard";
import { AnimatedStatCard } from "@/components/AnimatedStatCard";
import { AnimatedCodeBlock } from "@/components/AnimatedCodeBlock";

// Removed StatsSection - replaced with unique secondary stats

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

  // Unique stats - no duplicates
  const heroStats = [
    { value: '99.7%', label: 'Accuracy', description: 'Reconciliation precision' },
    { value: '<50ms', label: 'API Latency', description: 'Average response time' },
    { value: '50+', label: 'Integrations', description: 'Platform adapters' },
    { value: '5min', label: 'Setup Time', description: 'Time to first reconciliation' },
  ];

  const secondaryStats = [
    { value: '10M+', label: 'Transactions Reconciled', description: 'Total processed' },
    { value: '24/7', label: 'Uptime', description: 'Service availability' },
    { value: '99.9%', label: 'Reliability', description: 'SLA guarantee' },
    { value: '<1s', label: 'Processing Speed', description: 'Per transaction' },
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
    <>
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="skip-to-main"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      <div 
        id="main-content"
        className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
        role="main"
        aria-label="Settler homepage"
      >
        <Navigation />

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Animated background gradient */}
        <div 
          className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge 
              className={`mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
              aria-label="Product category"
            >
              Reconciliation-as-a-Service API
            </Badge>
            <h1 
              id="hero-heading"
              className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Make Reconciliation
              <br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                As Simple As Email
              </span>
            </h1>
            <p 
              className={`text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Automate financial data reconciliation across fragmented SaaS and e-commerce ecosystems. 
              One API. All platforms. Real-time.
            </p>
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              role="group"
              aria-label="Call to action buttons"
            >
              <Button 
                size="lg" 
                asChild 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Link href="/playground" aria-label="Start free trial of Settler">
                  Start Free Trial
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="px-8 py-6 text-lg border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Link href="/docs" aria-label="View Settler documentation">
                  View Documentation
                </Link>
              </Button>
            </div>
            
            {/* Hero Stats - Unique */}
            <div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              role="list"
              aria-label="Key performance metrics"
            >
              {heroStats.map((stat, index) => (
                <div key={index} role="listitem">
                  <AnimatedStatCard
                    value={stat.value}
                    label={stat.label}
                    description={stat.description}
                    index={index}
                    delay={600}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Stats Section - Unique stats */}
      <section 
        className="py-16 bg-white/50 dark:bg-slate-800/50"
        aria-labelledby="secondary-stats-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            id="secondary-stats-heading" 
            className="text-2xl md:text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white"
          >
            Trusted by Industry Leaders
          </h2>
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            role="list"
            aria-label="Additional performance metrics"
          >
            {secondaryStats.map((stat, index) => (
              <div key={index} role="listitem">
                <AnimatedStatCard
                  value={stat.value}
                  label={stat.label}
                  description={stat.description}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <TrustBadges />
        </div>
      </section>

      {/* Customer Logos */}
      <CustomerLogos />

      {/* Code Example Section */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="code-example-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              id="code-example-heading"
              className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white"
            >
              Get Started in Minutes
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Simple, developer-friendly API that works with any platform
            </p>
          </div>
          <AnimatedCodeBlock
            code={codeExample}
            title="Quick Start Example"
            description="Reconcile Shopify orders with Stripe payments in just a few lines of code"
            language="typescript"
          />
        </div>
      </section>

      {/* Features Section */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50"
        aria-labelledby="features-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              id="features-heading"
              className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white"
            >
              Everything You Need
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Built for developers, designed for scale
            </p>
          </div>
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
            aria-label="Feature list"
          >
            {features.map((feature, index) => (
              <div key={index} role="listitem">
                <AnimatedFeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              </div>
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
    </>
  );
}
