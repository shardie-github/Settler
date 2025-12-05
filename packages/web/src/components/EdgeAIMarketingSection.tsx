'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { 
  Cpu, 
  Zap, 
  Shield, 
  Brain,
  Network,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface EdgeAIMarketingSectionProps {
  variant?: 'default' | 'compact' | 'featured';
  showCTA?: boolean;
  className?: string;
}

/**
 * Edge AI Marketing Section Component
 * 
 * Showcases Settler.dev Edge AI capabilities with links to AIAS Edge Studio
 * for model optimization. Maintains separate branding between Settler.dev and AIAS.
 */
export function EdgeAIMarketingSection({
  variant = 'default',
  showCTA = true,
  className = '',
}: EdgeAIMarketingSectionProps) {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  // AIAS Edge Studio link - external link maintaining separate brand
  const aiasStudioUrl = process.env.NEXT_PUBLIC_AIAS_STUDIO_URL || 'https://aias.studio';
  
  const features = [
    {
      icon: Zap,
      title: 'Ultra-Low Latency',
      description: 'Process reconciliation locally with <10ms latency',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Privacy-First',
      description: 'PII redaction and tokenization before cloud sync',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Brain,
      title: 'AI-Optimized Models',
      description: 'Device-specific optimization for maximum performance',
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Network,
      title: 'Offline Capable',
      description: 'Continue processing during network outages',
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  if (isCompact) {
    return (
      <div className={`py-8 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Edge AI Reconciliation
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Local processing with AI-powered matching
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline" size="sm">
                <Link href="/edge-ai">Learn More</Link>
              </Button>
              <Button asChild size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600">
                <Link href="/edge-ai/nodes">Deploy Node</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section 
      className={`py-20 px-4 sm:px-6 lg:px-8 ${isFeatured ? 'bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900' : 'bg-white/50 dark:bg-slate-800/50'} ${className}`}
      aria-labelledby="edge-ai-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge 
            className="mb-4 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 dark:from-purple-900 dark:to-indigo-900 dark:text-purple-300 border-purple-300 dark:border-purple-700"
          >
            <Cpu className="w-3 h-3 mr-2" />
            Edge AI Platform
          </Badge>
          <h2 
            id="edge-ai-heading"
            className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white"
          >
            Dual-Layer Cloud + Edge AI
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-6">
            Real-time, local processing with AI-powered matching. Deploy edge nodes for 
            ultra-low latency reconciliation while maintaining cloud intelligence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <SpotlightCard 
                key={index}
                className="h-full"
                spotlightColor="rgba(139, 92, 246, 0.2)"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} p-3 mb-4 flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </SpotlightCard>
            );
          })}
        </div>

        {/* Model Optimization Section with AIAS Link */}
        <Card className="mb-12 border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <CardTitle className="text-2xl text-slate-900 dark:text-white mb-2">
                  AI-Optimized Models
                </CardTitle>
                <CardDescription className="text-base">
                  Quantized models (int4/int8) optimized for your specific device architecture. 
                  Achieve maximum performance with minimal resource usage.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                  Optimize your Edge AI models for deployment with advanced quantization and 
                  device-specific tuning. Settler.dev integrates with{' '}
                  <span className="font-semibold text-slate-900 dark:text-white">
                    AIAS Edge Studio
                  </span>
                  {' '}for professional model optimization services.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-purple-300 dark:border-purple-700">
                    Quantization
                  </Badge>
                  <Badge variant="outline" className="border-purple-300 dark:border-purple-700">
                    Device Tuning
                  </Badge>
                  <Badge variant="outline" className="border-purple-300 dark:border-purple-700">
                    Benchmarking
                  </Badge>
                </div>
              </div>
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white whitespace-nowrap"
              >
                <a 
                  href={aiasStudioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Optimize Models
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Model optimization powered by{' '}
                <a 
                  href={aiasStudioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  AIAS Edge Studio
                </a>
                {' '}— a separate service for Edge AI model optimization
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        {showCTA && (
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                <Link href="/edge-ai/nodes">
                  Deploy Edge Node
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
              >
                <Link href="/edge-ai">
                  Learn More About Edge AI
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Need model optimization?{' '}
              <a 
                href={aiasStudioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-purple-600 dark:text-purple-400 hover:underline"
              >
                Visit AIAS Edge Studio
                <ExternalLink className="w-3 h-3 inline ml-1" />
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
