/**
 * Onboarding Email Sequence
 * Automated email sequences for new users
 */

import { query } from "../../db";
import { logInfo, logError } from "../../utils/logger";
import { getOnboardingProgress, isOnboardingComplete } from "../onboarding/tracker";

interface User {
  id: string;
  email: string;
  name?: string;
  created_at: Date;
  plan_type: string;
}

/**
 * Send Day 0 welcome email
 */
export async function sendDay0WelcomeEmail(userId: string): Promise<void> {
  try {
    const users = await query<User>(
      `SELECT id, email, name, created_at, plan_type
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (users.length === 0) {
      logError("User not found for welcome email", new Error("User not found"), { userId });
      return;
    }

    const user = users[0];
    if (!user) return;

    // In production, use actual email service (Resend, SendGrid, etc.)
    logInfo("Sending Day 0 welcome email", {
      userId: user.id,
      email: user.email,
    });

    // TODO: Integrate with email service
    // await emailService.send({
    //   to: user.email,
    //   template: 'welcome-day-0',
    //   data: {
    //     name: user.name || 'there',
    //     trialDays: 30
    //   }
    // });
  } catch (error) {
    logError("Failed to send Day 0 welcome email", error, { userId });
  }
}

/**
 * Send Day 1 onboarding email
 */
export async function sendDay1OnboardingEmail(userId: string): Promise<void> {
  try {
    const users = await query<User>(
      `SELECT id, email, name, plan_type
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (users.length === 0) return;
    const user = users[0];
    if (!user) return;

    const progress = await getOnboardingProgress(userId);
    const nextStep = progress?.steps.find((s) => !s.completed);

    logInfo("Sending Day 1 onboarding email", {
      userId: user.id,
      email: user.email,
      nextStep: nextStep?.step,
    });

    // TODO: Integrate with email service
    // await emailService.send({
    //   to: user.email,
    //   template: 'onboarding-day-1',
    //   data: {
    //     name: user.name || 'there',
    //     nextStep: nextStep?.step,
    //     progress: progress?.completionPercentage || 0
    //   }
    // });
  } catch (error) {
    logError("Failed to send Day 1 onboarding email", error, { userId });
  }
}

/**
 * Send Day 3 activation email
 */
export async function sendDay3ActivationEmail(userId: string): Promise<void> {
  try {
    const users = await query<User>(
      `SELECT id, email, name, plan_type
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (users.length === 0) return;
    const user = users[0];
    if (!user) return;

    const isComplete = await isOnboardingComplete(userId);

    logInfo("Sending Day 3 activation email", {
      userId: user.id,
      email: user.email,
      onboardingComplete: isComplete,
    });

    // TODO: Integrate with email service
    // await emailService.send({
    //   to: user.email,
    //   template: isComplete ? 'activation-complete' : 'activation-reminder',
    //   data: {
    //     name: user.name || 'there',
    //     onboardingComplete: isComplete
    //   }
    // });
  } catch (error) {
    logError("Failed to send Day 3 activation email", error, { userId });
  }
}

/**
 * Process onboarding email sequence
 * Sends emails based on user signup date
 */
export async function processOnboardingEmails(): Promise<void> {
  try {
    logInfo("Processing onboarding email sequence");

    const now = new Date();
    const day0 = new Date(now);
    day0.setDate(day0.getDate() - 0);
    day0.setHours(0, 0, 0, 0);

    const day1 = new Date(now);
    day1.setDate(day1.getDate() - 1);
    day1.setHours(0, 0, 0, 0);

    const day3 = new Date(now);
    day3.setDate(day3.getDate() - 3);
    day3.setHours(0, 0, 0, 0);

    // Day 0: Users who signed up today
    const day0Users = await query<User>(
      `SELECT id, email, name, created_at
       FROM users
       WHERE DATE(created_at) = DATE($1)
         AND deleted_at IS NULL`,
      [day0]
    );

    for (const user of day0Users) {
      await sendDay0WelcomeEmail(user.id);
    }

    // Day 1: Users who signed up yesterday
    const day1Users = await query<User>(
      `SELECT id, email, name, created_at
       FROM users
       WHERE DATE(created_at) = DATE($1)
         AND deleted_at IS NULL`,
      [day1]
    );

    for (const user of day1Users) {
      await sendDay1OnboardingEmail(user.id);
    }

    // Day 3: Users who signed up 3 days ago
    const day3Users = await query<User>(
      `SELECT id, email, name, created_at
       FROM users
       WHERE DATE(created_at) = DATE($1)
         AND deleted_at IS NULL`,
      [day3]
    );

    for (const user of day3Users) {
      await sendDay3ActivationEmail(user.id);
    }

    logInfo("Onboarding email sequence processed", {
      day0Count: day0Users.length,
      day1Count: day1Users.length,
      day3Count: day3Users.length,
    });
  } catch (error) {
    logError("Failed to process onboarding emails", error);
  }
}
