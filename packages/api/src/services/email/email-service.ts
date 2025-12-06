/**
 * Email Service
 * Handles sending emails via configured provider (Resend/SendGrid)
 */

import { logInfo, logError } from "../../utils/logger";
import { config } from "../../config";

export interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  from?: string;
  replyTo?: string;
}

/**
 * Send email via configured provider
 * Currently supports Resend (default) or SendGrid
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const emailProvider = config.email?.provider || "resend";
    const fromEmail = options.from || config.email?.from || "noreply@settler.dev";

    if (emailProvider === "resend") {
      return await sendViaResend({
        ...options,
        from: fromEmail,
      });
    } else if (emailProvider === "sendgrid") {
      return await sendViaSendGrid({
        ...options,
        from: fromEmail,
      });
    } else {
      logError("Unsupported email provider", new Error(`Provider: ${emailProvider}`));
      return false;
    }
  } catch (error) {
    logError("Failed to send email", error, { to: options.to, subject: options.subject });
    return false;
  }
}

/**
 * Send email via Resend
 */
async function sendViaResend(options: EmailOptions): Promise<boolean> {
  const apiKey = config.email?.resendApiKey || process.env.RESEND_API_KEY;

  if (!apiKey) {
    logError("Resend API key not configured", new Error("Missing RESEND_API_KEY"));
    return false;
  }

  try {
    // Dynamic import to avoid requiring Resend in package.json if not used
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: options.from!,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
      reply_to: options.replyTo,
    });

    if (result.error) {
      logError("Resend API error", new Error(result.error.message), {
        to: options.to,
        subject: options.subject,
      });
      return false;
    }

    logInfo("Email sent via Resend", {
      to: options.to,
      subject: options.subject,
      id: result.data?.id,
    });

    return true;
  } catch (error) {
    logError("Failed to send email via Resend", error, {
      to: options.to,
      subject: options.subject,
    });
    return false;
  }
}

/**
 * Send email via SendGrid
 */
async function sendViaSendGrid(options: EmailOptions): Promise<boolean> {
  const apiKey = config.email?.sendgridApiKey || process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    logError("SendGrid API key not configured", new Error("Missing SENDGRID_API_KEY"));
    return false;
  }

  try {
    // Dynamic import to avoid requiring SendGrid in package.json if not used
    const sgMail = await import("@sendgrid/mail");
    sgMail.default.setApiKey(apiKey);

    const msg = {
      to: options.to,
      from: options.from!,
      subject: options.subject,
      text: options.text,
      html: options.html,
      replyTo: options.replyTo,
    };

    await sgMail.default.send(msg);

    logInfo("Email sent via SendGrid", {
      to: options.to,
      subject: options.subject,
    });

    return true;
  } catch (error) {
    logError("Failed to send email via SendGrid", error, {
      to: options.to,
      subject: options.subject,
    });
    return false;
  }
}

/**
 * Render email template with variables
 */
export function renderEmailTemplate(
  template: string,
  variables: Record<string, string | number | boolean>
): string {
  let rendered = template;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    rendered = rendered.replace(regex, String(value));
  }
  return rendered;
}
