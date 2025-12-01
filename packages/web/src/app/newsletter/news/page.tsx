'use client';

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { AnimatedHero } from "@/components/AnimatedHero";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function NewsNewsletterPage() {
  return (
    <AnimatedPageWrapper aria-label="News newsletter page">
      <Navigation />

      <AnimatedHero
        badge="News & Analysis"
        title="Industry News with AI Insights"
        description="Stay informed about the latest trends in financial reconciliation and automation"
      />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              What You'll Receive
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Our news newsletter brings you the latest industry developments, curated specifically for professionals working with financial reconciliation and automation. Each news item includes AI-powered analysis to help you understand the implications.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                    📰 Latest News
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Curated news from trusted sources covering financial technology, automation, SaaS platforms, and reconciliation trends.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                    🤖 AI Analysis
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Each news item includes AI-powered analysis explaining what it means for your business and how it relates to reconciliation.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                    📊 Market Trends
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Insights into emerging trends in financial automation, platform integrations, and reconciliation best practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                    🔮 Future Predictions
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Forward-looking analysis on where the industry is heading and how to prepare for upcoming changes.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-semibold mb-3 text-purple-900 dark:text-purple-100">
                📅 Frequency
              </h3>
              <p className="text-purple-800 dark:text-purple-200">
                News updates are included in our weekly free tier newsletter, typically featuring 2-3 top stories with detailed analysis.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                Sample Topics
              </h2>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li>• Financial automation trends and adoption rates</li>
                <li>• New platform integrations and APIs</li>
                <li>• Regulatory changes affecting reconciliation</li>
                <li>• Industry best practices and standards</li>
                <li>• Case studies and success stories</li>
                <li>• Technology innovations in fintech</li>
                <li>• Market analysis and forecasts</li>
                <li>• Expert opinions and interviews</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-12">
              <h3 className="text-xl font-semibold mb-3 text-blue-900 dark:text-blue-100">
                💡 How It Works
              </h3>
              <p className="text-blue-800 dark:text-blue-200 mb-3">
                Our system automatically:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-200">
                <li>Aggregates news from trusted sources</li>
                <li>Filters for relevance to reconciliation and automation</li>
                <li>Generates AI-powered analysis for each story</li>
                <li>Delivers curated content in your weekly newsletter</li>
              </ol>
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
