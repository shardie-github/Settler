'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ConversionCTA } from "@/components/ConversionCTA";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { AnimatedHero } from "@/components/AnimatedHero";
import { AnimatedFeatureCard } from "@/components/AnimatedFeatureCard";

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');

  const supportOptions = [
    {
      icon: '📚',
      title: 'Documentation',
      description: 'Comprehensive guides, API reference, and tutorials',
      link: '/docs',
      linkText: 'Browse Docs',
    },
    {
      icon: '💬',
      title: 'Community Support',
      description: 'Get help from our community on Discord and GitHub',
      link: 'https://discord.gg/settler',
      linkText: 'Join Discord',
      external: true,
    },
    {
      icon: '🎮',
      title: 'Interactive Playground',
      description: 'Test the API and see examples in action',
      link: '/playground',
      linkText: 'Try Playground',
    },
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Get help via email (response within 24 hours)',
      link: 'mailto:support@settler.dev',
      linkText: 'Email Us',
      external: true,
    },
  ];

  const faqs = [
    {
      question: 'How do I get started with Settler?',
      answer: 'Start by installing the SDK with `npm install @settler/sdk`, then check out our documentation or try the playground to see it in action.',
    },
    {
      question: 'What platforms does Settler support?',
      answer: 'Settler supports 50+ platforms including Stripe, Shopify, QuickBooks, PayPal, Square, and more. You can also build custom adapters.',
    },
    {
      question: 'Is there a free tier?',
      answer: 'Yes! Our OSS tier is free forever with 1,000 reconciliations/month. Check out our pricing page for details.',
    },
    {
      question: 'How accurate is the reconciliation?',
      answer: 'Settler achieves 99.7% accuracy with our advanced matching algorithms and confidence scoring.',
    },
    {
      question: 'Can I use Settler on-premise?',
      answer: 'Yes, Enterprise plans include on-premise deployment options. Contact our sales team for more information.',
    },
    {
      question: 'What security certifications do you have?',
      answer: 'We\'re SOC 2 Type II certified, GDPR compliant, and PCI-DSS ready. Enterprise customers get additional security features.',
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatedPageWrapper aria-label="Support and help center">
      <Navigation />

      {/* Hero Section */}
      <AnimatedHero
        badge="We're Here to Help"
        title="Support & Help Center"
        description="Find answers, get help, and connect with our team"
      />

      {/* Support Options */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="support-options-heading"
      >
        <div className="max-w-7xl mx-auto">
          <h2 id="support-options-heading" className="sr-only">
            Support Options
          </h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            role="list"
            aria-label="Available support channels"
          >
            {supportOptions.map((option, index) => (
              <div key={index} role="listitem">
                <AnimatedFeatureCard
                  icon={option.icon}
                  title={option.title}
                  description={option.description}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Search our knowledge base for quick answers
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search frequently asked questions"
            />
          </div>

          {/* FAQ List */}
          <div className="space-y-4" role="list" aria-label="Frequently asked questions">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-lg"
                  role="listitem"
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900 dark:text-white">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardContent className="py-8 text-center">
                  <p className="text-slate-600 dark:text-slate-300">
                    No FAQs found matching "{searchQuery}". Try a different search term.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ConversionCTA
            title="Still Need Help?"
            description="Our support team is ready to assist you. Get in touch via email or schedule a call with our sales team."
            primaryAction="Email Support"
            primaryLink="mailto:support@settler.dev"
            secondaryAction="Contact Sales"
            secondaryLink="/enterprise"
            variant="gradient"
          />
        </div>
      </section>

      <Footer />
    </AnimatedPageWrapper>
  );
}
