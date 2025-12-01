/**
 * Resend Email Client
 * 
 * Email service integration using Resend API
 * Used for transactional emails, newsletters, and automated campaigns
 */

import { Resend } from 'resend';

// Initialize Resend client
const resendApiKey = process.env.RESEND_API_KEY || '';
const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@settler.dev';
const resendFromName = process.env.RESEND_FROM_NAME || 'Settler';

let resendClient: Resend | null = null;

/**
 * Get Resend client instance
 */
export function getResendClient(): Resend {
  if (!resendClient) {
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY not configured. Email functionality will be disabled.');
      // Return a mock client for development
      return {} as Resend;
    }
    resendClient = new Resend(resendApiKey);
  }
  return resendClient;
}

/**
 * Send email using Resend
 */
export async function sendEmail(params: {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
  tags?: string[];
  metadata?: Record<string, string>;
}) {
  const client = getResendClient();
  
  if (!resendApiKey) {
    console.warn('Resend API key not configured. Email not sent:', params);
    return { id: 'mock-email-id', error: null };
  }

  try {
    const result = await client.emails.send({
      from: params.from || `${resendFromName} <${resendFromEmail}>`,
      to: Array.isArray(params.to) ? params.to : [params.to],
      subject: params.subject,
      html: params.html,
      text: params.text,
      reply_to: params.replyTo,
      tags: params.tags,
      metadata: params.metadata,
    });

    return result;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}

/**
 * Send newsletter email
 */
export async function sendNewsletterEmail(params: {
  to: string | string[];
  templateId?: string;
  subject: string;
  html: string;
  text?: string;
  tags?: string[];
  metadata?: Record<string, string>;
}) {
  return sendEmail({
    ...params,
    tags: ['newsletter', ...(params.tags || [])],
    metadata: {
      type: 'newsletter',
      ...params.metadata,
    },
  });
}

/**
 * Send transactional email (welcome, password reset, etc.)
 */
export async function sendTransactionalEmail(params: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  tags?: string[];
  metadata?: Record<string, string>;
}) {
  return sendEmail({
    ...params,
    tags: ['transactional', ...(params.tags || [])],
    metadata: {
      type: 'transactional',
      ...params.metadata,
    },
  });
}
