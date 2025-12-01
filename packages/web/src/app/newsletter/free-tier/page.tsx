'use client';

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { AnimatedHero } from "@/components/AnimatedHero";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function FreeTierNewsletterPage() {
  return (
    <AnimatedPageWrapper aria-label="Free tier newsletter page">
      <Navigation />

      <AnimatedHero
        badge="Free Tier Newsletter"
        title="Automation Tips & Workflow Ideas"
        description="Weekly insights to help you get the most out of Settler"
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              What You'll Receive
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                    ✨ Automation Tips
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Weekly tips and best practices for automating your reconciliation workflows. Learn from real-world examples and expert insights.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                    🔄 Workflow Ideas
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Discover new workflow templates and recipes you can implement today. Each workflow includes code examples and use cases.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                    📰 Industry News
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Stay up-to-date with the latest news in financial reconciliation, automation, and SaaS. Curated for relevance to your needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                    🤖 AI Analysis
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Quick AI-powered analysis of industry trends and news, helping you understand what matters for your business.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-100">
                📅 Frequency
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                You'll receive our free tier newsletter once per week, typically on Tuesdays. Each email is packed with actionable insights and practical tips.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                Sample Topics
              </h2>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li>• How to set up automated daily reconciliation</li>
                <li>• Best practices for multi-currency reconciliation</li>
                <li>• Optimizing matching rules for better accuracy</li>
                <li>• Handling exceptions and conflicts</li>
                <li>• Integration patterns for common platforms</li>
                <li>• Performance optimization tips</li>
                <li>• Security best practices</li>
                <li>• Real-world success stories</li>
              </ul>
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
