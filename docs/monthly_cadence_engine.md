# Monthly Cadence Engine

**Date:** 2025-01-XX  
**Purpose:** Complete free trial + paid subscription content cadence with daily/weekly touchpoints

---

## Executive Summary

This document defines the complete value cadence for Settler's subscription product, including:
- 30-day free trial sequence (daily → weekly touchpoints)
- Paid monthly subscription cadence (Month 1 onward)
- Content gating strategy (free vs paid)
- Retention system (monthly milestones, low activity nudges, renewal reminders)

---

## A. Free Trial (0-30 Days)

### Trial Structure

**Length:** 30 days  
**Activation:** Email address only (no credit card required)  
**Access Level:** Full access to all features during trial  
**Conversion Goal:** Trial → Paid ($99/month Commercial plan)

---

### Day 0: Welcome + Activation

**Channels:** Email (immediate), In-App (on first visit)

#### Email: Welcome to Settler

**Subject Line Options:**
- "Welcome to Settler! Here's how to get value in 10 minutes"
- "Your 30-day free trial starts now 🎉"
- "Welcome, {{user.first_name}}! Let's get you set up"

**Preview Text:** "No credit card required. Full access for 30 days."

**Body (HTML + Plain Text):**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #2563eb;">Welcome to Settler, {{user.first_name}}! 🎉</h1>
  
  <p>Your 30-day free trial starts now—no credit card required.</p>
  
  <p>Here's how to get value in the next 10 minutes:</p>
  
  <ol style="line-height: 2;">
    <li><strong>Complete your profile</strong> (2 min)<br>
    → Help us personalize your experience<br>
    <a href="{{profile_setup_url}}" style="color: #2563eb;">Complete Profile →</a></li>
    
    <li><strong>Connect your first platform</strong> (3 min)<br>
    → See how easy it is to match transactions<br>
    <a href="{{playground_url}}" style="color: #2563eb;">Try Playground →</a></li>
    
    <li><strong>Try a demo reconciliation</strong> (5 min)<br>
    → See results in real-time<br>
    <a href="{{demo_url}}" style="color: #2563eb;">Run Demo →</a></li>
  </ol>
  
  <div style="background-color: #f0f9ff; border-left: 4px solid #2563eb; padding: 16px; margin: 24px 0;">
    <p style="margin: 0;"><strong>Your trial includes:</strong></p>
    <ul style="margin: 8px 0 0 0; padding-left: 20px;">
      <li>Full access to all features</li>
      <li>Unlimited reconciliations</li>
      <li>All cookbooks and workflows</li>
      <li>Free 30-minute consultation (worth $200)</li>
    </ul>
  </div>
  
  <p>Your trial ends on <strong>{{trial_end_date}}</strong>. We'll send you helpful tips along the way.</p>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="{{dashboard_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Go to Dashboard</a>
  </div>
  
  <p style="color: #666; font-size: 14px;">Questions? Just reply to this email—we're here to help.</p>
  
  <p style="color: #666; font-size: 14px; margin-top: 30px;">
    Best,<br>
    The Settler Team
  </p>
</body>
</html>
```

**Plain Text Version:**
```
Welcome to Settler, {{user.first_name}}! 🎉

Your 30-day free trial starts now—no credit card required.

Here's how to get value in the next 10 minutes:

1. Complete your profile (2 min)
   → Help us personalize your experience
   {{profile_setup_url}}

2. Connect your first platform (3 min)
   → See how easy it is to match transactions
   {{playground_url}}

3. Try a demo reconciliation (5 min)
   → See results in real-time
   {{demo_url}}

Your trial includes:
- Full access to all features
- Unlimited reconciliations
- All cookbooks and workflows
- Free 30-minute consultation (worth $200)

Your trial ends on {{trial_end_date}}. We'll send you helpful tips along the way.

Go to Dashboard: {{dashboard_url}}

Questions? Just reply to this email—we're here to help.

