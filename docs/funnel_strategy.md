# Funnel & Segmentation Strategy

**Date:** 2025-01-XX  
**Purpose:** Design free-trial → paid-subscription funnel with clear content boundaries

---

## Executive Summary

This document maps all pages to funnel stages, defines free vs paid content boundaries, and provides recommendations for content gating to drive trial signups and paid conversions.

---

## Funnel Stage Mapping

### Awareness Stage

**Goal:** Problem framing, credibility, high-level overview

| Page           | Current State                     | Recommended Changes                                |
| -------------- | --------------------------------- | -------------------------------------------------- |
| `/` (Homepage) | Mixed (awareness + consideration) | Focus on problem/outcome, remove technical details |
| `/community`   | Retention-focused                 | Add awareness CTAs, showcase success stories       |

**Key Messaging:**

- "Stop wasting hours on manual matching"
- "Automatically match transactions between any platforms"
- Social proof: "Companies save 10+ hours per week"

**Primary CTA:** "Start 30-Day Free Trial" (no credit card)

---

### Consideration Stage

**Goal:** Features, use cases, deeper explanations, comparisons

| Page          | Current State    | Recommended Changes                                       |
| ------------- | ---------------- | --------------------------------------------------------- |
| `/docs`       | Full access      | Gate advanced docs, show teasers for free users           |
| `/cookbooks`  | Full access      | Gate advanced cookbooks (real-time, multi-currency)       |
| `/playground` | Full access      | Limit free tier to basic examples, gate advanced features |
| `/pricing`    | Comparison table | Add "What you get free" vs "What you unlock" sections     |

**Key Messaging:**

- "See how it works" (teasers)
- "Try advanced features free for 30 days"
- Use case examples with outcomes

**Primary CTA:** "Start Free Trial" or "Upgrade to Unlock"

---

### Conversion Stage

**Goal:** Pricing, trial, FAQ, risk-reversal, testimonials

| Page          | Current State    | Recommended Changes                         |
| ------------- | ---------------- | ------------------------------------------- |
| `/pricing`    | Plans comparison | Add trial benefits, consulting time mention |
| `/enterprise` | Enterprise form  | Add trial option for enterprise leads       |
| `/signup`     | Basic signup     | Add pre-test questions, trial benefits      |

**Key Messaging:**

- "30-Day Free Trial - No Credit Card Required"
- "Includes free consulting session"
- "Cancel anytime during trial"

**Primary CTA:** "Start Free Trial" (direct to signup)

---

### Retention/Expansion Stage

**Goal:** In-app surfaces, upgrade prompts, workflow libraries, advanced tutorials

| Page         | Current State  | Recommended Changes                                         |
| ------------ | -------------- | ----------------------------------------------------------- |
| `/dashboard` | Public metrics | Create user dashboard with trial countdown, upgrade prompts |
| `/cookbooks` | All accessible | Show upgrade prompts on gated cookbooks                     |
| `/docs`      | All accessible | Show upgrade prompts on gated docs                          |

**Key Messaging:**

- "Your trial ends in X days"
- "Unlock advanced features"
- "Get personalized consulting"

**Primary CTA:** "Upgrade Now" or "Book Free Consultation"

---

## Free vs Paid Content Boundaries

### Free / Trial Experience

#### What Should Be Fully Free:

1. **Homepage**
   - Problem framing
   - Basic feature overview
   - Social proof/testimonials
   - Simplified code preview (not full example)

2. **Pricing Page**
   - All plan comparisons
   - FAQ
   - Basic feature list

3. **Basic Documentation**
   - Getting started guide
   - Installation instructions
   - Basic API overview (teaser)

4. **Basic Cookbooks**
   - E-commerce (Shopify → Stripe) - basic version
   - Scheduled reconciliations - basic version
   - Error handling basics

5. **Playground**
   - Basic demo mode (limited runs)
   - Simple examples
   - Code editor with basic features

6. **Signup/Onboarding**
   - Account creation
   - Basic pre-test questions
   - Welcome dashboard

#### What Should Be Teaser-Only (Free):

1. **Advanced Documentation**
   - Show table of contents
   - First paragraph of each section
   - "Upgrade to view full docs" CTA

2. **Advanced Cookbooks**
   - Real-time webhooks (show use case, gate code)
   - Multi-currency (show description, gate implementation)
   - Advanced analytics (show benefits, gate access)

3. **Full Code Examples**
   - Show simplified version
   - "View full example" → requires upgrade

4. **Edge AI Features**
   - Show benefits
   - Gate deployment/configuration

#### What Should Be Gated / Paid Only:

1. **Advanced Features**
   - Real-time webhook reconciliation
   - Multi-currency with FX conversion
   - Advanced analytics and dashboards
   - Custom integrations

2. **Detailed Frameworks**
   - Step-by-step implementation guides
   - Internal matching algorithms explanation
   - Advanced configuration options

3. **Full Case Studies**
   - Detailed ROI calculations
   - Complete implementation stories
   - Customer-specific results

4. **Consulting & Support**
   - Free consulting time (30-60 min) - paid only
   - Priority support
   - Dedicated account manager

5. **Advanced Workflows**
   - Complex multi-provider setups
   - Custom rule configurations
   - Enterprise deployment guides

---

## Content Gating Recommendations

### Specific Sections to Gate:

#### Documentation (`/docs`)

| Section                | Free Access       | Paid Access   |
| ---------------------- | ----------------- | ------------- |
| Getting Started        | Full              | Full          |
| Installation           | Full              | Full          |
| Basic API Reference    | First 2 endpoints | All endpoints |
| Advanced API Reference | Teaser only       | Full          |
| Webhooks               | Teaser only       | Full          |
| Multi-currency         | Teaser only       | Full          |
| Edge AI                | Overview only     | Full docs     |

