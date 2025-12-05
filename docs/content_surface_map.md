# Content Surface Map

**Date:** 2025-01-XX  
**Purpose:** Complete inventory of all content locations, messaging gaps, and opportunities for improvement across the Settler platform

---

## Executive Summary

This document maps every content surface in the Settler repository, categorizes them by funnel stage and audience, identifies gaps, and provides recommendations for copy improvements and automation opportunities.

---

## A. Pages & Components

### 1. Homepage (`/`)

**File:** `packages/web/src/app/page.tsx`

| Element | Purpose | Funnel Stage | Target Audience | Primary CTA | Issues | Missing Content |
|---------|---------|--------------|------------------|-------------|--------|-----------------|
| Hero Section | Problem framing, value prop | Awareness | Anonymous | "Start 30-Day Free Trial" | Jargon-heavy, not benefit-driven | Clear outcome statement, trial benefits |
| Features Grid | Feature showcase | Awareness → Consideration | Anonymous, Trial | "View Documentation" | Feature-focused, not outcome-focused | Benefit statements, time-saved metrics |
| Code Example | Developer proof | Consideration | Anonymous, Trial | "Try Playground" | Too technical for homepage | Simplified preview, gated full code |
| Stats Section | Social proof | Awareness | Anonymous | None | Good, but could add context | "Companies like yours save X hours" |
| Trust Badges | Credibility | Awareness | Anonymous | None | Good | None |
| Customer Logos | Social proof | Awareness | Anonymous | None | Good | None |
| Newsletter Signup | Lead capture | Awareness | Anonymous | "Subscribe" | Generic | Industry-specific value prop |
| Final CTA | Conversion | Awareness → Conversion | Anonymous, Trial | "Start 30-Day Free Trial" | Good | None |

**Copy Quality Issues:**
- Hero heading uses technical jargon ("reconciliation")
- Features list is feature-focused, not benefit-focused
- Missing clear "30-Day Free Trial" messaging
- No explicit "No credit card required" messaging

**Missing Content Opportunities:**
- Trial benefits section
- "What you get free" vs "What you unlock" comparison
- Industry-specific landing variants
- Personalized content injection points

**Automation Opportunities:**
- Dynamic hero based on referrer/UTM
- Personalized feature recommendations
- Industry-specific use cases
- A/B test headline variants

---

### 2. Pricing Page (`/pricing`)

**File:** `packages/web/src/app/pricing/page.tsx`

| Element | Purpose | Funnel Stage | Target Audience | Primary CTA | Issues | Missing Content |
|---------|---------|--------------|------------------|-------------|--------|-----------------|
| Hero Section | Plan selection intro | Conversion | Anonymous, Trial | "Start Free Trial" | Unclear value prop | Trial benefits, "no credit card" |
| Billing Toggle | Monthly/Annual | Conversion | Anonymous, Trial | None | Good | Savings calculator |
| Plan Cards | Feature comparison | Conversion | Anonymous, Trial | "Start Free Trial" | Technical limits, not outcomes | Outcome context, ROI calculator |
| Trust Badges | Credibility | Conversion | Anonymous, Trial | None | Good | None |
| Feature Comparison | Detailed comparison | Conversion | Anonymous, Trial | "Start Free Trial" | Good | None |
| Edge AI Section | Feature education | Consideration | Anonymous, Trial | "Learn More" | May confuse top-of-funnel | Gate as paid feature |
| FAQ Section | Objection handling | Conversion | Anonymous, Trial | None | Technical explanations | Simplified answers, trial info |
| Final CTA | Conversion | Conversion | Anonymous, Trial | "Contact Support" | Generic | "Start Free Trial" primary |

**Copy Quality Issues:**
- Plan descriptions use technical limits without context
- "Reconciliation engine" is jargon
- Missing outcome-focused language
- FAQ answers are too technical