Best,
The Settler Team
```

**In-App:**
- Welcome modal with same quick start steps
- Persistent banner: "Complete your profile to unlock personalized features"
- Dashboard shows: "Days remaining: 30"

**Dynamic Fields:**
- `{{user.first_name}}`
- `{{trial_end_date}}`
- `{{profile_setup_url}}`
- `{{playground_url}}`
- `{{demo_url}}`
- `{{dashboard_url}}`

---

### Day 2-3: First Value Demonstration

**Trigger:** User has created first job OR completed first reconciliation

**Channels:** Email, In-App Notification

#### Email: Your First Reconciliation is Ready

**Subject Line Options:**
- "Your first reconciliation is ready! 🎉"
- "{{user.first_name}}, see your results"
- "Great news: Your analysis is complete"

**Preview Text:** "{{matched_count}} transactions matched automatically"

**Body:**

```html
<h1 style="color: #2563eb;">Great news, {{user.first_name}}! 🎉</h1>

<p>We've analyzed your {{platform_name}} data and found some insights.</p>

<div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; margin: 24px 0;">
  <p style="margin: 0;"><strong>Quick wins:</strong></p>
  <ul style="margin: 8px 0 0 0; padding-left: 20px;">
    <li>{{matched_count}} transactions matched automatically</li>
    <li>{{unmatched_count}} potential issues flagged for review</li>
    <li>{{time_saved}} hours saved vs manual matching</li>
  </ul>
</div>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{report_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Full Report</a>
</div>

<p><strong>What's next?</strong></p>
<ul>
  <li>Try connecting another platform</li>
  <li>Explore advanced matching rules</li>
  <li>Schedule your free consultation (30 min)</li>
</ul>

<p>Your trial ends in {{days_remaining}} days. Want to unlock unlimited runs and advanced features?</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{upgrade_url}}" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Upgrade Now</a>
</div>
```

**Dynamic Fields:**
- `{{user.first_name}}`
- `{{platform_name}}`
- `{{matched_count}}`
- `{{unmatched_count}}`
- `{{time_saved}}`
- `{{report_url}}`
- `{{days_remaining}}`
- `{{upgrade_url}}`

---

### Day 7: Introduce Gated Features

**Channels:** Email, In-App Banner

#### Email: Unlock Advanced Features

**Subject Line Options:**
- "Unlock advanced features (still free for 23 days)"
- "{{user.first_name}}, try these premium features free"
- "You've been using Settler for a week! Here's what's next"

**Preview Text:** "Real-time webhooks, multi-currency, and more—all free for 23 more days"

**Body:**

```html
<h1 style="color: #2563eb;">You've been using Settler for a week! 🎉</h1>

<p>Hi {{user.first_name}},</p>

<p>Here's what you can unlock:</p>

<div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 24px 0;">
  <p style="margin: 0;"><strong>🔒 Currently Gated (Available on Paid):</strong></p>
  <ul style="margin: 8px 0 0 0; padding-left: 20px;">
    <li>Real-time webhook reconciliation</li>
    <li>Multi-currency with FX conversion</li>
    <li>Advanced analytics and dashboards</li>
    <li>Full cookbook library (10+ workflows)</li>
    <li>Free 30-minute consultation</li>
  </ul>
</div>

