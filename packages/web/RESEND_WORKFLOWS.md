# Resend Email Workflows Configuration

This document describes how to configure Resend email workflows and triggers for Settler newsletters and email campaigns.

## Overview

Settler uses Resend for all email communications, including:
- Free tier newsletter (weekly automation tips, workflows, news)
- Lead generation email series (4-email sequence)
- Transactional emails (welcome, password reset, etc.)

## Setup

### 1. Environment Variables

Add these to your `.env` file:

```bash
RESEND_API_KEY=re_your_resend_api_key_here
RESEND_FROM_EMAIL=noreply@settler.dev
RESEND_FROM_NAME=Settler
NEWSLETTER_API_TOKEN=your-secure-token-here  # For newsletter send API authentication
```

### 2. Resend Dashboard Configuration

1. **Create API Key**
   - Go to https://resend.com/api-keys
   - Create a new API key with "Full Access" permissions
   - Copy the key and add to `RESEND_API_KEY`

2. **Verify Domain** (Production)
   - Go to https://resend.com/domains
   - Add and verify your domain (e.g., settler.dev)
   - Update DNS records as instructed
   - Update `RESEND_FROM_EMAIL` to use your verified domain

## Newsletter Workflows

### Free Tier Newsletter (Weekly)

**Frequency:** Weekly (typically Tuesdays)

**Trigger:** Scheduled cron job or manual API call

**API Endpoint:** `POST /api/newsletter/send`

**Example Request:**
```bash
curl -X POST https://your-domain.com/api/newsletter/send \
  -H "Authorization: Bearer your-newsletter-api-token" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "automation-tips",
    "recipients": ["user@example.com"],
    "data": {
      "tips": [
        {
          "title": "Automate Daily Reconciliation",
          "description": "Set up scheduled jobs to run automatically every day.",
          "link": "https://settler.dev/docs"
        }
      ]
    }
  }'
```

**Newsletter Types:**
- `automation-tips` - Weekly automation tips
- `workflow-ideas` - New workflow templates and ideas
- `news-analysis` - Industry news with AI analysis

### Lead Generation Email Series

**Frequency:** 4 emails over 7 days (Day 0, 2, 4, 7)

**Trigger:** Automatically triggered on newsletter subscription with `type: 'lead-generation'`

**Email Sequence:**
1. **Day 0:** Welcome & Value Proposition
2. **Day 2:** Use Cases & Success Stories
3. **Day 4:** Integration Guide
4. **Day 7:** Pricing & CTA

**Implementation:**

The lead generation emails are triggered automatically when a user subscribes via `/api/newsletter/subscribe` with `type: 'lead-generation'`. In production, you would use a job scheduler (e.g., BullMQ, Vercel Cron) to send emails at the appropriate delays.

**Example using Vercel Cron:**

Create `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/newsletter/send-lead-gen",
      "schedule": "0 10 * * *"
    }
  ]
}
```

Create `/api/newsletter/send-lead-gen/route.ts`:
```typescript
import { sendTransactionalEmail } from '@/lib/resend/client';
import { getLeadGenEmail1, getLeadGenEmail2, getLeadGenEmail3, getLeadGenEmail4 } from '@/lib/resend/templates/lead-generation';

export async function GET(request: Request) {
  // Query database for users who subscribed X days ago
  // Send appropriate email based on days since subscription
  // This is a simplified example - implement proper database queries
  
  return Response.json({ success: true });
}
```

## Manual Newsletter Sending

### Using the API

Send newsletters manually via the API:

```bash
# Automation Tips Newsletter
curl -X POST https://your-domain.com/api/newsletter/send \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "automation-tips",
    "recipients": ["user1@example.com", "user2@example.com"],
    "data": {
      "tips": [
        {
          "title": "Tip Title",
          "description": "Tip description",
          "link": "https://settler.dev/docs"
        }
      ]
    }
  }'

# News Analysis Newsletter
curl -X POST https://your-domain.com/api/newsletter/send \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "news-analysis",
    "recipients": ["user@example.com"],
    "data": {
      "newsItems": [
        {
          "title": "News Title",
          "source": "TechCrunch",
          "summary": "News summary",
          "aiAnalysis": "AI analysis of the news",
          "link": "https://example.com/news"
        }
      ]
    }
  }'
```

### Using Resend Dashboard

1. Go to https://resend.com/emails
2. Click "Send Email"
3. Use the email templates from `/lib/resend/templates/`
4. Copy HTML content and paste into Resend composer

## Dynamic Content

### News Feed Integration

The `/api/newsletter/news` endpoint fetches news and generates AI analysis:

```bash
curl https://your-domain.com/api/newsletter/news?limit=5&category=all
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "title": "Financial Automation Trends",
      "source": "TechCrunch",
      "summary": "...",
      "aiAnalysis": "...",
      "link": "...",
      "publishedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "count": 5
}
```

**Integration with Newsletter:**

In production, you would:
1. Call `/api/newsletter/news` to get latest news
2. Use AI service (OpenAI, Anthropic) to generate analysis
3. Pass news items to newsletter send API

## Testing

### Local Development

1. Set `RESEND_API_KEY` in `.env.local`
2. Use Resend test mode (emails go to your test email)
3. Test newsletter subscription: `POST /api/newsletter/subscribe`
4. Test newsletter sending: `POST /api/newsletter/send` (with auth token)

### Production Testing

1. Create a test email list
2. Send test newsletters to test list
3. Verify email delivery and formatting
4. Check Resend dashboard for delivery stats

## Monitoring

### Resend Dashboard

- View email delivery stats at https://resend.com/emails
- Check bounce rates and spam complaints
- Monitor API usage and limits

### Application Logs

- Newsletter subscription logs: Check application logs for `/api/newsletter/subscribe` calls
- Newsletter send logs: Check logs for `/api/newsletter/send` calls
- Error handling: Monitor for failed email sends

## Best Practices

1. **Rate Limiting:** Respect Resend rate limits (100 emails/day on free tier)
2. **Unsubscribe:** Always include unsubscribe links in emails
3. **Email Preferences:** Allow users to manage email preferences
4. **Testing:** Test emails in multiple email clients before sending
5. **Personalization:** Use dynamic fields for personalization
6. **A/B Testing:** Test different subject lines and content
7. **Analytics:** Track open rates and click-through rates

## Troubleshooting

### Emails Not Sending

1. Check `RESEND_API_KEY` is set correctly
2. Verify domain is verified in Resend dashboard
3. Check API rate limits
4. Review application logs for errors

### Emails Going to Spam

1. Verify SPF, DKIM, and DMARC records
2. Use verified domain for `from` address
3. Avoid spam trigger words
4. Include unsubscribe link
5. Maintain good sender reputation

### Newsletter Not Triggering

1. Check cron job configuration
2. Verify database queries for subscribers
3. Check API authentication token
4. Review application logs

## Next Steps

1. **Set up cron jobs** for scheduled newsletters
2. **Integrate AI service** for news analysis generation
3. **Set up database** for subscriber management
4. **Configure domain** in Resend dashboard
5. **Test email delivery** in production
6. **Monitor metrics** and optimize

## Support

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- Settler Support: support@settler.dev
