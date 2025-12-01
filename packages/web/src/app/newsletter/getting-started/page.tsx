'use client';

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { AnimatedHero } from "@/components/AnimatedHero";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function GettingStartedNewsletterPage() {
  return (
    <AnimatedPageWrapper aria-label="Getting started newsletter page">
      <Navigation />

      <AnimatedHero
        badge="Getting Started Series"
        title="Your Path to Automation Success"
        description="Step-by-step guides to help you get started with Settler"
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Email Series Overview
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Our getting started email series is designed to guide you through your first steps with Settler. You'll receive 4 emails over the course of a week, each building on the previous one.
            </p>

            <div className="space-y-6 mb-12">
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                        Welcome & Value Proposition (Day 0)
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-3">
                        Introduction to Settler and what makes it powerful. Learn about key benefits and how it can transform your reconciliation process.
                      </p>
                      <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                        <li>• What is Settler?</li>
                        <li>• Key benefits and features</li>
                        <li>• Quick overview of capabilities</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                        Use Cases & Success Stories (Day 2)
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-3">
                        Real-world examples of how companies use Settler to save time and improve accuracy. See use cases that match your business needs.
                      </p>
                      <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                        <li>• E-commerce: Shopify + Stripe</li>
                        <li>• SaaS: Stripe + QuickBooks</li>
                        <li>• Multi-platform reconciliation</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                        Integration Guide (Day 4)
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-3">
                        Step-by-step guide to integrating Settler into your application. Get started in 5 minutes with code examples and best practices.
                      </p>
                      <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                        <li>• Installation and setup</li>
                        <li>• Creating your first job</li>
                        <li>• Code examples</li>
                        <li>• Next steps</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">
                        Pricing & CTA (Day 7)
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 mb-3">
                        Learn about our pricing plans and start your free trial. No credit card required to get started.
                      </p>
                      <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-1">
                        <li>• Pricing overview</li>
                        <li>• Free trial information</li>
                        <li>• Plan comparison</li>
                        <li>• Getting started</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-semibold mb-3 text-green-900 dark:text-green-100">
                🎁 Bonus Content
              </h3>
              <p className="text-green-800 dark:text-green-200">
                Throughout the series, you'll also receive links to our cookbooks, documentation, and community resources to help you along the way.
              </p>
            </div>
          </div>

          <div className="text-center">
            <NewsletterSignup />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/newsletter"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Newsletter Overview
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </AnimatedPageWrapper>
  );
}
