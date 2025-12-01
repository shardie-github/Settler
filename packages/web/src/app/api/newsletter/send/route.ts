import { NextRequest, NextResponse } from 'next/server';
import { sendNewsletterEmail } from '@/lib/resend/client';
import {
  getAutomationTipsNewsletter,
  getWorkflowIdeasNewsletter,
  getNewsAnalysisNewsletter,
} from '@/lib/resend/templates/newsletter-free-tier';

/**
 * Newsletter Send API
 * 
 * Sends newsletter emails to subscribers
 * Can be triggered manually or via scheduled job
 */

export const dynamic = 'force-dynamic';

// Basic auth check (in production, use proper authentication)
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.NEWSLETTER_API_TOKEN || 'dev-token';
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  
  const token = authHeader.substring(7);
  return token === expectedToken;
}

export async function POST(request: NextRequest) {
  try {
    // Check authorization
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, recipients, data } = body;

    if (!type || !recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json(
        { error: 'Type and recipients array are required' },
        { status: 400 }
      );
    }

    let emailContent;

    // Generate email content based on type
    switch (type) {
      case 'automation-tips':
        if (!data?.tips || !Array.isArray(data.tips)) {
          return NextResponse.json(
            { error: 'Tips array is required for automation-tips type' },
            { status: 400 }
          );
        }
        emailContent = getAutomationTipsNewsletter(data.tips);
        break;

      case 'workflow-ideas':
        if (!data?.workflows || !Array.isArray(data.workflows)) {
          return NextResponse.json(
            { error: 'Workflows array is required for workflow-ideas type' },
            { status: 400 }
          );
        }
        emailContent = getWorkflowIdeasNewsletter(data.workflows);
        break;

      case 'news-analysis':
        if (!data?.newsItems || !Array.isArray(data.newsItems)) {
          return NextResponse.json(
            { error: 'News items array is required for news-analysis type' },
            { status: 400 }
          );
        }
        emailContent = getNewsAnalysisNewsletter(data.newsItems);
        break;

      default:
        return NextResponse.json(
          { error: `Unknown newsletter type: ${type}` },
          { status: 400 }
        );
    }

    // Send emails to all recipients
    const results = await Promise.allSettled(
      recipients.map((email: string) =>
        sendNewsletterEmail({
          to: email,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
          metadata: {
            ...emailContent.metadata,
            newsletterType: type,
          },
        })
      )
    );

    const successful = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    return NextResponse.json(
      {
        success: true,
        message: `Newsletter sent to ${successful} recipients`,
        stats: {
          total: recipients.length,
          successful,
          failed,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      {
        error: 'Failed to send newsletter',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
