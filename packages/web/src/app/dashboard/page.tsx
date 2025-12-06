/**
 * Dashboard Router
 *
 * Routes to user dashboard if authenticated, otherwise shows public dashboard
 */

import { redirect } from "next/navigation";

// In production, check authentication and route accordingly
// For now, redirect to user dashboard
export default function DashboardPage() {
  // Check if user is authenticated
  // const user = await getCurrentUser();
  // if (user) {
  //   redirect('/dashboard/user');
  // } else {
  //   // Show public dashboard
  //   return <PublicDashboard />;
  // }

  // Temporary: redirect to user dashboard
  redirect("/dashboard/user");
}
