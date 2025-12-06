/**
 * User-Specific Dashboard
 *
 * Shows user's reconciliation data, trial status, usage stats, and personalized recommendations
 */

import { Suspense } from "react";
import { redirect } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { TrialCountdownBanner } from "@/components/TrialCountdownBanner";
import { UsageLimitIndicator } from "@/components/UsageLimitIndicator";
import { WelcomeDashboard } from "@/components/WelcomeDashboard";
import { EmptyState } from "@/components/ui/empty-state";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

// Force dynamic rendering
export const dynamic = "force-dynamic";

import { getUserDashboardData } from "@/lib/data/user-dashboard";
import type { UserDashboardData } from "@/lib/data/user-dashboard";

async function fetchUserDashboard(): Promise<UserDashboardData | null> {
  return getUserDashboardData();
}

async function UserDashboardContent() {
  const data = await fetchUserDashboard();

  // Redirect to signup if not authenticated
  if (!data) {
    redirect("/signup");
    return null;
  }

  // Show welcome dashboard for first-time users
  if (data.isFirstVisit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-black">
        <Navigation />
        <WelcomeDashboard
          userName={data.user.firstName || undefined}
          trialEndDate={data.user.trialEndDate || undefined}
        />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-black">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Trial Countdown Banner */}
        {data.user.planType === "trial" && data.user.trialEndDate && (
          <TrialCountdownBanner
            trialEndDate={data.user.trialEndDate}
            userPlan={data.user.planType}
          />
        )}

        {/* Usage Limits */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <UsageLimitIndicator
            current={data.usage.reconciliations.current}
            limit={data.usage.reconciliations.limit}
            type="reconciliations"
            userPlan={data.user.planType}
            period="month"
          />
          <UsageLimitIndicator
            current={data.usage.playgroundRuns.current}
            limit={data.usage.playgroundRuns.limit}
            type="playground_runs"
            userPlan={data.user.planType}
            period="day"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Reconciliations</CardDescription>
              <CardTitle className="text-3xl">
                {data.metrics.totalReconciliations.toLocaleString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Activity className="w-4 h-4" />
                <span>All time</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Average Accuracy</CardDescription>
              <CardTitle className="text-3xl">{data.metrics.averageAccuracy}%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span>Excellent</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Time Saved</CardDescription>
              <CardTitle className="text-3xl">{data.metrics.timeSaved}h</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4" />
                <span>This month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Jobs Created</CardDescription>
              <CardTitle className="text-3xl">{data.metrics.jobsCreated}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Active</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Jobs */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Reconciliation Jobs</CardTitle>
                <CardDescription>Your latest reconciliation results</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard/jobs">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {data.recentJobs.length === 0 ? (
              <EmptyState
                title="No jobs yet"
                description="Create your first reconciliation job to get started"
                action={{
                  label: "Create Job",
                  onClick: () => (window.location.href = "/playground"),
                }}
              />
            ) : (
              <div className="space-y-4">
                {data.recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                        {job.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          {job.matchedCount} matched
                        </span>
                        <span className="flex items-center gap-1">
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                          {job.unmatchedCount} unmatched
                        </span>
                        <span>{job.accuracy}% accuracy</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          job.status === "completed"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : job.status === "running"
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {job.status}
                      </span>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/dashboard/jobs/${job.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="h-auto py-4 flex-col">
                <Link href="/playground">
                  <span className="text-lg mb-2">🚀</span>
                  <span className="font-semibold">Create New Job</span>
                  <span className="text-xs text-slate-500 mt-1">Set up a reconciliation</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col">
                <Link href="/cookbooks">
                  <span className="text-lg mb-2">📚</span>
                  <span className="font-semibold">Browse Cookbooks</span>
                  <span className="text-xs text-slate-500 mt-1">Ready-to-use workflows</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col">
                <Link href="/docs">
                  <span className="text-lg mb-2">📖</span>
                  <span className="font-semibold">View Documentation</span>
                  <span className="text-xs text-slate-500 mt-1">Learn how to use Settler</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}

export default function UserDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-black">
          <Navigation />
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-electric-cyan mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-400">Loading dashboard...</p>
            </div>
          </div>
          <Footer />
        </div>
      }
    >
      <UserDashboardContent />
    </Suspense>
  );
}
