/**
 * Lifecycle Email Functions
 * 
 * Sends lifecycle emails for trial, paid, and retention
 */

import { sendEmail } from './email';
import { renderEmailTemplate, generatePlainText, getDefaultUrls, EmailTemplateData } from './email-templates';
import { logError } from '../utils/logger';

/**
 * Helper to create EmailTemplateData with proper optional property handling
 */
function createEmailData(base: Partial<EmailTemplateData>): EmailTemplateData {
  const urls = getDefaultUrls();
  const data: EmailTemplateData = { ...base };
  
  // Always include product and urls since getDefaultUrls() always returns a value
  data.product = urls as EmailTemplateData['product'];
  data.urls = urls as EmailTemplateData['urls'];
  
  return data;
}

/**
 * User data for lifecycle emails
 */
export interface LifecycleUser {
  email: string;
  firstName?: string;
  lastName?: string;
  industry?: string;
  companyName?: string;
  planType?: 'free' | 'trial' | 'commercial' | 'enterprise';
}

/**
 * Trial data
 */
export interface TrialData {
  trialStartDate: string;
  trialEndDate: string;
  daysRemaining: number;
}

/**
 * Send trial welcome email (Day 0)
 */
export async function sendTrialWelcomeEmail(
  user: LifecycleUser,
  trialData: TrialData
): Promise<{ id: string } | null> {
  try {
    const firstName = user.firstName || user.email.split('@')[0] || 'User';
    const trialEnd = new Date(trialData.trialEndDate);
    const chargeDate = isNaN(trialEnd.getTime()) 
      ? undefined 
      : new Date(trialEnd.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const trial: EmailTemplateData['trial'] = {
      trial_end_date: trialData.trialEndDate,
      trial_start_date: trialData.trialStartDate,
      days_remaining: trialData.daysRemaining,
    };
    
    if (chargeDate) {
      trial.charge_date = chargeDate;
    }
    
    const data = createEmailData({
      user: {
        first_name: firstName,
        email: user.email,
        ...(user.industry && { industry: user.industry }),
        ...(user.companyName && { company_name: user.companyName }),
        plan_type: user.planType || 'trial',
      },
      trial,
    });
    
    const html = await renderEmailTemplate('trial_welcome', data);
    const text = generatePlainText(html);
    
    return sendEmail({
      to: user.email,
      subject: 'Welcome to Settler! 🎉',
      html,
      text,
      tags: [{ name: 'email_type', value: 'trial_welcome' }],
    });
  } catch (error) {
    logError('Failed to send trial welcome email', error as Error, { user: user.email });
    return null;
  }
}

/**
 * Send trial value demonstration email (Day 2-3)
 */
export async function sendTrialValueEmail(
  user: LifecycleUser,
  trialData: TrialData,
  reconciliationData: {
    platformName: string;
    matchedCount: number;
    unmatchedCount: number;
    timeSaved: number;
    reportUrl: string;
  }
): Promise<{ id: string } | null> {
  try {
    const firstName = user.firstName || user.email.split('@')[0] || 'User';
    const data = createEmailData({
      user: {
        first_name: firstName,
        email: user.email,
      },
      trial: {
        days_remaining: trialData.daysRemaining,
      },
      reconciliation: {
        platform_name: reconciliationData.platformName,
        matched_count: reconciliationData.matchedCount,
        unmatched_count: reconciliationData.unmatchedCount,
        time_saved: reconciliationData.timeSaved,
        report_url: reconciliationData.reportUrl,
      },
    });
    
    const html = await renderEmailTemplate('trial_day2', data);
    const text = generatePlainText(html);
    
    return sendEmail({
      to: user.email,
      subject: 'Your first reconciliation is ready! 🎉',
      html,
      text,
      tags: [{ name: 'email_type', value: 'trial_value' }],
    });
  } catch (error) {
    logError('Failed to send trial value email', error as Error, { user: user.email });
    return null;
  }
}

/**
 * Send trial gated features email (Day 7)
 */
export async function sendTrialGatedFeaturesEmail(
  user: LifecycleUser,
  trialData: TrialData
): Promise<{ id: string } | null> {
  try {
    const urls = getDefaultUrls();
    const firstName = user.firstName || user.email.split('@')[0] || 'User';
    const data: EmailTemplateData = {
      user: {
        first_name: firstName,
        email: user.email,
      },
      trial: {
        days_remaining: trialData.daysRemaining,
      },
    };
    
    const html = await renderEmailTemplate('trial_day7', data);
    const text = generatePlainText(html);
    
    return sendEmail({
      to: user.email,
      subject: 'Unlock advanced features (still free for 23 days)',
      html,
      text,
      tags: [{ name: 'email_type', value: 'trial_gated_features' }],
    });
  } catch (error) {
    logError('Failed to send trial gated features email', error as Error, { user: user.email });
    return null;
  }
}

/**
 * Send trial case study email (Day 14)
 */
export async function sendTrialCaseStudyEmail(
  user: LifecycleUser,
  trialData: TrialData,
  caseStudy: {
    companyName: string;
    caseStudyUrl: string;
  }
): Promise<{ id: string } | null> {
  try {
    const urls = getDefaultUrls();
    const firstName = user.firstName || user.email.split('@')[0] || 'User';
    const data: EmailTemplateData = {
      user: {
        first_name: firstName,
        email: user.email,
        ...(user.industry && { industry: user.industry }),
      },
      trial: {
        days_remaining: trialData.daysRemaining,
      },
      case_study: {
        similar_company: caseStudy.companyName,
        case_study_url: caseStudy.caseStudyUrl,
        case_studies_url: `${urls?.docs_url || 'https://docs.settler.dev'}/case-studies`,
      },
    };
    
    const html = await renderEmailTemplate('trial_day14', data);
    const text = generatePlainText(html);
    
    return sendEmail({
      to: user.email,
      subject: `How ${caseStudy.companyName} saved 15 hours/week with Settler`,
      html,
      text,
      tags: [{ name: 'email_type', value: 'trial_case_study' }],
    });
  } catch (error) {
    logError('Failed to send trial case study email', error as Error, { user: user.email });
    return null;
  }
}

/**
 * Send trial comparison email (Day 21)
 */
export async function sendTrialComparisonEmail(
  user: LifecycleUser,
  trialData: TrialData
): Promise<{ id: string } | null> {
  try {
    const urls = getDefaultUrls();
    const firstName = user.firstName || user.email.split('@')[0] || 'User';
    const data: EmailTemplateData = {
      user: {
        first_name: firstName,
        email: user.email,
      },
      trial: {
        days_remaining: trialData.daysRemaining,
      },
    };
    
    const html = await renderEmailTemplate('trial_day21', data);
    const text = generatePlainText(html);
    
    return sendEmail({
      to: user.email,
      subject: "Here's what you're missing (9 days left)",
      html,
      text,
      tags: [{ name: 'email_type', value: 'trial_comparison' }],
    });
  } catch (error) {
    logError('Failed to send trial comparison email', error as Error, { user: user.email });
    return null;
  }
}

/**
 * Send trial urgency email (Day 27-29)
 */
export async function sendTrialUrgencyEmail(
  user: LifecycleUser,
  trialData: TrialData,
  day: 27 | 28 | 29
): Promise<{ id: string } | null> {
  try {
    const urls = getDefaultUrls();
    const firstName = user.firstName || user.email.split('@')[0] || 'User';
    const data: EmailTemplateData = {
      user: {
        first_name: firstName,
        email: user.email,
      },
      trial: (() => {
        const trialEnd = new Date(trialData.trialEndDate);
        const chargeDate = isNaN(trialEnd.getTime()) 
          ? undefined 
          : new Date(trialEnd.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        
        const trial: EmailTemplateData['trial'] = {
          trial_end_date: trialData.trialEndDate,
          days_remaining: trialData.daysRemaining,
        };
        
        if (chargeDate) {
          trial.charge_date = chargeDate;
        }
        
        return trial;
      })(),
    };
    
    const templateName = `trial_day${day}`;
    const html = await renderEmailTemplate(templateName, data);
    const text = generatePlainText(html);
    
    const subjects = {
      27: '⏰ Your trial ends in 3 days',
      28: 'Last chance: Trial ends tomorrow',
      29: 'Final reminder: Trial ends today',
    };
    
    return sendEmail({
      to: user.email,
      subject: subjects[day],
      html,
      text,
      tags: [{ name: 'email_type', value: `trial_urgency_day${day}` }],
    });
  } catch (error) {
    logError('Failed to send trial urgency email', error as Error, { user: user.email, day });
    return null;
  }
}

/**
 * Send trial ended email (Day 30)
 */
export async function sendTrialEndedEmail(
  user: LifecycleUser
): Promise<{ id: string } | null> {
  try {
    const urls = getDefaultUrls();
    const firstName = user.firstName || user.email.split('@')[0] || 'User';
    const data: EmailTemplateData = {
      user: {
        first_name: firstName,
        email: user.email,
      },
    };
    
    const html = await renderEmailTemplate('trial_ended', data);
    const text = generatePlainText(html);
    
    return sendEmail({
      to: user.email,
      subject: 'Your trial has ended - Choose your plan',
      html,
      text,
      tags: [{ name: 'email_type', value: 'trial_ended' }],
    });
  } catch (error) {
    logError('Failed to send trial ended email', error as Error, { user: user.email });
    return null;
  }
}

/**
 * Send paid welcome email
 */
export async function sendPaidWelcomeEmail(
  user: LifecycleUser
): Promise<{ id: string } | null> {
  try {
    const urls = getDefaultUrls();
    const firstName = user.firstName || user.email.split('@')[0] || 'User';
    const data: EmailTemplateData = {
      user: {
        first_name: firstName,
        email: user.email,
      },
    };
    
    const html = await renderEmailTemplate('paid_welcome', data);
    const text = generatePlainText(html);
    
    return sendEmail({
      to: user.email,
      subject: 'Welcome to Commercial! 🎉',
      html,
      text,
      tags: [{ name: 'email_type', value: 'paid_welcome' }],
    });
  } catch (error) {
    logError('Failed to send paid welcome email', error as Error, { user: user.email });
    return null;
  }
}

/**
 * Send monthly summary email
 */
export async function sendMonthlySummaryEmail(
  user: LifecycleUser,
  metrics: {
    totalReconciliations: number;
    accuracy: number;
    timeSaved: number;
    jobsCreated: number;
    topInsight1?: string;
    topInsight2?: string;
    recommendation1?: string;
    recommendation2?: string;
  }
): Promise<{ id: string } | null> {
  try {
    const urls = getDefaultUrls();
    const month = new Date().toLocaleString('en-US', { month: 'long' });
    const firstName = user.firstName || user.email.split('@')[0] || 'User';
    const data: EmailTemplateData = {
      user: {
        first_name: firstName,
        email: user.email,
      },
      monthly: {
        month,
      },
      metrics: {
        total_reconciliations: metrics.totalReconciliations,
        accuracy: metrics.accuracy,
        time_saved: metrics.timeSaved,
        jobs_created: metrics.jobsCreated,
      },
      recommendations: {
        ...(metrics.topInsight1 && { top_insight_1: metrics.topInsight1 }),
        ...(metrics.topInsight2 && { top_insight_2: metrics.topInsight2 }),
        ...(metrics.recommendation1 && { recommendation_1: metrics.recommendation1 }),
        ...(metrics.recommendation2 && { recommendation_2: metrics.recommendation2 }),
      },
    };
    
    const html = await renderEmailTemplate('monthly_summary', data);
    const text = generatePlainText(html);
    
    return sendEmail({
      to: user.email,
      subject: `${user.firstName || 'You'}, your ${month} summary`,
      html,
      text,
      tags: [{ name: 'email_type', value: 'monthly_summary' }],
    });
  } catch (error) {
    logError('Failed to send monthly summary email', error as Error, { user: user.email });
    return null;
  }
}

/**
 * Send low activity nudge email
 */
export async function sendLowActivityEmail(
  user: LifecycleUser
): Promise<{ id: string } | null> {
  try {
    const urls = getDefaultUrls();
    const firstName = user.firstName || user.email.split('@')[0] || 'User';
    const data: EmailTemplateData = {
      user: {
        first_name: firstName,
        email: user.email,
      },
    };
    
    const html = await renderEmailTemplate('low_activity', data);
    const text = generatePlainText(html);
    
    return sendEmail({
      to: user.email,
      subject: `${user.firstName || 'We'} miss you`,
      html,
      text,
      tags: [{ name: 'email_type', value: 'low_activity' }],
    });
  } catch (error) {
    logError('Failed to send low activity email', error as Error, { user: user.email });
    return null;
  }
}
