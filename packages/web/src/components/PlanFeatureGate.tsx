"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";
import { PlanType, isContentGated } from "@/config/plans";

interface PlanFeatureGateProps {
  children: ReactNode;
  userPlan?: PlanType;
  contentId: string;
  contentType: "cookbook" | "doc" | "feature";
  title?: string;
  description?: string;
  teaserContent?: ReactNode;
  upgradeLink?: string;
}

export function PlanFeatureGate({
  children,
  userPlan = "free",
  contentId,
  contentType,
  title,
  description,
  teaserContent,
  upgradeLink = "/pricing",
}: PlanFeatureGateProps) {
  const isGated = isContentGated(userPlan, contentId, contentType);

  if (!isGated) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Teaser Content */}
      {teaserContent && <div className="mb-4 opacity-75">{teaserContent}</div>}

      {/* Gated Overlay */}
      <Card className="border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <Badge variant="outline" className="border-slate-300 dark:border-slate-700">
              Premium Feature
            </Badge>
          </div>
          <CardTitle className="text-xl text-slate-900 dark:text-white">
            {title || "Upgrade to Unlock"}
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            {description ||
              "This feature is available on paid plans. Start your 30-day free trial to access it."}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">With a paid plan, you get:</p>
            <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-1 text-left max-w-md mx-auto">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-electric-cyan" />
                Full access to all features
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-electric-cyan" />
                Unlimited reconciliations
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-electric-cyan" />
                Free 30-minute consultation
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-electric-cyan" />
                Priority support
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              <Link href={upgradeLink}>Start 30-Day Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Teaser Content Component
 * Shows a blurred/preview version of gated content
 */
interface TeaserContentProps {
  children: ReactNode;
  blurIntensity?: "light" | "medium" | "heavy";
}

export function TeaserContent({ children, blurIntensity = "medium" }: TeaserContentProps) {
  const blurClass = {
    light: "blur-sm",
    medium: "blur-md",
    heavy: "blur-lg",
  }[blurIntensity];

  return (
    <div className={`relative ${blurClass} pointer-events-none select-none`}>
      {children}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/80 dark:via-slate-900/20 dark:to-slate-900/80" />
    </div>
  );
}
