'use client';

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ConversionCTA } from "@/components/ConversionCTA";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800">
            We're Here to Help
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Support & Help Center
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Find answers, get help, and connect with our team
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {supportOptions.map((option, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{option.icon}</div>
                  <CardTitle className="text-slate-900 dark:text-white">{option.title}</CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {option.external ? (
                    <a
                      href={option.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {option.linkText} →
                    </a>
                  ) : (
                    <Link
                      href={option.link}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {option.linkText} →
                    </Link>
                  )}
                </CardContent>
              </Card>
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
            />
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
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
    </div>
  );
}
