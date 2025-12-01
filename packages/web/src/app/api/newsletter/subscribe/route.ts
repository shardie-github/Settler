import { NextRequest, NextResponse } from 'next/server';
import { sendNewsletterEmail } from '@/lib/resend/client';
import { getWelcomeNewsletter } from '@/lib/resend/templates/newsletter-free-tier';

/**
 * Newsletter Subscription API
 * 
 * Handles newsletter subscriptions and sends welcome email
 */

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, type = 'free-tier' } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // TODO: Store subscription in database (Supabase)
    // Example:
    // const supabase = createClient();
    // await supabase.from('newsletter_subscriptions').insert({
    //   email,
    //   type,
    //   subscribed_at: new Date().toISOString(),
    // });

    // Send welcome email based on type
    if (type === 'free-tier') {
      const welcomeEmail = getWelcomeNewsletter();
      await sendNewsletterEmail({
        to: email,
        subject: welcomeEmail.subject,
        html: welcomeEmail.html,
        text: welcomeEmail.text,
        metadata: welcomeEmail.metadata,
      });
    }

    // TODO: Schedule follow-up emails using Resend or cron job
    // This would typically be handled by a background job scheduler

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter',
        email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      {
        error: 'Failed to subscribe to newsletter',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