**Implementation:** Show blurred/teaser content with "Upgrade to view" CTA

#### Cookbooks (`/cookbooks`)

| Cookbook                  | Free Access      | Paid Access |
| ------------------------- | ---------------- | ----------- |
| E-commerce (Basic)        | Full             | Full        |
| Scheduled Reconciliations | Full             | Full        |
| Real-time Webhooks        | Description only | Full code   |
| Multi-currency            | Description only | Full code   |
| Advanced Analytics        | Description only | Full code   |
| Enterprise Deployment     | Teaser only      | Full        |

**Implementation:** Show description and use case, gate code examples

#### Playground (`/playground`)

| Feature            | Free Access | Paid Access |
| ------------------ | ----------- | ----------- |
| Basic Examples     | 3 runs/day  | Unlimited   |
| Code Editor        | Basic       | Advanced    |
| Real-time Testing  | No          | Yes         |
| Webhook Simulation | No          | Yes         |
| Multi-provider     | No          | Yes         |

**Implementation:** Show usage limits, prompt upgrade when limit reached

---

## Primary CTA Positioning

### Where "Start 30-Day Free Trial" Should Appear:

1. **Hero Section (Homepage)** ✅
   - Primary, large button
   - Above the fold
   - Clear value: "No credit card required"

2. **Pricing Page** ✅
   - On each plan card
   - Prominent on Commercial plan
   - Below plan comparison

3. **Persistent Header/Footer** ⚠️ (Not currently implemented)
   - Sticky header CTA (optional, not too intrusive)
   - Footer CTA section

4. **Key "Aha" Sections** ⚠️ (Partially implemented)
   - After features section
   - After social proof
   - After code example (teaser)

5. **Gated Content Surfaces** ⚠️ (Not currently implemented)
   - When user hits free limit
   - When viewing gated content
   - In-app upgrade prompts

---

## Free Trial Structure

### Trial Length: 30 Days

### Activation Requirements:

- Email address
- Basic firmographic info (company name, industry - optional)
- **No credit card required** (recommended for higher conversion)

### Day 0 Experience:

**Welcome Dashboard Should Show:**

1. **Welcome message** with trial benefits
2. **Simple AI-generated news feed** (related to user's industry/niche)
3. **Option to connect email platform** or upload campaigns for analysis
4. **Clear explainer:**
   - "What you get for free" (trial features)
   - "What you unlock on paid" (preview of paid features)
5. **Pre-test prompt** (optional but encouraged)

### Pre-Test / Personalization Flow

**Questions to Ask:**

1. What's your primary goal? (Save time, reduce errors, scale operations)
2. What industry are you in? (E-commerce, SaaS, Finance, etc.)
3. How many transactions do you process monthly? (<1K, 1K-10K, 10K-100K, 100K+)
4. Which platforms do you use? (Shopify, Stripe, QuickBooks, PayPal, etc.)
5. How often do you need reconciliation? (Daily, Weekly, Monthly, Real-time)
6. What's your biggest pain point? (Manual work, errors, time-consuming, etc.)

**How Inputs Map to Personalization:**

- **News Feed:** Industry-specific articles, platform-specific tips
- **Email Insights:** Platform-specific analysis templates
- **Suggested Workflows:** Based on platforms selected
- **Dashboard Defaults:** Show relevant metrics first

**UI Location:**

- First-run modal (can be dismissed, but persistent banner until completed)
- Or onboarding screen (Step 1 of onboarding flow)

---

## Consulting Time Positioning

### How to Frame:

- "Bonus Strategy Call" (friendly)
- "Free Onboarding Session" (professional)
- "30-Minute Setup Consultation" (specific)

### Where to Pitch:

1. **Pricing Page**
   - Mention in Commercial plan features
   - "Includes 30-minute onboarding call"

2. **In-App Banners**
   - Day 2-3: "Book your free consultation"
   - Day 7: "Get personalized setup help"

3. **Trial Day 5-10 Email**
   - "Schedule your free 30-minute consultation"
   - Link to calendar booking

4. **Upgrade Flow**
   - "Upgrade now and get free consultation"

### Trigger:

- **Option A:** Available to all trial users (recommended)
- **Option B:** Only triggered on upgrade (less conversion-friendly)

**Recommendation:** Make it available during trial, but emphasize it's included with paid plan

---

## Content Gating Implementation Plan

### Technical Approach:

1. **Feature Flags / Plan Configuration**
   - Create `config/plans.ts` with plan definitions
   - Feature flags: `isTrial`, `isPaid`, `hasPretestCompleted`
   - Limits: `reportsPerMonth`, `cookbooksAccess`, `docsAccess`

2. **Component Structure**
   - `<PlanFeatureGate />` component for gating content
   - `<TeaserContent />` for showing previews
   - `<UpgradePrompt />` for upgrade CTAs

3. **Conditional Rendering**
   - Check user plan status
   - Show teaser vs full content
   - Display upgrade prompts

### Example Structure:

```typescript
// config/plans.ts
export const plans = {
  free: {
    name: "Free Trial",
    features: {
      cookbooks: ["basic"],
      docs: ["getting-started", "installation"],
      playground: { runsPerDay: 3 },
      consulting: false,
    },
  },
  paid: {
    name: "Commercial",
    features: {
      cookbooks: ["all"],
      docs: ["all"],
      playground: { runsPerDay: "unlimited" },
      consulting: true,
    },
  },
};
```

---

## Next Steps

1. **Phase 3:** Design 30-day trial email and in-app cadence
2. **Phase 4:** Implement content gating components and copy rewrites
3. **Phase 5:** Test and optimize conversion flow

---

**Report Generated:** 2025-01-XX  
**Status:** Ready for Phase 3 implementation
