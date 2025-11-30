'use client';

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TrustBadges } from "@/components/TrustBadges";
import { FeatureComparison } from "@/components/FeatureComparison";
import { ConversionCTA } from "@/components/ConversionCTA";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Free',
      tagline: 'Perfect for getting started',
      price: '$0',
      period: 'forever',
      description: 'Open source components and basic features',
      features: [
        '1,000 reconciliations/month',
        '2 platform adapters',
        '7-day log retention',
        'Community support',
        'MIT License (OSS)',
        'Basic components',
        'Security basics',
        'Mobile & accessibility',
      ],
      cta: 'Get Started',
      ctaLink: '/playground',
      popular: false,
      badge: 'OSS',
    },
    {
      name: 'Commercial',
      tagline: 'For growing businesses',
      price: billingCycle === 'monthly' ? '$99' : '$990',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      originalPrice: billingCycle === 'annual' ? '$1,188' : null,
      description: 'Platform integrations and advanced features',
      features: [
        '100,000 reconciliations/month',
        'Unlimited adapters',
        '30-day log retention',
        'Email support',
        'Platform integrations (Shopify, Stripe, MCP)',
        'Virtualization',
        'Telemetry & analytics',
        'Priority updates',
        'Commercial License',
      ],
      cta: 'Start Free Trial',
      ctaLink: '/playground',
      popular: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      tagline: 'For large organizations',
      price: 'Custom',
      period: '',
      description: 'Full-featured with dedicated support',
      features: [
        'Unlimited reconciliations',
        'Unlimited adapters',
        'Unlimited log retention',
        'Dedicated support (SLA)',
        'SSO & SAML',
        'Role-based access control (RBAC)',
        'White-label options',
        'Custom integrations',
        'On-premise deployment',
        'Dedicated account manager',
        'Custom SLA',
      ],
      cta: 'Contact Sales',
      ctaLink: '/enterprise',
      popular: false,
      badge: 'Enterprise',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800">
            Simple, Transparent Pricing
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Start free, scale as you grow. All plans include our core reconciliation engine.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingCycle === 'annual' ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'annual' ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-400'}`}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                Save 17%
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative bg-white dark:bg-slate-900 border-2 ${
                  plan.popular
                    ? 'border-blue-500 dark:border-blue-600 shadow-2xl scale-105'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  {!plan.popular && plan.badge && (
                    <Badge className="mb-4 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {plan.badge}
                    </Badge>
                  )}
                  <CardTitle className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-400 mb-4">
                    {plan.tagline}
                  </CardDescription>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-slate-600 dark:text-slate-400">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <div className="mt-2">
                      <span className="text-sm text-slate-500 line-through">
                        {plan.originalPrice}/year
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg
                          className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className={`w-full ${
                      plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                        : 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'
                    }`}
                    size="lg"
                  >
                    <Link href={plan.ctaLink}>{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Trusted & Secure
            </h2>
          </div>
          <TrustBadges />
        </div>
      </section>

      {/* Feature Comparison Table */}
      <FeatureComparison />

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">What's the difference between OSS and Commercial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  OSS (Open Source) is free forever with MIT license, includes basic components and core protocol. 
                  Commercial adds platform integrations (Shopify, Stripe, MCP), virtualization, telemetry, and requires a subscription.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Can I switch plans later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Yes! You can upgrade, downgrade, or cancel at any time. Changes take effect immediately, and we'll prorate any charges.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  We accept all major credit cards, ACH transfers, and wire transfers for Enterprise plans.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Yes! All paid plans include a 14-day free trial. No credit card required to start.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ConversionCTA
            title="Still have questions?"
            description="Our team is here to help you choose the right plan for your needs."
            primaryAction="Contact Support"
            primaryLink="/support"
            secondaryAction="Talk to Sales"
            secondaryLink="/enterprise"
            variant="gradient"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
