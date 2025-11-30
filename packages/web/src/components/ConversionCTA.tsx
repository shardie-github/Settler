import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ConversionCTAProps {
  title?: string;
  description?: string;
  primaryAction?: string;
  primaryLink?: string;
  secondaryAction?: string;
  secondaryLink?: string;
  variant?: 'default' | 'gradient' | 'minimal';
}

export function ConversionCTA({
  title = 'Ready to Get Started?',
  description = 'Start reconciling your data in minutes. No credit card required.',
  primaryAction = 'Start Free Trial',
  primaryLink = '/playground',
  secondaryAction = 'View Pricing',
  secondaryLink = '/pricing',
  variant = 'gradient',
}: ConversionCTAProps) {
  if (variant === 'minimal') {
    return (
      <div className="text-center py-12" role="region" aria-labelledby="cta-title">
        <h3 id="cta-title" className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">{description}</p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          role="group"
          aria-label="Call to action buttons"
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Link href={primaryLink} aria-label={primaryAction}>
              {primaryAction}
            </Link>
          </Button>
          {secondaryAction && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Link href={secondaryLink} aria-label={secondaryAction}>
                {secondaryAction}
              </Link>
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <Card
        className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 shadow-2xl transition-all duration-500 hover:shadow-3xl"
        role="region"
        aria-labelledby="cta-title"
      >
        <CardHeader className="text-center">
          <CardTitle id="cta-title" className="text-3xl md:text-4xl text-white mb-4">
            {title}
          </CardTitle>
          <CardDescription className="text-blue-100 text-lg">{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            role="group"
            aria-label="Call to action buttons"
          >
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Link href={primaryLink} aria-label={primaryAction}>
                {primaryAction}
              </Link>
            </Button>
            {secondaryAction && (
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg transition-all transform hover:scale-105 focus:ring-2 focus:ring-white focus:ring-offset-2"
              >
                <Link href={secondaryLink} aria-label={secondaryAction}>
                  {secondaryAction}
                </Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl transition-all duration-500 hover:shadow-2xl"
      role="region"
      aria-labelledby="cta-title"
    >
      <CardHeader className="text-center">
        <CardTitle id="cta-title" className="text-2xl md:text-3xl text-slate-900 dark:text-white mb-2">
          {title}
        </CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-300">{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          role="group"
          aria-label="Call to action buttons"
        >
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Link href={primaryLink} aria-label={primaryAction}>
              {primaryAction}
            </Link>
          </Button>
          {secondaryAction && (
            <Button
              size="lg"
              variant="outline"
              asChild
              className="transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Link href={secondaryLink} aria-label={secondaryAction}>
                {secondaryAction}
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
