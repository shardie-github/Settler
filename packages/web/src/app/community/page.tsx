'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ConversionCTA } from "@/components/ConversionCTA";
import { AnimatedPageWrapper } from "@/components/AnimatedPageWrapper";
import { AnimatedHero } from "@/components/AnimatedHero";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import Link from "next/link";
import { 
  MessageSquare, 
  Github, 
  Code, 
  Users, 
  BookOpen, 
  Zap,
  Heart,
  TrendingUp,
  Award
} from "lucide-react";

export default function Community() {
  const communityChannels = [
    {
      icon: MessageSquare,
      title: 'Discord Community',
      description: 'Join 1000+ developers discussing reconciliation, sharing solutions, and getting help in real-time.',
      link: 'https://discord.gg/settler',
      linkText: 'Join Discord',
      external: true,
      gradient: 'from-blue-500 to-cyan-500',
      stats: '1,000+ members',
    },
    {
      icon: Github,
      title: 'GitHub',
      description: 'Contribute to open-source adapters, report issues, and collaborate on the Settler SDK.',
      link: 'https://github.com/settler',
      linkText: 'View on GitHub',
      external: true,
      gradient: 'from-slate-700 to-slate-900',
      stats: '500+ stars',
    },
    {
      icon: Code,
      title: 'Developer Forums',
      description: 'Deep technical discussions, architecture patterns, and best practices for reconciliation.',
      link: 'https://github.com/settler/discussions',
      linkText: 'Browse Discussions',
      external: true,
      gradient: 'from-purple-500 to-indigo-500',
      stats: '200+ topics',
    },
    {
      icon: BookOpen,
      title: 'Documentation',
      description: 'Comprehensive guides, API reference, tutorials, and example code.',
      link: '/docs',
      linkText: 'Read Docs',
      external: false,
      gradient: 'from-emerald-500 to-teal-500',
      stats: '50+ guides',
    },
  ];

  const communityBenefits = [
    {
      icon: Users,
      title: 'Connect with Peers',
      description: 'Network with developers building similar reconciliation solutions. Share knowledge and learn from others.',
    },
    {
      icon: Zap,
      title: 'Get Quick Help',
      description: 'Get answers to your questions from the community and Settler team. Average response time: < 2 hours.',
    },
    {
      icon: Code,
      title: 'Contribute & Build',
      description: 'Build custom adapters, contribute to open-source, and get featured in our adapter marketplace.',
    },
    {
      icon: TrendingUp,
      title: 'Stay Updated',
      description: 'Be the first to know about new features, API updates, and best practices from the team.',
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Get recognized for your contributions. Top contributors get featured and receive early access.',
    },
    {
      icon: Heart,
      title: 'Shape the Product',
      description: 'Your feedback directly influences product direction. Help us build the reconciliation platform you need.',
    },
  ];

  const upcomingEvents = [
    {
      title: 'Monthly Office Hours',
      description: 'Join our team for live Q&A, product demos, and roadmap discussions.',
      date: 'First Tuesday of every month',
      time: '2:00 PM EST',
      link: 'https://discord.gg/settler',
    },
    {
      title: 'Adapter Workshop',
      description: 'Learn how to build custom adapters for your specific use cases.',
      date: 'Every other Thursday',
      time: '4:00 PM EST',
      link: 'https://github.com/settler/discussions',
    },
  ];

  return (
    <AnimatedPageWrapper aria-label="Community page">
      <Navigation />

      {/* Hero Section */}
      <AnimatedHero
        badge="Join the Community"
        title="Settler Community"
        description="Connect with developers, contribute to open-source, and help shape the future of reconciliation"
      />

      {/* Community Channels */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="community-channels-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="community-channels-heading" className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Join the Conversation
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Connect with developers, share solutions, and get help from the community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <SpotlightCard
                  key={index}
                  className="h-full"
                  spotlightColor="rgba(59, 130, 246, 0.2)"
                >
                  <div className="flex flex-col h-full">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${channel.gradient} p-3 mb-4 flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">
                      {channel.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">
                      {channel.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {channel.stats}
                      </Badge>
                      {channel.external ? (
                        <Button
                          asChild
                          variant="outline"
                          className="border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <a
                            href={channel.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${channel.linkText} (opens in new tab)`}
                          >
                            {channel.linkText} →
                          </a>
                        </Button>
                      ) : (
                        <Button
                          asChild
                          variant="outline"
                          className="border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <Link href={channel.link}>
                            {channel.linkText} →
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Benefits */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50"
        aria-labelledby="community-benefits-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="community-benefits-heading" className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Why Join the Community?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Be part of a growing ecosystem of developers building the future of financial reconciliation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card
                  key={index}
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                >
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 p-2.5 mb-2 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg text-slate-900 dark:text-white">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="events-heading"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="events-heading" className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Upcoming Events
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Join our regular community events and workshops
            </p>
          </div>
          
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-lg"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-slate-900 dark:text-white mb-2">
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-300 mb-3">
                        {event.description}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-slate-300 dark:border-slate-700"
                    >
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Join ${event.title} (opens in new tab)`}
                      >
                        Join →
                      </a>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ConversionCTA
            title="Ready to Get Involved?"
            description="Join thousands of developers building with Settler. Start contributing today."
            primaryAction="Join Discord"
            primaryLink="https://discord.gg/settler"
            secondaryAction="View on GitHub"
            secondaryLink="https://github.com/settler"
            variant="gradient"
          />
        </div>
      </section>

      <Footer />
    </AnimatedPageWrapper>
  );
}
