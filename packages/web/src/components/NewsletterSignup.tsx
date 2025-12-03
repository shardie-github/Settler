'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 3000);
        resolve();
      }, 1000);
    });
  };

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl text-white mb-2">
          Stay Updated
        </CardTitle>
        <CardDescription className="text-blue-100">
          Get product updates, API changes, and reconciliation tips delivered to your inbox
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 rounded-md bg-white text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />
          <Button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 font-semibold whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? '✓ Subscribed!' : 'Subscribe'}
          </Button>
        </form>
        <p className="text-xs text-blue-100 text-center mt-4">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </CardContent>
    </Card>
  );
}
