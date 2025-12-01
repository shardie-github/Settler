/**
 * Free Tier Newsletter Email Templates
 * 
 * Templates for free tier users with automation tips, workflows, and news
 */

export interface NewsletterContent {
  subject: string;
  html: string;
  text: string;
  metadata?: Record<string, string>;
}

/**
 * Welcome email for free tier users
 */
export function getWelcomeNewsletter(): NewsletterContent {
  return {
    subject: 'Welcome to Settler! 🎉 Your Automation Journey Starts Here',
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
            <h1 style="color: white; margin: 0;">Welcome to Settler! 🎉</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <p>Hi there!</p>
            
            <p>Welcome to Settler - your new automation partner for financial reconciliation. We're excited to have you on board!</p>
            
            <h2 style="color: #667eea; margin-top: 30px;">🚀 Getting Started</h2>
            <p>Here's what you can do right now:</p>
            <ul>
              <li><strong>Try our Playground</strong> - Test the API without signing up</li>
              <li><strong>Explore Cookbooks</strong> - Pre-built recipes for common integrations</li>
              <li><strong>Read the Docs</strong> - Complete API reference and guides</li>
            </ul>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="margin-top: 0; color: #667eea;">💡 Pro Tip</h3>
              <p style="margin-bottom: 0;">Start with our Shopify-Stripe reconciliation example. It's the perfect way to see Settler in action!</p>
            </div>
            
            <h2 style="color: #667eea; margin-top: 30px;">📧 What to Expect</h2>
            <p>You'll receive weekly emails with:</p>
            <ul>
              <li>✨ Automation tips and best practices</li>
              <li>🔄 New workflow ideas and templates</li>
              <li>📰 Industry news and AI-powered analysis</li>
              <li>🎯 Quick wins for your reconciliation needs</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://settler.dev/playground" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">Try the Playground</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Questions? Just reply to this email - we're here to help!
            </p>
            
            <p style="margin-top: 20px;">
              Best regards,<br>
              The Settler Team
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 12px;">
            <p>Settler - Reconciliation-as-a-Service API</p>
            <p><a href="https://settler.dev/unsubscribe" style="color: #667eea;">Unsubscribe</a> | <a href="https://settler.dev/preferences" style="color: #667eea;">Email Preferences</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
Welcome to Settler! 🎉

Hi there!

Welcome to Settler - your new automation partner for financial reconciliation. We're excited to have you on board!

🚀 Getting Started
Here's what you can do right now:
- Try our Playground - Test the API without signing up
- Explore Cookbooks - Pre-built recipes for common integrations
- Read the Docs - Complete API reference and guides

💡 Pro Tip
Start with our Shopify-Stripe reconciliation example. It's the perfect way to see Settler in action!

📧 What to Expect
You'll receive weekly emails with:
- ✨ Automation tips and best practices
- 🔄 New workflow ideas and templates
- 📰 Industry news and AI-powered analysis
- 🎯 Quick wins for your reconciliation needs

Try the Playground: https://settler.dev/playground

Questions? Just reply to this email - we're here to help!

Best regards,
The Settler Team

---
Settler - Reconciliation-as-a-Service API
Unsubscribe: https://settler.dev/unsubscribe
Email Preferences: https://settler.dev/preferences
    `,
    metadata: {
      type: 'welcome',
      series: 'free-tier-newsletter',
    },
  };
}

/**
 * Weekly automation tips newsletter
 */
export function getAutomationTipsNewsletter(tips: Array<{ title: string; description: string; link?: string }>): NewsletterContent {
  return {
    subject: '🚀 This Week\'s Top Automation Tips',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Automation Tips</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">🚀 Automation Tips</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Weekly insights to level up your reconciliation</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <p>Hi there!</p>
            
            <p>Here are this week's top automation tips to help you get the most out of Settler:</p>
            
            ${tips.map((tip, index) => `
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                <h3 style="margin-top: 0; color: #667eea;">Tip #${index + 1}: ${tip.title}</h3>
                <p style="margin-bottom: ${tip.link ? '15px' : '0'};">${tip.description}</p>
                ${tip.link ? `<a href="${tip.link}" style="color: #667eea; text-decoration: none; font-weight: 600;">Learn more →</a>` : ''}
              </div>
            `).join('')}
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://settler.dev/docs" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">Explore Documentation</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Have a tip to share? Reply to this email - we'd love to feature it!
            </p>
            
            <p style="margin-top: 20px;">
              Happy automating!<br>
              The Settler Team
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 12px;">
            <p>Settler - Reconciliation-as-a-Service API</p>
            <p><a href="https://settler.dev/unsubscribe" style="color: #667eea;">Unsubscribe</a> | <a href="https://settler.dev/preferences" style="color: #667eea;">Email Preferences</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
🚀 Automation Tips
Weekly insights to level up your reconciliation

Hi there!

Here are this week's top automation tips to help you get the most out of Settler:

${tips.map((tip, index) => `
Tip #${index + 1}: ${tip.title}
${tip.description}
${tip.link ? `Learn more: ${tip.link}` : ''}
`).join('\n\n')}

Explore Documentation: https://settler.dev/docs

Have a tip to share? Reply to this email - we'd love to feature it!

Happy automating!
The Settler Team

---
Settler - Reconciliation-as-a-Service API
Unsubscribe: https://settler.dev/unsubscribe
Email Preferences: https://settler.dev/preferences
    `,
    metadata: {
      type: 'automation-tips',
      series: 'free-tier-newsletter',
    },
  };
}

