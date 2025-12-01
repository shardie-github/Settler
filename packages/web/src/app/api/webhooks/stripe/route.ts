import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

/**
 * Stripe Webhook Handler
 * 
 * Handles Stripe webhook events for payment processing, subscription management, etc.
 * Configure webhook endpoint in Stripe Dashboard: https://dashboard.stripe.com/webhooks
 * 
 * Webhook URL: https://your-domain.com/api/webhooks/stripe
 * Events to subscribe: payment_intent.succeeded, customer.subscription.created, etc.
 */

export const dynamic = 'force-dynamic';

// Initialize Stripe - API key will come from environment variable
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || '',
  {
    apiVersion: '2024-11-20.acacia',
  }
);

// Webhook secret from Stripe Dashboard (starts with whsec_)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    if (!webhookSecret) {
      console.warn('STRIPE_WEBHOOK_SECRET not configured. Webhook verification disabled.');
      // In development, you might want to allow this, but in production it should fail
      // return NextResponse.json(
      //   { error: 'Webhook secret not configured' },
      //   { status: 500 }
      // );
    }

    let event: Stripe.Event;

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret || 'whsec_placeholder' // Placeholder for development
      );
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      console.error('Webhook signature verification failed:', error.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed', details: error.message },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionChange(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json(
      { received: true, eventType: event.type },
      { status: 200 }
    );
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      {
        error: 'Webhook processing failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Event handlers
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);
  // TODO: Update database, send confirmation email, etc.
  // Example: await updateSubscriptionStatus(paymentIntent.customer, 'active');
}

async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment failed:', paymentIntent.id);
  // TODO: Notify user, update database, etc.
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  console.log('Subscription changed:', subscription.id);
  // TODO: Update subscription status in database
  // Example: await updateSubscription(subscription.id, subscription.status);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id);
  // TODO: Update subscription status, revoke access, etc.
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Invoice payment succeeded:', invoice.id);
  // TODO: Update billing records, send receipt, etc.
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Invoice payment failed:', invoice.id);
  // TODO: Notify user, update billing status, etc.
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout session completed:', session.id);
  // TODO: Activate subscription, grant access, send welcome email, etc.
}
