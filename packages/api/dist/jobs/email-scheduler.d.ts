/**
 * Email Scheduler
 *
 * Scheduled jobs for lifecycle email automation
 */
/**
 * Process trial lifecycle emails
 * Should be called daily via cron job
 */
export declare function processTrialLifecycleEmails(): Promise<void>;
/**
 * Process monthly summary emails
 * Should be called on the 1st of each month
 */
export declare function processMonthlySummaryEmails(): Promise<void>;
/**
 * Process low activity nudges
 * Should be called daily
 */
export declare function processLowActivityEmails(): Promise<void>;
/**
 * Setup cron jobs (example using node-cron syntax)
 *
 * In production, use a proper job scheduler like:
 * - BullMQ with cron jobs
 * - Vercel Cron Jobs
 * - AWS EventBridge
 * - Google Cloud Scheduler
 */
export declare function setupEmailScheduler(): void;
//# sourceMappingURL=email-scheduler.d.ts.map