/**
 * Lead Generation Email Series Templates
 * 
 * Email sequences for converting leads into customers
 */

export interface LeadGenEmailContent {
  subject: string;
  html: string;
  text: string;
  metadata?: Record<string, string>;
  delayDays?: number; // Days after signup to send
}

/**
 * Email 1: Welcome & Value Proposition (Day 0)
 */
export function getLeadGenEmail1(): LeadGenEmailContent {
  return {
    subject: 'Welcome to Settler - Automate Your Reconciliation in Minutes',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Settler</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Welcome to Settler!</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <p>Hi there,</p>
            
            <p>Thanks for your interest in Settler! We're excited to show you how easy it is to automate financial reconciliation across your entire tech stack.</p>
            
            <h2 style="color: #667eea; margin-top: 30px;">What is Settler?</h2>
            <p>Settler is a Reconciliation-as-a-Service API that automates financial and event data reconciliation across fragmented SaaS and e-commerce ecosystems.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="margin-top: 0; color: #667eea;">🎯 Key Benefits</h3>
              <ul style="margin-bottom: 0;">
                <li><strong>5-minute integration</strong> - Get started in minutes</li>
                <li><strong>50+ integrations</strong> - Pre-built adapters for Stripe, Shopify, QuickBooks, and more</li>
                <li><strong>99.7% accuracy</strong> - Advanced matching algorithms</li>
                <li><strong>Real-time processing</strong> - Webhook support and instant updates</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://settler.dev/playground" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">Try the Playground</a>
            </div>
            
            <p style="margin-top: 30px;">In the next few days, I'll share:</p>
            <ul>
              <li>Real-world use cases and success stories</li>
              <li>Step-by-step integration guides</li>
              <li>Best practices for reconciliation automation</li>
            </ul>
            
            <p style="margin-top: 20px;">
              Best regards,<br>
              The Settler Team
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 12px;">
            <p>Settler - Reconciliation-as-a-Service API</p>
            <p><a href="https://settler.dev/unsubscribe" style="color: #667eea;">Unsubscribe</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
Welcome to Settler!

Hi there,

Thanks for your interest in Settler! We're excited to show you how easy it is to automate financial reconciliation across your entire tech stack.

What is Settler?
Settler is a Reconciliation-as-a-Service API that automates financial and event data reconciliation across fragmented SaaS and e-commerce ecosystems.

🎯 Key Benefits
- 5-minute integration - Get started in minutes
- 50+ integrations - Pre-built adapters for Stripe, Shopify, QuickBooks, and more
- 99.7% accuracy - Advanced matching algorithms
- Real-time processing - Webhook support and instant updates

Try the Playground: https://settler.dev/playground

In the next few days, I'll share:
- Real-world use cases and success stories
- Step-by-step integration guides
- Best practices for reconciliation automation

Best regards,
The Settler Team

---
Settler - Reconciliation-as-a-Service API
Unsubscribe: https://settler.dev/unsubscribe
    `,
    metadata: {
      type: 'lead-gen',
      series: 'lead-generation',
      sequence: '1',
    },
    delayDays: 0,
  };
}

/**
 * Email 2: Use Cases & Success Stories (Day 2)
 */
export function getLeadGenEmail2(): LeadGenEmailContent {
  return {
    subject: 'How Companies Use Settler to Save 10+ Hours Per Week',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Use Cases</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Real-World Use Cases</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <p>Hi there,</p>
            
            <p>Let me show you how companies like yours are using Settler to automate reconciliation and save hours every week.</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="margin-top: 0; color: #667eea;">🏪 E-commerce: Shopify + Stripe</h3>
              <p><strong>The Challenge:</strong> Matching Shopify orders with Stripe payments manually took 5+ hours per week.</p>
              <p><strong>The Solution:</strong> Automated reconciliation runs daily, matching orders to payments in seconds.</p>
              <p><strong>The Result:</strong> 100% accuracy, zero manual work, instant exception alerts.</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="margin-top: 0; color: #667eea;">💼 SaaS: Stripe + QuickBooks</h3>
              <p><strong>The Challenge:</strong> Monthly subscription revenue reconciliation required manual spreadsheet work.</p>
              <p><strong>The Solution:</strong> Automated monthly reconciliation with revenue recognition rules.</p>
              <p><strong>The Result:</strong> Faster month-end close, accurate financial reporting, audit-ready records.</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="margin-top: 0; color: #667eea;">🌐 Multi-Platform: Multiple Payment Providers</h3>
              <p><strong>The Challenge:</strong> Reconciling payments from Stripe, PayPal, and Square separately.</p>
              <p><strong>The Solution:</strong> Single reconciliation job across all payment providers.</p>
              <p><strong>The Result:</strong> Unified view, faster reconciliation, easier exception handling.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://settler.dev/cookbooks" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">View All Use Cases</a>
            </div>
            
            <p style="margin-top: 30px;">Which use case matches your needs? Reply to this email and I'll help you get started!</p>
            
            <p style="margin-top: 20px;">
              Best regards,<br>
              The Settler Team
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 12px;">
            <p>Settler - Reconciliation-as-a-Service API</p>
            <p><a href="https://settler.dev/unsubscribe" style="color: #667eea;">Unsubscribe</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
Real-World Use Cases

Hi there,

Let me show you how companies like yours are using Settler to automate reconciliation and save hours every week.

🏪 E-commerce: Shopify + Stripe
The Challenge: Matching Shopify orders with Stripe payments manually took 5+ hours per week.
The Solution: Automated reconciliation runs daily, matching orders to payments in seconds.
The Result: 100% accuracy, zero manual work, instant exception alerts.

💼 SaaS: Stripe + QuickBooks
The Challenge: Monthly subscription revenue reconciliation required manual spreadsheet work.
The Solution: Automated monthly reconciliation with revenue recognition rules.
The Result: Faster month-end close, accurate financial reporting, audit-ready records.

🌐 Multi-Platform: Multiple Payment Providers
The Challenge: Reconciling payments from Stripe, PayPal, and Square separately.
The Solution: Single reconciliation job across all payment providers.
The Result: Unified view, faster reconciliation, easier exception handling.

View All Use Cases: https://settler.dev/cookbooks

Which use case matches your needs? Reply to this email and I'll help you get started!

Best regards,
The Settler Team

---
Settler - Reconciliation-as-a-Service API
Unsubscribe: https://settler.dev/unsubscribe
    `,
    metadata: {
      type: 'lead-gen',
      series: 'lead-generation',
      sequence: '2',
    },
    delayDays: 2,
  };
}

