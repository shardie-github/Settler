'use client';

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { AnimatedHero } from "@/components/AnimatedHero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function NewsletterPage() {
  return (
    <AnimatedPageWrapper aria-label="Newsletter page">
      <Navigation />

      {/* Hero Section */}
      <AnimatedHero
        badge="Stay Informed"
        title="Settler Newsletter"
        description="Get automation tips, workflow ideas, and industry news delivered to your inbox"
      />

      {/* Newsletter Signup */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      {/* Newsletter Series */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
            Newsletter Series
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Free Tier Newsletter */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white">
                  Free Tier Newsletter
                </CardTitle>
                <CardDescription>
                  Weekly automation tips, workflows, and news analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-6">
                  <li>✨ Automation tips & best practices</li>
                  <li>🔄 New workflow ideas & templates</li>
                  <li>📰 Industry news with AI analysis</li>
                  <li>🎯 Quick wins for reconciliation</li>
                </ul>
                <Link
                  href="/newsletter/free-tier"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            {/* Lead Generation Series */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white">
                  Getting Started Series
                </CardTitle>
                <CardDescription>
                  Step-by-step guides to get you up and running
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-6">
                  <li>📚 Integration guides</li>
                  <li>💡 Use cases & success stories</li>
                  <li>🚀 Quick start tutorials</li>
                  <li>💰 Pricing & plan information</li>
                </ul>
                <Link
                  href="/newsletter/getting-started"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Learn more →
                </Link>
              </CardContent>
            </Card>

            {/* News & Analysis */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900 dark:text-white">
                  News & Analysis
                </CardTitle>
                <CardDescription>
                  Industry news with AI-powered insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300 mb-6">
                  <li>📰 Latest industry news</li>
                  <li>🤖 AI-powered analysis</li>
                  <li>📊 Market trends</li>
                  <li>🔮 Future predictions</li>
                </ul>
                <Link
                  href="/newsletter/news"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                >
                  Learn more →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Subscribe to our newsletter and never miss an update
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/playground"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Try the Playground
            </Link>
            <Link
              href="/docs"
              className="border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </AnimatedPageWrapper>
  );
}
