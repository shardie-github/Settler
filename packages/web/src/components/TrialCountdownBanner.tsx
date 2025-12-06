"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Clock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TrialCountdownBannerProps {
  trialEndDate: string;
  userPlan?: "free" | "trial" | "commercial" | "enterprise";
  className?: string;
}

export function TrialCountdownBanner({
  trialEndDate,
  userPlan = "trial",
  className,
}: TrialCountdownBannerProps) {
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateDaysRemaining = () => {
      const end = new Date(trialEndDate);
      const now = new Date();
      const diff = end.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

      if (days <= 0) {
        setIsExpired(true);
        return 0;
      }

      return days;
    };

    setDaysRemaining(calculateDaysRemaining());

    // Update every hour
    const interval = setInterval(
      () => {
        setDaysRemaining(calculateDaysRemaining());
      },
      60 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [trialEndDate]);

  // Only show for trial users
  if (userPlan !== "trial") {
    return null;
  }

  if (isExpired) {
    return (
      <div
        className={cn("bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6", className)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <div>
              <p className="font-semibold text-red-900 dark:text-red-300">Your trial has ended</p>
              <p className="text-sm text-red-700 dark:text-red-400">
                Upgrade to keep using all features
              </p>
            </div>
          </div>
          <Button asChild size="sm" className="bg-red-600 hover:bg-red-700">
            <Link href="/pricing">Upgrade Now</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getUrgencyLevel = () => {
    if (daysRemaining <= 3) return "high";
    if (daysRemaining <= 7) return "medium";
    return "low";
  };

  const urgency = getUrgencyLevel();

  const styles = {
    high: "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-900 dark:text-red-300",
    medium: "bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-900 dark:text-amber-300",
    low: "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-900 dark:text-blue-300",
  };

  return (
    <div className={cn("border-l-4 p-4 mb-6", styles[urgency], className)}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Clock
            className={cn(
              "w-5 h-5",
              urgency === "high" && "text-red-600 dark:text-red-400",
              urgency === "medium" && "text-amber-600 dark:text-amber-400",
              urgency === "low" && "text-blue-600 dark:text-blue-400"
            )}
          />
          <div>
            <p className="font-semibold">
              {daysRemaining === 1
                ? "Your trial ends tomorrow"
                : `Your trial ends in ${daysRemaining} days`}
            </p>
            <p className="text-sm opacity-80">
              Upgrade to unlock all features and keep your workflows
            </p>
          </div>
        </div>
        <Button
          asChild
          size="sm"
          className={cn(
            urgency === "high" && "bg-red-600 hover:bg-red-700",
            urgency === "medium" && "bg-amber-600 hover:bg-amber-700",
            urgency === "low" && "bg-blue-600 hover:bg-blue-700"
          )}
        >
          <Link href="/pricing">Upgrade Now</Link>
        </Button>
      </div>
    </div>
  );
}