/**
 * Workflow ideas newsletter
 */
export function getWorkflowIdeasNewsletter(workflows: Array<{ name: string; description: string; useCase: string; link?: string }>): NewsletterContent {
  return {
    subject: '🔄 New Workflow Ideas for Your Business',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Workflow Ideas</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">🔄 Workflow Ideas</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Ready-to-use reconciliation workflows</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <p>Hi there!</p>
            
            <p>Looking for new ways to automate your reconciliation? Here are some workflow ideas you can implement today:</p>
            
            ${workflows.map((workflow) => `
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                <h3 style="margin-top: 0; color: #667eea;">${workflow.name}</h3>
                <p><strong>Use Case:</strong> ${workflow.useCase}</p>
                <p>${workflow.description}</p>
                ${workflow.link ? `<a href="${workflow.link}" style="color: #667eea; text-decoration: none; font-weight: 600;">View Recipe →</a>` : ''}
              </div>
            `).join('')}
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://settler.dev/cookbooks" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">Browse All Cookbooks</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Need help implementing a workflow? Check out our <a href="https://settler.dev/docs" style="color: #667eea;">documentation</a> or <a href="https://settler.dev/support" style="color: #667eea;">contact support</a>.
            </p>
            
            <p style="margin-top: 20px;">
              Best regards,<br>
              The Settler Team
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 12px;">
            <p>Settler - Reconciliation-as-a-Service API</p>
            <p><a href="https://settler.dev/unsubscribe" style="color: #667eea;">Unsubscribe</a> | <a href="https://settler.dev/preferences" style="color: #667eea;">Email Preferences</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
🔄 Workflow Ideas
Ready-to-use reconciliation workflows

Hi there!

Looking for new ways to automate your reconciliation? Here are some workflow ideas you can implement today:

${workflows.map((workflow) => `
${workflow.name}
Use Case: ${workflow.useCase}
${workflow.description}
${workflow.link ? `View Recipe: ${workflow.link}` : ''}
`).join('\n\n')}

Browse All Cookbooks: https://settler.dev/cookbooks

Need help implementing a workflow? Check out our documentation or contact support.

Best regards,
The Settler Team

---
Settler - Reconciliation-as-a-Service API
Unsubscribe: https://settler.dev/unsubscribe
Email Preferences: https://settler.dev/preferences
    `,
    metadata: {
      type: 'workflow-ideas',
      series: 'free-tier-newsletter',
    },
  };
}

/**
 * News feed with AI analysis newsletter
 */
export function getNewsAnalysisNewsletter(newsItems: Array<{ title: string; source: string; summary: string; aiAnalysis: string; link?: string }>): NewsletterContent {
  return {
    subject: '📰 Industry News & AI Analysis',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>News & Analysis</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">📰 News & Analysis</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">What's happening in reconciliation & automation</p>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
            <p>Hi there!</p>
            
            <p>Here's what's happening in the world of financial reconciliation and automation, with quick AI-powered analysis:</p>
            
            ${newsItems.map((item) => `
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
                <h3 style="margin-top: 0; color: #667eea;">${item.title}</h3>
                <p style="font-size: 14px; color: #666; margin-bottom: 10px;">Source: ${item.source}</p>
                <p><strong>Summary:</strong> ${item.summary}</p>
                <div style="background: #f0f4ff; padding: 15px; border-radius: 6px; margin-top: 15px;">
                  <p style="margin: 0; font-size: 14px;"><strong>🤖 AI Analysis:</strong></p>
                  <p style="margin: 5px 0 0 0; font-size: 14px;">${item.aiAnalysis}</p>
                </div>
                ${item.link ? `<a href="${item.link}" style="color: #667eea; text-decoration: none; font-weight: 600; display: inline-block; margin-top: 10px;">Read more →</a>` : ''}
              </div>
            `).join('')}
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://settler.dev/newsletter" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">View Full Newsletter</a>
            </div>
            
            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Want to see more analysis? Reply with topics you're interested in!
            </p>
            
            <p style="margin-top: 20px;">
              Stay informed,<br>
              The Settler Team
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 12px;">
            <p>Settler - Reconciliation-as-a-Service API</p>
            <p><a href="https://settler.dev/unsubscribe" style="color: #667eea;">Unsubscribe</a> | <a href="https://settler.dev/preferences" style="color: #667eea;">Email Preferences</a></p>
          </div>
        </body>
      </html>
    `,
    text: `
📰 News & Analysis
What's happening in reconciliation & automation

Hi there!

Here's what's happening in the world of financial reconciliation and automation, with quick AI-powered analysis:

${newsItems.map((item) => `
${item.title}
Source: ${item.source}

Summary: ${item.summary}

🤖 AI Analysis:
${item.aiAnalysis}

${item.link ? `Read more: ${item.link}` : ''}
`).join('\n\n---\n\n')}

View Full Newsletter: https://settler.dev/newsletter

Want to see more analysis? Reply with topics you're interested in!

Stay informed,
The Settler Team

---
Settler - Reconciliation-as-a-Service API
Unsubscribe: https://settler.dev/unsubscribe
Email Preferences: https://settler.dev/preferences
    `,
    metadata: {
      type: 'news-analysis',
      series: 'free-tier-newsletter',
    },
  };
}