**Missing Content Opportunities:**
- "What you get free" vs "What you unlock" sections
- ROI calculator
- Trial countdown for trial users
- Industry-specific pricing examples
- "Most popular" badge explanation

**Automation Opportunities:**
- Dynamic pricing based on usage
- Personalized plan recommendations
- Trial-to-paid conversion prompts
- Usage-based upgrade suggestions

---

### 3. Signup Page (`/signup`)

**File:** `packages/web/src/app/signup/page.tsx`

| Element | Purpose | Funnel Stage | Target Audience | Primary CTA | Issues | Missing Content |
|---------|---------|--------------|-----------------|-------------|--------|-----------------|
| Hero Section | Account creation | Post-Signup | Anonymous | "Create Account" | Unclear value, no trial messaging | "30-Day Free Trial" emphasis |
| Signup Form | User registration | Post-Signup | Anonymous | "Create Account" | Basic, no pre-test | Pre-test questions, onboarding flow |
| Trial Benefits | Value prop | Post-Signup | Anonymous | None | Generic list | Personalized benefits, industry-specific |
| Footer Link | Navigation | Post-Signup | Anonymous | "Go to Dashboard" | Good | None |

**Copy Quality Issues:**
- Hero doesn't emphasize free trial
- Missing "No credit card required" messaging
- Trial benefits are generic
- No pre-test/personalization flow

**Missing Content Opportunities:**
- Pre-test questionnaire (industry, goals, platforms)
- Personalized onboarding flow
- Welcome video/tutorial
- Quick start guide
- Email verification messaging

**Automation Opportunities:**
- Pre-test → personalized dashboard
- Industry-specific onboarding
- Dynamic trial benefits based on pre-test
- Automated welcome email sequence

---

### 4. Dashboard Page (`/dashboard`)

**File:** `packages/web/src/app/dashboard/page.tsx`

| Element | Purpose | Funnel Stage | Target Audience | Primary CTA | Issues | Missing Content |
|---------|---------|--------------|-----------------|-------------|--------|-----------------|
| Hero Section | Metrics overview | Retention | Trial, Paid | None | Public metrics, not user-specific | User-specific reconciliation data |
| Status Badge | System health | Retention | Trial, Paid | None | Good | None |
| KPI Cards | Key metrics | Retention | Trial, Paid | None | Good | User-specific KPIs |
| Total Posts | Community metrics | Retention | Trial, Paid | None | Not user-relevant | User reconciliation stats |
| Top Post | Engagement | Retention | Trial, Paid | None | Not user-relevant | User activity summary |

**Copy Quality Issues:**
- Shows public ecosystem metrics, not user data
- No clear CTA for trial users
- Missing user-specific reconciliation dashboard

**Missing Content Opportunities:**
- User-specific reconciliation dashboard
- Trial countdown banner
- Usage stats (X of 1,000 free reconciliations)
- Upgrade prompts
- Quick start guide for new users
- Recent activity feed
- Personalized recommendations

**Automation Opportunities:**
- Dynamic dashboard based on user plan
- Trial countdown automation
- Usage-based upgrade prompts
- Personalized workflow suggestions
- Activity-based nudges

---

### 5. Cookbooks Page (`/cookbooks`)

**File:** `packages/web/src/app/cookbooks/page.tsx`

| Element | Purpose | Funnel Stage | Target Audience | Primary CTA | Issues | Missing Content |
|---------|---------|--------------|-----------------|-------------|--------|-----------------|
| Hero Section | Use case intro | Consideration | Anonymous, Trial | None | Technical language | Plain language, outcome-focused |
| Category Filter | Content organization | Consideration | Anonymous, Trial | None | Good | None |
| Cookbook Cards | Recipe showcase | Consideration | Anonymous, Trial | "View Recipe" | Some should be gated | Gating implementation |
| Cookbook Modal | Full recipe | Consideration | Anonymous, Trial | "Try in Playground" | Full access, should gate advanced | Gating for advanced cookbooks |
| CTA Section | Conversion | Consideration | Anonymous, Trial | "Try Playground" | Good | None |

