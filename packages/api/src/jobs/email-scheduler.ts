/**
 * Email Scheduler
 * 
 * Scheduled jobs for lifecycle email automation
 */

import { logInfo, logError } from '../utils/logger';
import {
  sendTrialWelcomeEmail,
  sendTrialValueEmail,
  sendTrialGatedFeaturesEmail,
  sendTrialCaseStudyEmail,
  sendTrialComparisonEmail,
  sendTrialUrgencyEmail,
  sendTrialEndedEmail,
  sendPaidWelcomeEmail,
  sendMonthlySummaryEmail,
  sendLowActivityEmail,
  LifecycleUser,
  TrialData,
} from '../lib/email-lifecycle';

// Note: These imports are used in the scheduled job functions

/**
 * Calculate days remaining in trial
 */
function calculateDaysRemaining(trialEndDate: string): number {
  const end = new Date(trialEndDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

/**
 * Check if trial email should be sent based on days remaining
 */
// Note: shouldSendTrialEmail is kept for future use in email scheduling logic
function _shouldSendTrialEmail(trialEndDate: string, targetDays: number): boolean {
  const daysRemaining = calculateDaysRemaining(trialEndDate);
  return daysRemaining === targetDays;
}

/**
 * Process trial lifecycle emails
 * Should be called daily via cron job
 */
export async function processTrialLifecycleEmails(): Promise<void> {
  try {
    logInfo('Processing trial lifecycle emails');
    
    // In production, fetch users from database
    // For now, this is a placeholder structure
    // const users = await getTrialUsers();
    
    // Example structure:
    // const users = [
    //   {
    //     email: 'user@example.com',
    //     firstName: 'John',
    //     trialStartDate: '2025-01-01',
    //     trialEndDate: '2025-01-31',
    //     // ... other user data
    //   },
    // ];
    
    // for (const user of users) {
    //   const trialData: TrialData = {
    //     trialStartDate: user.trialStartDate,
    //     trialEndDate: user.trialEndDate,
    //     daysRemaining: calculateDaysRemaining(user.trialEndDate),
    //   };
    //   
    //   const lifecycleUser: LifecycleUser = {
    //     email: user.email,
    //     firstName: user.firstName,
    //     industry: user.industry,
    //     planType: 'trial',
    //   };
    //   
    //   // Send appropriate email based on days remaining
    //   if (shouldSendTrialEmail(trialData.trialEndDate, 7)) {
    //     await sendTrialGatedFeaturesEmail(lifecycleUser, trialData);
    //   } else if (shouldSendTrialEmail(trialData.trialEndDate, 14)) {
    //     await sendTrialCaseStudyEmail(lifecycleUser, trialData, {
    //       companyName: 'Example Company',
    //       caseStudyUrl: 'https://settler.dev/case-studies/example',
    //     });
    //   } else if (shouldSendTrialEmail(trialData.trialEndDate, 21)) {
    //     await sendTrialComparisonEmail(lifecycleUser, trialData);
    //   } else if (shouldSendTrialEmail(trialData.trialEndDate, 3)) {
    //     await sendTrialUrgencyEmail(lifecycleUser, trialData, 27);
    //   } else if (shouldSendTrialEmail(trialData.trialEndDate, 2)) {
    //     await sendTrialUrgencyEmail(lifecycleUser, trialData, 28);
    //   } else if (shouldSendTrialEmail(trialData.trialEndDate, 1)) {
    //     await sendTrialUrgencyEmail(lifecycleUser, trialData, 29);
    //   } else if (shouldSendTrialEmail(trialData.trialEndDate, 0)) {
    //     await sendTrialEndedEmail(lifecycleUser);
    //   }
    // }
    
    logInfo('Trial lifecycle emails processed');
  } catch (error) {
    logError('Failed to process trial lifecycle emails', error as Error);
  }
}

/**
 * Process monthly summary emails
 * Should be called on the 1st of each month
 */
export async function processMonthlySummaryEmails(): Promise<void> {
  try {
    logInfo('Processing monthly summary emails');
    
    // In production, fetch paid users from database
    // For each user, calculate metrics and send email
    
    // Example:
    // const paidUsers = await getPaidUsers();
    // for (const user of paidUsers) {
    //   const metrics = await calculateUserMetrics(user.id, lastMonth);
    //   await sendMonthlySummaryEmail(user, metrics);
    // }
    
    logInfo('Monthly summary emails processed');
  } catch (error) {
    logError('Failed to process monthly summary emails', error as Error);
  }
}

/**
 * Process low activity nudges
 * Should be called daily
 */
export async function processLowActivityEmails(): Promise<void> {
  try {
    logInfo('Processing low activity emails');
    
    // In production, find users inactive for 7+ days
    // const inactiveUsers = await getInactiveUsers(7);
    // for (const user of inactiveUsers) {
    //   await sendLowActivityEmail(user);
    // }
    
    logInfo('Low activity emails processed');
  } catch (error) {
    logError('Failed to process low activity emails', error as Error);
  }
}

/**
 * Setup cron jobs (example using node-cron syntax)
 * 
 * In production, use a proper job scheduler like:
 * - BullMQ with cron jobs
 * - Vercel Cron Jobs
 * - AWS EventBridge
 * - Google Cloud Scheduler
 */
export function setupEmailScheduler(): void {
  // Example cron setup (would need node-cron or similar)
  // cron.schedule('0 9 * * *', processTrialLifecycleEmails); // Daily at 9 AM
  // cron.schedule('0 9 1 * *', processMonthlySummaryEmails); // 1st of month at 9 AM
  // cron.schedule('0 10 * * *', processLowActivityEmails); // Daily at 10 AM
  
  logInfo('Email scheduler setup complete');
}