/**
 * Email 3: Integration Guide (Day 4)
 */
export function getLeadGenEmail3(): LeadGenEmailContent {
  return {
    subject: 'Get Started in 5 Minutes - Quick Integration Guide',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Integration Guide</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Quick Integration Guide</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <p>Hi there,</p>
            
            <p>Ready to get started? Here's how to integrate Settler in just 5 minutes:</p>
            
            <div style="background: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0; overflow-x: auto;">
              <pre style="color: #10b981; font-family: 'Courier New', monospace; font-size: 14px; margin: 0; white-space: pre-wrap;"><code># 1. Install the SDK
npm install @settler/sdk

# 2. Initialize the client
import Settler from "@settler/sdk";

const client = new Settler({
  apiKey: "sk_your_api_key",
});

# 3. Create your first reconciliation job
const job = await client.jobs.create({
  name: "Shopify-Stripe Reconciliation",
  source: { adapter: "shopify", config: {} },
  target: { adapter: "stripe", config: {} },
  rules: {
    matching: [
      { field: "order_id", type: "exact" },
      { field: "amount", type: "exact", tolerance: 0.01 },
    ],
  },
});

# 4. Run the job
const report = await client.jobs.run(job.id);
console.log(\`Matched: \${report.summary.matched}\`);</code></pre>
            </div>
            
            <h2 style="color: #667eea; margin-top: 30px;">Next Steps</h2>
            <ol>
              <li><strong>Get your API key</strong> - Sign up at <a href="https://settler.dev/signup" style="color: #667eea;">settler.dev/signup</a></li>
              <li><strong>Try the Playground</strong> - Test without signing up at <a href="https://settler.dev/playground" style="color: #667eea;">settler.dev/playground</a></li>
              <li><strong>Read the Docs</strong> - Full API reference at <a href="https://settler.dev/docs" style="color: #667eea;">settler.dev/docs</a></li>
            </ol>
            
            <div style="background: #f0f4ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #667eea;">💡 Pro Tip</h3>
              <p style="margin-bottom: 0;">Start with our <a href="https://settler.dev/cookbooks" style="color: #667eea;">pre-built cookbooks</a>. They include ready-to-use code examples for common integrations!</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://settler.dev/playground" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">Try the Playground</a>
            </div>
            
            <p style="margin-top: 30px;">Questions? Just reply to this email - I'm here to help!</p>
            
            <p style="margin-top: 20px;">
              Best regards,<br>
              The Settler Team
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 12px;">
            <p>Settler - Reconciliation-as-a-Service API</p>
            <p><a href="https://settler.dev/unsubscribe" style="color: #667eea;">Unsubscribe</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
Quick Integration Guide

Hi there,

Ready to get started? Here's how to integrate Settler in just 5 minutes:

1. Install the SDK
npm install @settler/sdk

2. Initialize the client
import Settler from "@settler/sdk";

const client = new Settler({
  apiKey: "sk_your_api_key",
});

3. Create your first reconciliation job
const job = await client.jobs.create({
  name: "Shopify-Stripe Reconciliation",
  source: { adapter: "shopify", config: {} },
  target: { adapter: "stripe", config: {} },
  rules: {
    matching: [
      { field: "order_id", type: "exact" },
      { field: "amount", type: "exact", tolerance: 0.01 },
    ],
  },
});

4. Run the job
const report = await client.jobs.run(job.id);
console.log(`Matched: ${report.summary.matched}`);

Next Steps
1. Get your API key - Sign up at settler.dev/signup
2. Try the Playground - Test without signing up at settler.dev/playground
3. Read the Docs - Full API reference at settler.dev/docs

💡 Pro Tip
Start with our pre-built cookbooks. They include ready-to-use code examples for common integrations!

Try the Playground: https://settler.dev/playground

Questions? Just reply to this email - I'm here to help!

Best regards,
The Settler Team

---
Settler - Reconciliation-as-a-Service API
Unsubscribe: https://settler.dev/unsubscribe
    `,
    metadata: {
      type: 'lead-gen',
      series: 'lead-generation',
      sequence: '3',
    },
    delayDays: 4,
  };
}

/**
 * Email 4: Pricing & CTA (Day 7)
 */
export function getLeadGenEmail4(): LeadGenEmailContent {
  return {
    subject: 'Start Your Free Trial - No Credit Card Required',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Start Your Free Trial</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Ready to Get Started?</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <p>Hi there,</p>
            
            <p>You've learned about Settler's capabilities. Now it's time to see them in action!</p>
            
            <h2 style="color: #667eea; margin-top: 30px;">Simple, Transparent Pricing</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 2px solid #667eea;">
              <h3 style="margin-top: 0; color: #667eea;">Free Tier</h3>
              <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">$0 <span style="font-size: 16px; font-weight: normal; color: #666;">forever</span></p>
              <ul style="margin-bottom: 0;">
                <li>1,000 reconciliations/month</li>
                <li>2 platform adapters</li>
                <li>7-day log retention</li>
                <li>Community support</li>
              </ul>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="margin-top: 0; color: #667eea;">Commercial</h3>
              <p style="font-size: 24px; font-weight: bold; margin: 10px 0;">$99 <span style="font-size: 16px; font-weight: normal; color: #666;">/month</span></p>
              <ul style="margin-bottom: 0;">
                <li>100,000 reconciliations/month</li>
                <li>Unlimited adapters</li>
                <li>30-day log retention</li>
                <li>Email support</li>
                <li>Platform integrations</li>
              </ul>
            </div>
            
            <div style="background: #f0f4ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #667eea;">✨ 14-Day Free Trial</h3>
              <p style="margin-bottom: 0;">All paid plans include a 14-day free trial. No credit card required to start!</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://settler.dev/playground" style="background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; font-size: 16px;">Start Free Trial</a>
            </div>
            
            <p style="margin-top: 30px;">Still have questions? Check out our <a href="https://settler.dev/pricing" style="color: #667eea;">pricing page</a> or <a href="https://settler.dev/support" style="color: #667eea;">contact support</a>.</p>
            
            <p style="margin-top: 20px;">
              Best regards,<br>
              The Settler Team
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 12px;">
            <p>Settler - Reconciliation-as-a-Service API</p>
            <p><a href="https://settler.dev/unsubscribe" style="color: #667eea;">Unsubscribe</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
Ready to Get Started?

Hi there,

You've learned about Settler's capabilities. Now it's time to see them in action!

Simple, Transparent Pricing

Free Tier
$0 forever
- 1,000 reconciliations/month
- 2 platform adapters
- 7-day log retention
- Community support

Commercial
$99 /month
- 100,000 reconciliations/month
- Unlimited adapters
- 30-day log retention
- Email support
- Platform integrations

✨ 14-Day Free Trial
All paid plans include a 14-day free trial. No credit card required to start!

Start Free Trial: https://settler.dev/playground

Still have questions? Check out our pricing page or contact support.

Best regards,
The Settler Team

---
Settler - Reconciliation-as-a-Service API
Unsubscribe: https://settler.dev/unsubscribe
    `,
    metadata: {
      type: 'lead-gen',
      series: 'lead-generation',
      sequence: '4',
    },
    delayDays: 7,
  };
}