**Copy Quality Issues:**
- Hero uses technical language
- Missing gating for advanced cookbooks
- No clear "free vs paid" distinction

**Missing Content Opportunities:**
- Gating for advanced cookbooks (real-time, multi-currency)
- Teaser content for gated recipes
- "Upgrade to unlock" CTAs
- Difficulty indicators
- Time-to-value estimates
- Success metrics per cookbook

**Automation Opportunities:**
- Personalized cookbook recommendations
- Usage-based cookbook suggestions
- Industry-specific cookbook filtering
- Dynamic difficulty ratings

---

### 6. Documentation Page (`/docs`)

**File:** `packages/web/src/app/docs/page.tsx`

| Element | Purpose | Funnel Stage | Target Audience | Primary CTA | Issues | Missing Content |
|---------|---------|--------------|-----------------|-------------|--------|-----------------|
| Introduction | Product overview | Consideration | Anonymous, Trial | None | Technical definition, jargon | Plain language, benefit-first |
| API Reference | Technical docs | Consideration | Anonymous, Trial | "Try Playground" | Full access, should gate | Gating for advanced docs |
| Quick Start | Getting started | Consideration | Anonymous, Trial | "Get Started" | Good | None |
| Support Links | Help resources | Consideration | Anonymous, Trial | "Contact Support" | Good | None |

**Copy Quality Issues:**
- Introduction uses jargon
- Missing gating for advanced documentation
- No clear "free vs paid" content boundaries

**Missing Content Opportunities:**
- Gating for advanced API docs
- Teaser content for gated sections
- "Upgrade to view full docs" CTAs
- Search functionality
- Table of contents
- Code examples with copy buttons
- Interactive API explorer

**Automation Opportunities:**
- Personalized doc recommendations
- Usage-based doc suggestions
- Search analytics
- Doc completion tracking

---

### 7. Playground Page (`/playground`)

**File:** `packages/web/src/app/playground/page.tsx`

| Element | Purpose | Funnel Stage | Target Audience | Primary CTA | Issues | Missing Content |
|---------|---------|--------------|-----------------|-------------|--------|-----------------|
| Hero Section | Trial activation | Consideration | Anonymous, Trial | "Get API Key" | Technical focus, no trial emphasis | Trial-first messaging |
| Code Editor | Interactive testing | Consideration | Anonymous, Trial | "Run" | Full access, should limit free | Usage limits, upgrade prompts |
| Examples | Code samples | Consideration | Anonymous, Trial | "Try Example" | Good | None |
| Results | Output display | Consideration | Anonymous, Trial | None | Good | None |

**Copy Quality Issues:**
- Hero doesn't emphasize free trial
- Missing usage limit messaging
- No upgrade prompts when limit reached

**Missing Content Opportunities:**
- Usage limit indicators (X of 3 runs today)
- Upgrade prompts when limit reached
- Trial countdown
- Gating for advanced features
- Success metrics display
- Tutorial/guided tour

**Automation Opportunities:**
- Usage tracking and limits
- Automatic upgrade prompts
- Personalized example suggestions
- Error handling with helpful messages

---

### 8. Enterprise Page (`/enterprise`)

**File:** `packages/web/src/app/enterprise/page.tsx`

| Element | Purpose | Funnel Stage | Target Audience | Primary CTA | Issues | Missing Content |
|---------|---------|--------------|-----------------|-------------|--------|-----------------|
| Hero Section | Enterprise intro | Consideration → Conversion | Anonymous, Enterprise | "Contact Sales" | Jargon-heavy, acronym soup | Simplified, outcome-focused |
| Features Grid | Enterprise features | Consideration | Anonymous, Enterprise | "Contact Sales" | Feature list, not outcomes | Benefit context, ROI metrics |
| Benefits Section | Value prop | Consideration | Anonymous, Enterprise | "Contact Sales" | Good structure, needs outcomes | ROI calculator, case studies |
| Contact Form | Lead capture | Conversion | Anonymous, Enterprise | "Submit" | Good | None |

