# Settler Email Template System

**Purpose:** Dynamic email template system with lifecycle emails, reusable components, and merge field support

---

## Structure

```
/emails/
  lifecycle/          # Lifecycle email templates (trial, paid, retention)
  shared/
    components/       # Reusable email components (header, footer, button)
    styles/          # Email CSS styles
  fields/            # Dynamic field definitions
```

---

## Dynamic Fields

All templates support dynamic merge fields defined in `fields/dynamic_fields.json`.

### Usage

Replace placeholders in templates with actual values:
- `{{user.first_name}}` → "John"
- `{{trial_end_date}}` → "2025-02-15"
- `{{upgrade_url}}` → "https://settler.dev/pricing"

### Field Categories

**User Fields:**
- `{{user.first_name}}`
- `{{user.last_name}}`
- `{{user.email}}`
- `{{user.industry}}`
- `{{user.company_name}}`
- `{{user.plan_type}}`

**Trial Fields:**
- `{{trial_end_date}}`
- `{{trial_start_date}}`
- `{{days_remaining}}`
- `{{charge_date}}`

**Product Fields:**
- `{{product_name}}`
- `{{upgrade_url}}`
- `{{dashboard_url}}`
- `{{support_url}}`
- `{{pricing_url}}`
- `{{docs_url}}`
- `{{playground_url}}`
- `{{cookbooks_url}}`

**Reconciliation Fields:**
- `{{job_name}}`
- `{{job_id}}`
- `{{matched_count}}`
- `{{unmatched_count}}`
- `{{accuracy}}`
- `{{time_saved}}`
- `{{report_url}}`
- `{{platform_name}}`

**Recommendation Fields:**
- `{{next_recommendation}}`
- `{{workflow_suggestion}}`
- `{{analysis_summary}}`
- `{{top_insight_1}}`
- `{{top_insight_2}}`
- `{{recommendation_1}}`
- `{{recommendation_2}}`

**Metrics Fields:**
- `{{total_reconciliations}}`
- `{{jobs_created}}`
- `{{accuracy}}`
- `{{time_saved}}`

**Workflow Fields:**
- `{{workflow_name}}`
- `{{workflow_description}}`
- `{{use_case}}`
- `{{setup_time}}`
- `{{workflow_url}}`

**Case Study Fields:**
- `{{similar_company}}`
- `{{case_study_url}}`
- `{{case_studies_url}}`

**Monthly Fields:**
- `{{month}}`
- `{{renewal_date}}`
- `{{milestone_name}}`
- `{{milestone_metric}}`

**URL Fields:**
- `{{profile_setup_url}}`
- `{{demo_url}}`
- `{{free_tier_url}}`
- `{{free_tier_info_url}}`
- `{{consultation_url}}`
- `{{insights_url}}`

---

## Reusable Components

### Header Component

**File:** `shared/components/header.html`

Includes:
- Settler branding
- Responsive layout
- Email-safe styling

**Usage:**
```html
{{> header}}
  <!-- Your email content here -->
{{> footer}}
```

### Footer Component

**File:** `shared/components/footer.html`

Includes:
- Company information
- Unsubscribe link
- Email preferences link

**Usage:**
```html
{{> header}}
  <!-- Your email content here -->
{{> footer}}
```

### Button Component

**File:** `shared/components/button.html`

**Usage:**
```html
{{> button button_text="Upgrade Now" button_url="{{upgrade_url}}" button_color="#2563eb"}}
```

**Parameters:**
- `button_text`: Button label
- `button_url`: Button link URL
- `button_color`: Button background color (default: #2563eb)
- `button_style`: Additional inline styles (optional)

---

## Lifecycle Emails

### Trial Emails

**trial_welcome.html** - Day 0: Welcome email with quick start steps

**trial_day2.html** - Day 2-3: First value demonstration

**trial_day7.html** - Day 7: Introduce gated features

**trial_day14.html** - Day 14: Case study / success story

**trial_day21.html** - Day 21: "What you're missing" comparison

**trial_day27.html** - Day 27: Urgency email (3 days left)

**trial_day28.html** - Day 28: Last chance (1 day left)

**trial_day29.html** - Day 29: Final reminder

**trial_ended.html** - Day 30: Trial end, choose plan

### Paid Emails

**paid_welcome.html** - Month 1: Welcome to Commercial plan

**monthly_summary.html** - First of month: Monthly summary

**monthly_insights.html** - Mid-month: Monthly insights

**new_workflow.html** - New workflow available

**new_analysis.html** - New reconciliation analysis ready

### Retention Emails

**low_activity.html** - User inactive for 7+ days

**renewal_reminder.html** - 7 days before renewal (annual plans)

**milestone.html** - User reaches usage milestone

---

## Email Template Best Practices

### HTML Structure

1. **Use inline styles** - Email clients strip `<style>` tags
2. **Table-based layouts** - Better email client compatibility
3. **Responsive design** - Mobile-friendly templates
4. **Plain text fallback** - Always provide plain text version

### Content Guidelines

1. **Clear subject lines** - Include benefit or urgency
2. **Preview text** - First 100-150 characters visible in inbox
3. **Single CTA** - One primary action per email
4. **Personalization** - Use `{{user.first_name}}` throughout
5. **Value-focused** - Lead with benefits, not features

### Design Guidelines

1. **Brand colors** - Use Settler blue (#2563eb) consistently
2. **Readable fonts** - System fonts for best compatibility
3. **Button styling** - Clear, prominent CTAs
4. **Spacing** - Adequate whitespace for readability
5. **Images** - Use sparingly, always include alt text

---

## Implementation

### Integration with Email Service

Templates are designed to work with:
- Resend (current implementation)
- SendGrid
- Mailgun
- AWS SES

### Template Rendering

Use a templating engine (Handlebars, Mustache, etc.) to:
1. Load template file
2. Replace merge fields with actual values
3. Render HTML
4. Send via email service

### Example Integration

```typescript
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { sendEmail } from '../lib/email';

// Load template
const templateSource = readFileSync('emails/lifecycle/trial_welcome.html', 'utf8');
const template = Handlebars.compile(templateSource);

// Prepare data
const data = {
  user: {
    first_name: 'John',
    email: 'john@example.com',
  },
  trial_end_date: '2025-02-15',
  dashboard_url: 'https://app.settler.dev/dashboard',
  // ... other fields
};

// Render template
const html = template(data);

// Send email
await sendEmail({
  to: data.user.email,
  subject: 'Welcome to Settler! 🎉',
  html,
  text: generatePlainText(html), // Convert HTML to plain text
});
```

---

## Testing

### Email Testing Checklist

- [ ] Test in multiple email clients (Gmail, Outlook, Apple Mail)
- [ ] Test on mobile devices
- [ ] Verify all links work
- [ ] Check merge fields are replaced correctly
- [ ] Verify plain text version
- [ ] Test unsubscribe functionality
- [ ] Check spam score (use tools like Mail-Tester)

### A/B Testing

Test variations of:
- Subject lines
- CTA button text
- Email timing
- Content length
- Personalization level

---

## Maintenance

### Regular Updates

- **Quarterly:** Review and update email copy
- **Monthly:** Check for broken links
- **Weekly:** Monitor email performance metrics

### Performance Metrics

Track:
- Open rates
- Click-through rates
- Conversion rates
- Unsubscribe rates
- Spam complaints

---

## Support

For questions or issues with email templates:
- Check `docs/monthly_cadence_engine.md` for email strategy
- Review `fields/dynamic_fields.json` for available fields
- Contact: support@settler.dev

---

**Last Updated:** 2025-01-XX