<p>Try these features free for the rest of your trial:</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{upgrade_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Upgrade to Paid</a>
  <p style="color: #666; font-size: 14px; margin-top: 8px;">(No charge until trial ends)</p>
</div>

<p>Or continue with free features:</p>
<a href="{{dashboard_url}}" style="color: #2563eb;">Keep Using Free Tier →</a>

<p>Your trial ends in {{days_remaining}} days.</p>
```

**Dynamic Fields:**
- `{{user.first_name}}`
- `{{days_remaining}}`
- `{{upgrade_url}}`
- `{{dashboard_url}}`

---

### Day 14: Case Study / Success Story

**Channels:** Email, In-App

#### Email: Success Story

**Subject Line Options:**
- "How {{similar_company}} saved 15 hours/week with Settler"
- "{{user.first_name}}, see how others succeed"
- "Real results: 15 hours saved per week"

**Preview Text:** "A {{user.industry}} company similar to yours achieved 99.7% accuracy"

**Body:**

```html
<h1 style="color: #2563eb;">How {{similar_company}} saved 15 hours/week</h1>

<p>Hi {{user.first_name}},</p>

<p>{{similar_company}}, a {{user.industry}} company similar to yours, was spending 15 hours per week on manual reconciliation.</p>

<div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; margin: 24px 0;">
  <p style="margin: 0;"><strong>After switching to Settler:</strong></p>
  <ul style="margin: 8px 0 0 0; padding-left: 20px;">
    <li>✅ 99.7% accuracy (up from 92%)</li>
    <li>✅ 15 hours saved per week</li>
    <li>✅ Real-time visibility into all transactions</li>
    <li>✅ Zero manual errors</li>
  </ul>
</div>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{case_study_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Read Full Story</a>
</div>

<p>Your trial ends in {{days_remaining}} days. Want similar results?</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{upgrade_url}}" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Upgrade Now</a>
  <p style="color: #666; font-size: 14px; margin-top: 8px;">(Includes free consultation)</p>
</div>

<p>Or continue exploring:</p>
<a href="{{case_studies_url}}" style="color: #2563eb;">View More Case Studies →</a>
```

**Dynamic Fields:**
- `{{user.first_name}}`
- `{{user.industry}}`
- `{{similar_company}}`
- `{{days_remaining}}`
- `{{case_study_url}}`
- `{{upgrade_url}}`
- `{{case_studies_url}}`

---

### Day 21: "What You're Missing" Comparison

**Channels:** Email, In-App Comparison

#### Email: Here's What You're Missing

**Subject Line Options:**
- "Here's what you're missing (9 days left)"
- "{{user.first_name}}, your trial ends in 9 days"
- "Free vs Paid: See the difference"

**Preview Text:** "Compare what you'll lose vs what you'll keep"

**Body:**

```html
<h1 style="color: #2563eb;">Here's what you're missing</h1>

<p>Hi {{user.first_name}},</p>

<p>Your trial ends in {{days_remaining}} days. Here's what you'll lose access to:</p>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0;">
  <div style="background-color: #fee2e2; border-left: 4px solid #ef4444; padding: 16px;">
    <h3 style="margin-top: 0; color: #991b1b;">Free Tier (After Trial)</h3>
    <ul style="padding-left: 20px;">
      <li>❌ Limited to 1,000 reconciliations/month</li>
      <li>❌ Basic cookbooks only</li>
      <li>❌ No real-time webhooks</li>
      <li>❌ No advanced analytics</li>
      <li>❌ No consultation included</li>
    </ul>
  </div>
  
  <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px;">
    <h3 style="margin-top: 0; color: #166534;">Paid Tier (What You Get)</h3>
    <ul style="padding-left: 20px;">
      <li>✅ Unlimited reconciliations</li>
      <li>✅ Full cookbook library</li>
      <li>✅ Real-time webhook reconciliation</li>
      <li>✅ Advanced analytics & dashboards</li>
      <li>✅ Free 30-minute consultation</li>
      <li>✅ Priority support</li>
    </ul>
  </div>
</div>

<p>Lock in your personalized system now:</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{upgrade_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Upgrade Now</a>
</div>

<p>Or continue with free tier:</p>
<a href="{{free_tier_info_url}}" style="color: #2563eb;">Stay on Free →</a>
```

**Dynamic Fields:**
- `{{user.first_name}}`
- `{{days_remaining}}`
- `{{upgrade_url}}`
- `{{free_tier_info_url}}`

---

### Day 27-29: Urgency Emails

**Channels:** Email (Daily), Persistent In-App Banner

#### Day 27 Email: Trial Ends in 3 Days

**Subject Line Options:**
- "⏰ Your trial ends in 3 days"
- "{{user.first_name}}, don't lose access to your workflows"
- "Last chance: 3 days left"

**Preview Text:** "Upgrade now to keep all your workflows and features"

**Body:**

```html
<h1 style="color: #2563eb;">⏰ Your trial ends in 3 days</h1>

<p>Hi {{user.first_name}},</p>

<p>Your free trial ends on <strong>{{trial_end_date}}</strong>. Don't lose access to:</p>

<ul>
  <li>Your personalized workflows</li>
  <li>Advanced features you've been using</li>
  <li>Free consultation (worth $200)</li>
</ul>

<p>Lock in your account now—no charge until {{charge_date}}:</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{upgrade_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Upgrade Now</a>
</div>

<p>Questions? Reply to this email or schedule a call:</p>
<a href="{{consultation_url}}" style="color: #2563eb;">Schedule Consultation →</a>
```

---

#### Day 28 Email: Last Chance

**Subject Line Options:**
- "Last chance: Trial ends tomorrow"
- "{{user.first_name}}, your trial ends tomorrow"
- "Final reminder: 1 day left"

**Preview Text:** "Upgrade now to keep everything"

**Body:**

```html
<h1 style="color: #2563eb;">Last chance: Trial ends tomorrow</h1>

<p>Hi {{user.first_name}},</p>

<p>Your trial ends <strong>tomorrow</strong>. Upgrade now to keep:</p>

<ul>
  <li>All your workflows</li>
  <li>Advanced features</li>
  <li>Free consultation</li>
</ul>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{upgrade_url}}" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-size: 16px; font-weight: bold;">Upgrade Now</a>
  <p style="color: #666; font-size: 14px; margin-top: 8px;">(Takes 2 minutes)</p>
</div>

<p>We're here to help:</p>
<ul>
  <li><a href="{{consultation_url}}" style="color: #2563eb;">Schedule a Call</a></li>
  <li><a href="{{support_url}}" style="color: #2563eb;">Email Support</a></li>
</ul>
```

---

#### Day 29 Email: Final Reminder

**Subject Line Options:**
- "Final reminder: Trial ends today"
- "{{user.first_name}}, today is your last day"
- "Trial ends today - choose your plan"

**Preview Text:** "Upgrade now or continue with free tier"

**Body:**

```html
<h1 style="color: #2563eb;">Final reminder: Trial ends today</h1>

<p>Hi {{user.first_name}},</p>

<p>Today is your last day of free trial access.</p>

<p>Upgrade now to keep everything:</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{upgrade_url}}" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-size: 16px; font-weight: bold;">Upgrade Now</a>
</div>

<p>Or continue with free tier (limited features):</p>
<a href="{{free_tier_info_url}}" style="color: #2563eb;">Stay on Free →</a>

<p style="margin-top: 30px;">Thank you for trying Settler!</p>
```

---

### Day 30: Trial End

**Channels:** Email, In-App

#### Email: Trial Has Ended

**Subject Line Options:**
- "Your trial has ended - Choose your plan"
- "{{user.first_name}}, what's next?"
- "Thank you for trying Settler"

**Preview Text:** "Upgrade to paid or continue with free tier"

**Body:**

```html
<h1 style="color: #2563eb;">Your trial has ended</h1>

<p>Hi {{user.first_name}},</p>

<p>Your 30-day trial has ended. Thank you for trying Settler!</p>

<p><strong>Choose your plan:</strong></p>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 24px 0;">
  <div style="background-color: #f3f4f6; border: 2px solid #d1d5db; padding: 16px; border-radius: 8px;">
    <h3 style="margin-top: 0;">Free Tier</h3>
    <ul style="padding-left: 20px;">
      <li>1,000 reconciliations/month</li>
      <li>Basic features</li>
      <li>Community support</li>
    </ul>
    <a href="{{free_tier_url}}" style="color: #2563eb;">Continue Free →</a>
  </div>
  
  <div style="background-color: #eff6ff; border: 2px solid #2563eb; padding: 16px; border-radius: 8px;">
    <h3 style="margin-top: 0;">Paid Tier</h3>
    <p style="font-size: 24px; font-weight: bold; margin: 8px 0;">$99/month</p>
    <ul style="padding-left: 20px;">
      <li>Unlimited reconciliations</li>
      <li>All features unlocked</li>
      <li>Free consultation included</li>
      <li>Priority support</li>
    </ul>
    <div style="text-align: center; margin-top: 16px;">
      <a href="{{upgrade_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Upgrade to Paid</a>
    </div>
  </div>
</div>

<p>Questions? We're here to help:</p>
<a href="{{support_url}}" style="color: #2563eb;">Contact Support →</a>
```

---

## B. Paid Monthly Subscription (Month 1 Onward)

### Month 1: Welcome to Paid

**Trigger:** User upgrades to paid plan

**Channels:** Email, In-App

#### Email: Welcome to Commercial Plan

**Subject Line Options:**
- "Welcome to Commercial! Here's what's unlocked"
- "{{user.first_name}}, you're all set"
- "Thank you for upgrading"

**Body:**

```html
<h1 style="color: #2563eb;">Welcome to Commercial! 🎉</h1>

<p>Hi {{user.first_name}},</p>

<p>Thank you for upgrading to Commercial. You now have:</p>

<ul>
  <li>✅ Unlimited reconciliations</li>
  <li>✅ All advanced features unlocked</li>
  <li>✅ Free 30-minute consultation (book now)</li>
  <li>✅ Priority email support</li>
  <li>✅ Full cookbook library</li>
</ul>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{consultation_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Book Your Free Consultation</a>
</div>

<p><strong>Next steps:</strong></p>
<ul>
  <li>Explore advanced features (real-time webhooks, multi-currency)</li>
  <li>Try the full cookbook library</li>
  <li>Set up scheduled reconciliations</li>
</ul>
```

---

### Monthly Summary Email (First of Each Month)

**Trigger:** First day of each month for paid users

**Channels:** Email

#### Email: Your Monthly Summary

**Subject Line Options:**
- "{{user.first_name}}, your {{month}} summary"
- "Your reconciliation summary: {{month}}"
- "See what you accomplished in {{month}}"

**Preview Text:** "{{total_reconciliations}} reconciliations, {{accuracy}}% accuracy"

**Body:**

```html
<h1 style="color: #2563eb;">Your {{month}} Summary</h1>

<p>Hi {{user.first_name}},</p>

<p>Here's what you accomplished last month:</p>

<div style="background-color: #f0f9ff; border-left: 4px solid #2563eb; padding: 16px; margin: 24px 0;">
  <p style="margin: 0;"><strong>Key Metrics:</strong></p>
  <ul style="margin: 8px 0 0 0; padding-left: 20px;">
    <li>{{total_reconciliations}} reconciliations processed</li>
    <li>{{accuracy}}% average accuracy</li>
    <li>{{time_saved}} hours saved vs manual matching</li>
    <li>{{jobs_created}} jobs created</li>
  </ul>
</div>

<p><strong>Top Insights:</strong></p>
<ul>
  <li>{{top_insight_1}}</li>
  <li>{{top_insight_2}}</li>
</ul>

<p><strong>Recommended Next Steps:</strong></p>
<ul>
  <li>{{recommendation_1}}</li>
  <li>{{recommendation_2}}</li>
</ul>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{dashboard_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Full Dashboard</a>
</div>
```

**Dynamic Fields:**
- `{{user.first_name}}`
- `{{month}}`
- `{{total_reconciliations}}`
- `{{accuracy}}`
- `{{time_saved}}`
- `{{jobs_created}}`
- `{{top_insight_1}}`
- `{{top_insight_2}}`
- `{{recommendation_1}}`
- `{{recommendation_2}}`
- `{{dashboard_url}}`

---

### Monthly Insights Email (Mid-Month)

**Trigger:** 15th of each month for paid users

**Channels:** Email

#### Email: Monthly Insights

**Subject Line Options:**
- "{{user.first_name}}, insights for your business"
- "New insights: Optimize your reconciliations"
- "Your reconciliation insights are ready"

**Body:**

```html
<h1 style="color: #2563eb;">Monthly Insights for Your Business</h1>

<p>Hi {{user.first_name}},</p>

<p>Here are insights to help you optimize your reconciliation process:</p>

<div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 24px 0;">
  <p style="margin: 0;"><strong>💡 Insight:</strong></p>
  <p>{{insight_summary}}</p>
</div>

<p><strong>Recommended Actions:</strong></p>
<ul>
  <li>{{action_1}}</li>
  <li>{{action_2}}</li>
</ul>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{insights_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Full Insights</a>
</div>
```

---

### New Workflow Available

**Trigger:** New cookbook/workflow published

**Channels:** Email, In-App Notification

#### Email: New Workflow Available

**Subject Line Options:**
- "New workflow: {{workflow_name}}"
- "{{user.first_name}}, try this new workflow"
- "New cookbook: {{workflow_name}}"

**Body:**

```html
<h1 style="color: #2563eb;">New Workflow: {{workflow_name}}</h1>

<p>Hi {{user.first_name}},</p>

<p>We've added a new workflow that might be perfect for you:</p>

<div style="background-color: #f0f9ff; border-left: 4px solid #2563eb; padding: 16px; margin: 24px 0;">
  <h3 style="margin-top: 0;">{{workflow_name}}</h3>
  <p>{{workflow_description}}</p>
  <p><strong>Use case:</strong> {{use_case}}</p>
  <p><strong>Time to set up:</strong> {{setup_time}}</p>
</div>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{workflow_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Try This Workflow</a>
</div>
```

---

### New Analysis Ready

**Trigger:** New reconciliation report ready

**Channels:** Email, In-App Notification

#### Email: New Analysis Ready

**Subject Line Options:**
- "Your {{job_name}} analysis is ready"
- "{{user.first_name}}, new results available"
- "Reconciliation complete: {{job_name}}"

**Body:**

```html
<h1 style="color: #2563eb;">Your Analysis is Ready</h1>

<p>Hi {{user.first_name}},</p>

<p>Your reconciliation job "<strong>{{job_name}}</strong>" is complete.</p>

<div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; margin: 24px 0;">
  <p style="margin: 0;"><strong>Results:</strong></p>
  <ul style="margin: 8px 0 0 0; padding-left: 20px;">
    <li>{{matched_count}} transactions matched</li>
    <li>{{unmatched_count}} items need review</li>
    <li>{{accuracy}}% accuracy</li>
  </ul>
</div>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{report_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Full Report</a>
</div>
```

---

## C. Retention System

### Low Activity Nudge

**Trigger:** User inactive for 7+ days (paid user)

**Channels:** Email

#### Email: We Miss You

**Subject Line Options:**
- "{{user.first_name}}, we miss you"
- "Haven't seen you in a while"
- "Get back to reconciling"

**Body:**

```html
<h1 style="color: #2563eb;">We Miss You, {{user.first_name}}</h1>

<p>Hi {{user.first_name}},</p>

<p>We haven't seen you in a while. Here's what you might have missed:</p>

<ul>
  <li>New workflows and cookbooks</li>
  <li>Platform updates and improvements</li>
  <li>Best practices and tips</li>
</ul>

<p><strong>Quick ways to get value:</strong></p>
<ul>
  <li>Run a reconciliation job</li>
  <li>Explore new cookbooks</li>
  <li>Schedule a consultation</li>
</ul>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{dashboard_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Go to Dashboard</a>
</div>

<p>Questions? We're here to help.</p>
```

---

### Renewal Reminder

**Trigger:** 7 days before renewal date (annual plans)

**Channels:** Email

#### Email: Renewal Reminder

**Subject Line Options:**
- "Your subscription renews in 7 days"
- "{{user.first_name}}, renewal reminder"
- "Renewal coming up"

**Body:**

```html
<h1 style="color: #2563eb;">Renewal Reminder</h1>

<p>Hi {{user.first_name}},</p>

<p>Your Commercial subscription renews on <strong>{{renewal_date}}</strong>.</p>

<p><strong>What you'll continue to get:</strong></p>
<ul>
  <li>Unlimited reconciliations</li>
  <li>All advanced features</li>
  <li>Priority support</li>
  <li>Free consultation</li>
</ul>

<p>No action needed—your subscription will renew automatically.</p>

<p>Questions? <a href="{{support_url}}" style="color: #2563eb;">Contact Support</a></p>
```

---

### Monthly Milestone Email

**Trigger:** User reaches usage milestone (e.g., 10,000 reconciliations)

**Channels:** Email

#### Email: Milestone Achieved

**Subject Line Options:**
- "🎉 You've reached a milestone!"
- "{{user.first_name}}, congratulations!"
- "Milestone: {{milestone_name}}"

**Body:**

```html
<h1 style="color: #2563eb;">🎉 You've Reached a Milestone!</h1>

<p>Hi {{user.first_name}},</p>

<p>Congratulations! You've reached <strong>{{milestone_name}}</strong>.</p>

<div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; margin: 24px 0;">
  <p style="margin: 0;"><strong>What you've accomplished:</strong></p>
  <ul style="margin: 8px 0 0 0; padding-left: 20px;">
    <li>{{milestone_metric}}</li>
    <li>{{time_saved}} hours saved</li>
    <li>{{accuracy}}% average accuracy</li>
  </ul>
</div>

<p>Keep up the great work!</p>

<div style="text-align: center; margin: 30px 0;">
  <a href="{{dashboard_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Dashboard</a>
</div>
```

---

## D. Content Gating Strategy

### Free Tier (After Trial)

**What's Available:**
- 1,000 reconciliations/month
- Basic cookbooks (e-commerce, scheduled)
- Basic documentation
- 3 playground runs/day
- Community support

**What's Gated:**
- Real-time webhooks
- Multi-currency
- Advanced analytics
- Full cookbook library
- Advanced documentation
- Unlimited playground runs
- Priority support

### Paid Tier (Commercial)

**What's Unlocked:**
- Unlimited reconciliations (up to 100,000/month)
- All cookbooks and workflows
- All documentation
- Unlimited playground runs
- Real-time webhooks
- Multi-currency
- Advanced analytics
- Priority support
- Free consultation

---

## E. Email Delivery Architecture

### Recommended File Structure

```
/emails/
  lifecycle/
    trial_welcome.html
    trial_day2.html
    trial_day7.html
    trial_day14.html
    trial_day21.html
    trial_day27.html
    trial_day28.html
    trial_day29.html
    trial_ended.html
    paid_welcome.html
    monthly_summary.html
    monthly_insights.html
    new_workflow.html
    new_analysis.html
    low_activity.html
    renewal_reminder.html
    milestone.html
  shared/
    components/
      header.html
      footer.html
      button.html
      layout.html
    styles/
      email.css
  fields/
    dynamic_fields.json
  templates/
    base.html
```

---

## F. Implementation Notes

### Dynamic Fields System

All templates support these dynamic fields:

**User Fields:**
- `{{user.first_name}}`
- `{{user.last_name}}`
- `{{user.email}}`
- `{{user.industry}}`
- `{{user.company_name}}`

**Trial Fields:**
- `{{trial_end_date}}`
- `{{days_remaining}}`
- `{{trial_start_date}}`

**Product Fields:**
- `{{product_name}}` (Settler)
- `{{upgrade_url}}`
- `{{dashboard_url}}`
- `{{support_url}}`

**Reconciliation Fields:**
- `{{job_name}}`
- `{{matched_count}}`
- `{{unmatched_count}}`
- `{{accuracy}}`
- `{{time_saved}}`

**Recommendation Fields:**
- `{{next_recommendation}}`
- `{{workflow_suggestion}}`
- `{{analysis_summary}}`

### Email Timing

- **Day 0:** Immediate (welcome)
- **Day 2-3:** Morning (9-10 AM user timezone)
- **Day 7:** Afternoon (2-3 PM)
- **Day 14:** Morning (9-10 AM)
- **Day 21:** Afternoon (2-3 PM)
- **Day 27-29:** Morning (9-10 AM)
- **Day 30:** Morning (9-10 AM)
- **Monthly:** First of month (morning)
- **Mid-month:** 15th (afternoon)

---

**Report Generated:** 2025-01-XX  
**Status:** Complete - Ready for email template implementation