**Copy Quality Issues:**
- Hero uses buzzwords ("Enterprise-Grade")
- Features list is acronym-heavy
- Missing outcome-focused language

**Missing Content Opportunities:**
- Enterprise case studies
- ROI calculator
- Security/compliance details
- Dedicated support details
- Custom deployment options
- Trial option for enterprise

**Automation Opportunities:**
- Industry-specific enterprise content
- Dynamic pricing calculator
- Personalized case study recommendations

---

## B. System Messages

### Validation Messages

**Location:** Form components, API responses

| Message Type | Current State | Issues | Recommended Copy |
|--------------|---------------|--------|-------------------|
| Email validation | Generic browser validation | No custom messaging | "Please enter a valid email address" |
| Password validation | "Must be at least 8 characters" | Good | None needed |
| Required field | Browser default | No custom messaging | "This field is required" |
| API key validation | Generic error | Technical | "Please enter a valid API key" |

**Missing:**
- Custom validation messages for all forms
- Helpful inline hints
- Error recovery suggestions

---

### Error Messages

**Location:** `packages/web/src/components/ui/error-state.tsx`, API error handlers

| Error Type | Current State | Issues | Recommended Copy |
|------------|---------------|--------|-------------------|
| Network error | "Network error. Please check your connection and try again." | Good | None needed |
| 404 Not Found | "The requested resource was not found." | Good | Add helpful next steps |
| 401 Unauthorized | "You are not authorized to access this resource." | Good | Add login link |
| 403 Forbidden | "Access forbidden." | Too brief | "You don't have access to this. Upgrade to unlock." |
| 500 Server Error | "Server error. Please try again later." | Good | Add support contact |
| Rate limit | Generic | Missing | "You've reached your limit. Upgrade for unlimited access." |
| Trial expired | Generic | Missing | "Your trial has ended. Upgrade to continue using Settler." |

**Missing:**
- Trial-specific error messages
- Upgrade prompts in error states
- Helpful recovery actions
- Support contact in errors

---

### Success Alerts

**Location:** Various components, API success responses

| Success Type | Current State | Issues | Recommended Copy |
|-------------|---------------|--------|------------------|
| Account created | Generic | Missing | "Welcome! Your 30-day free trial starts now." |
| Job created | Generic | Missing | "Reconciliation job created! View results in dashboard." |
| Email verified | Generic | Missing | "Email verified! You're all set." |
| Payment successful | Generic | Missing | "Payment successful! Your account is now active." |

**Missing:**
- Contextual success messages
- Next step suggestions
- Celebration moments

---

### Banners

**Location:** Dashboard, various pages

| Banner Type | Current State | Issues | Recommended Copy |
|-------------|--------------|--------|------------------|
| Trial countdown | Missing | Not implemented | "Your trial ends in X days. Upgrade to unlock all features." |
| Usage limit | Missing | Not implemented | "You've used X of 1,000 free reconciliations this month." |
| Feature unlock | Missing | Not implemented | "Upgrade to unlock real-time webhooks and advanced analytics." |
| Welcome banner | Missing | Not implemented | "Welcome! Complete your profile to unlock personalized features." |

**Missing:**
- All banner types need implementation
- Dynamic content based on user state
- Clear CTAs

---

### Onboarding Hints

**Location:** `packages/web/src/components/OnboardingFlow.tsx`

