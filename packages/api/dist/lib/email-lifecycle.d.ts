/**
 * Lifecycle Email Functions
 *
 * Sends lifecycle emails for trial, paid, and retention
 */
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
export declare function sendTrialWelcomeEmail(user: LifecycleUser, trialData: TrialData): Promise<{
    id: string;
} | null>;
/**
 * Send trial value demonstration email (Day 2-3)
 */
export declare function sendTrialValueEmail(user: LifecycleUser, trialData: TrialData, reconciliationData: {
    platformName: string;
    matchedCount: number;
    unmatchedCount: number;
    timeSaved: number;
    reportUrl: string;
}): Promise<{
    id: string;
} | null>;
/**
 * Send trial gated features email (Day 7)
 */
export declare function sendTrialGatedFeaturesEmail(user: LifecycleUser, trialData: TrialData): Promise<{
    id: string;
} | null>;
/**
 * Send trial case study email (Day 14)
 */
export declare function sendTrialCaseStudyEmail(user: LifecycleUser, trialData: TrialData, caseStudy: {
    companyName: string;
    caseStudyUrl: string;
}): Promise<{
    id: string;
} | null>;
/**
 * Send trial comparison email (Day 21)
 */
export declare function sendTrialComparisonEmail(user: LifecycleUser, trialData: TrialData): Promise<{
    id: string;
} | null>;
/**
 * Send trial urgency email (Day 27-29)
 */
export declare function sendTrialUrgencyEmail(user: LifecycleUser, trialData: TrialData, day: 27 | 28 | 29): Promise<{
    id: string;
} | null>;
/**
 * Send trial ended email (Day 30)
 */
export declare function sendTrialEndedEmail(user: LifecycleUser): Promise<{
    id: string;
} | null>;
/**
 * Send paid welcome email
 */
export declare function sendPaidWelcomeEmail(user: LifecycleUser): Promise<{
    id: string;
} | null>;
/**
 * Send monthly summary email
 */
export declare function sendMonthlySummaryEmail(user: LifecycleUser, metrics: {
    totalReconciliations: number;
    accuracy: number;
    timeSaved: number;
    jobsCreated: number;
    topInsight1?: string;
    topInsight2?: string;
    recommendation1?: string;
    recommendation2?: string;
}): Promise<{
    id: string;
} | null>;
/**
 * Send low activity nudge email
 */
export declare function sendLowActivityEmail(user: LifecycleUser): Promise<{
    id: string;
} | null>;
//# sourceMappingURL=email-lifecycle.d.ts.map