| Hint Type | Current State | Issues | Recommended Copy |
|-----------|---------------|--------|------------------|
| Step 1: Job Details | "Name your reconciliation job" | Technical term | "Give your workflow a name" |
| Step 2: Source System | "Configure your source adapter" | Technical | "Connect your first platform (e.g., Shopify)" |
| Step 3: Target System | "Configure your target adapter" | Technical | "Connect your second platform (e.g., Stripe)" |
| Step 4: Matching Rules | "Define how records should match" | Technical | "Set up automatic matching rules" |
| Step 5: Review | "Review and create your job" | Good | None needed |

**Missing:**
- Tooltips for each field
- Help text explaining options
- Progress indicators
- Skip options
- Video tutorials

---

### Tooltips

**Location:** Various components (minimal implementation)

| Tooltip Type | Current State | Issues | Recommended Copy |
|--------------|---------------|--------|------------------|
| API key help | Missing | Not implemented | "Find your API key in Settings > API Keys" |
| Feature explanations | Missing | Not implemented | Context-specific help text |
| Plan feature differences | Missing | Not implemented | "Available on Commercial plan" |

**Missing:**
- Comprehensive tooltip system
- Help text for all interactive elements
- Plan-specific tooltips

---

### Walkthrough Prompts

**Location:** Missing entirely

| Prompt Type | Current State | Issues | Recommended Copy |
|-------------|--------------|--------|------------------|
| First-time user tour | Missing | Not implemented | "Welcome! Let's set up your first reconciliation." |
| Feature discovery | Missing | Not implemented | "Try real-time webhooks - upgrade to unlock." |
| Trial ending | Missing | Not implemented | "Your trial ends in 3 days. Upgrade to keep all features." |

**Missing:**
- Complete walkthrough system
- Contextual prompts
- Dismissible but persistent hints

---

## C. Notifications & Emails

### Email Templates (Existing)

**Location:** `packages/api/src/lib/email.ts`

| Template | Current State | Issues | Missing Elements |
|----------|---------------|--------|-----------------|
| Verification Email | Basic HTML | Good structure | Dynamic fields, personalization |
| Password Reset | Basic HTML | Good structure | Dynamic fields, personalization |
| Welcome Email | Basic HTML | Generic | Trial benefits, next steps, personalization |
| Notification Email | Generic template | Too generic | Context-specific templates |
| Magic Link | Basic HTML | Good structure | Dynamic fields |

**Issues:**
- Templates are basic, need dynamic fields
- Missing lifecycle emails (trial cadence)
- No plain-text fallbacks optimized
- Missing preview text
- No A/B test variants

**Missing Templates:**
- Trial welcome (Day 0)
- Trial activation (Day 2-3)
- Trial midpoint (Day 7)
- Trial gated features (Day 7)
- Trial success story (Day 14)
- Trial comparison (Day 21)
- Trial urgency (Day 27-29)
- Trial ending (Day 30)
- Paid monthly summary
- Paid insights email
- New workflow available
- New analysis ready
- Low activity nudge
- Renewal reminder
- Churn recovery

---

### Notification System

**Location:** `packages/api/src/routes/notifications.ts`

| Notification Type | Current State | Issues | Missing Elements |
|-------------------|---------------|--------|-----------------|
| Slack integration | Basic structure | Not implemented | Full integration |
| Discord integration | Basic structure | Not implemented | Full integration |
| PagerDuty integration | Basic structure | Not implemented | Full integration |
| Email notifications | Basic structure | Not implemented | Lifecycle triggers |

**Missing:**
- Complete notification system
- Lifecycle triggers
- User preference management
- Notification templates
- Delivery tracking

---

## D. Content Gating System

### Current Implementation

**Location:** `packages/web/src/components/PlanFeatureGate.tsx`, `config/plans.ts`

| Component | Current State | Issues | Missing Elements |
|-----------|--------------|--------|-----------------|
| PlanFeatureGate | Basic gating | Good structure | Teaser content, upgrade prompts |
| TeaserContent | Basic blur | Good structure | More sophisticated previews |
| Plans config | Complete | Good | None |

**Missing:**
- Gating for cookbooks
- Gating for documentation
- Gating for playground features
- Usage limit enforcement
- Upgrade flow integration

---

## E. Missing Content Surfaces

### 1. Onboarding Flow

**Status:** Partially implemented  
**File:** `packages/web/src/components/OnboardingFlow.tsx`

**Missing:**
- Pre-test questionnaire
- Personalized onboarding
- Welcome video/tutorial
- Progress tracking
- Celebration moments
- Skip options

---

### 2. User Dashboard (vs Public Dashboard)

**Status:** Missing  
**Current:** Public ecosystem dashboard  
**Needed:** User-specific reconciliation dashboard

**Missing:**
- User reconciliation jobs
- Recent activity
- Usage statistics
- Trial countdown
- Upgrade prompts
- Quick actions
- Personalized recommendations

---

### 3. Help Center / Support

**Status:** Basic implementation  
**File:** `packages/web/src/app/support/page.tsx`

**Missing:**
- Searchable knowledge base
- Video tutorials
- Interactive guides
- FAQ categories
- Contact form integration
- Live chat (future)

---

### 4. Community Page

**Status:** Basic implementation  
**File:** `packages/web/src/app/community/page.tsx`

**Missing:**
- Community guidelines
- Posting guidelines
- Category descriptions
- Featured content
- Community stats
- Engagement prompts

---

## F. Content Quality Issues Summary

### High Priority (Conversion Impact)

1. **Homepage Hero** - Jargon-heavy, not benefit-driven
2. **Pricing Plan Descriptions** - Technical limits, not outcomes
3. **Signup Page** - Missing trial emphasis
4. **Error Messages** - Missing upgrade prompts
5. **Email Templates** - Missing lifecycle emails

### Medium Priority (Engagement Impact)

1. **Features Section** - Feature-focused, not benefit-focused
2. **Cookbooks** - Missing gating, technical language
3. **Documentation** - Missing gating, jargon
4. **Onboarding** - Technical language, missing hints
5. **Dashboard** - Wrong dashboard (public vs user)

### Low Priority (UX Polish)

1. **Tooltips** - Missing comprehensive system
2. **Banners** - Missing all banner types
3. **Success Messages** - Generic, missing context
4. **Walkthroughs** - Missing entirely

---

## G. Automation Opportunities

### Personalization

1. **Dynamic Hero** - Based on referrer/UTM/industry
2. **Personalized Features** - Based on pre-test
3. **Industry-Specific Content** - Based on user profile
4. **Usage-Based Suggestions** - Based on activity

### Lifecycle Automation

1. **Trial Cadence** - Automated email sequence
2. **Usage Tracking** - Automatic upgrade prompts
3. **Activity Nudges** - Low activity reminders
4. **Renewal Reminders** - Automated renewal emails

### Content Gating Automation

1. **Usage Limits** - Automatic enforcement
2. **Upgrade Prompts** - Context-aware CTAs
3. **Teaser Content** - Dynamic previews
4. **Feature Discovery** - Progressive disclosure

---

## H. Implementation Priority

### Phase 1: Critical (Week 1-2)
1. Rewrite homepage hero
2. Rewrite pricing plan descriptions
3. Add trial messaging to signup
4. Create lifecycle email templates
5. Implement trial countdown banner

### Phase 2: High Impact (Week 3-4)
1. Implement content gating
2. Create user-specific dashboard
3. Add upgrade prompts throughout
4. Rewrite error messages
5. Add onboarding hints

### Phase 3: Engagement (Week 5-6)
1. Implement tooltip system
2. Add success messages
3. Create walkthrough system
4. Add usage limit indicators
5. Implement banner system

### Phase 4: Optimization (Ongoing)
1. A/B test copy variants
2. Personalization implementation
3. Analytics tracking
4. Continuous improvement

---

**Report Generated:** 2025-01-XX  
**Status:** Complete - Ready for content backfill planning
