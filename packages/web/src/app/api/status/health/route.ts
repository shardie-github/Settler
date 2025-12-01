/**
 * Health Status Endpoint
 * 
 * All-Cylinder Firing Check: Verifies all 3 KPIs are met.
 * Returns "Status: Loud and High ✓" only if all KPIs pass.
 */

import { createAdminClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface KPIHealthStatus {
  newUsersWeek: number;
  actionsLastHour: number;
  topPostEngagement: number;
  allCylindersFiring: boolean;
}

export async function GET() {
  try {
    const supabase = await createAdminClient();

    // Query the combined KPI health status view
    const { data, error } = await supabase
      .from('kpi_health_status')
      .select('*')
      .single();

    if (error) {
      console.error('KPI health check error:', error);
      return NextResponse.json(
        {
          status: 'Error',
          message: 'Failed to check KPI health',
          error: error.message,
        },
        { status: 500 }
      );
    }

    const healthStatus: KPIHealthStatus = {
      newUsersWeek: data.new_users_week || 0,
      actionsLastHour: data.actions_last_hour || 0,
      topPostEngagement: data.top_post_engagement || 0,
      allCylindersFiring: data.all_cylinders_firing || false,
    };

    // Check if all KPIs meet thresholds
    const kpi1Pass = healthStatus.newUsersWeek > 50;
    const kpi2Pass = healthStatus.actionsLastHour > 100;
    const kpi3Pass = healthStatus.topPostEngagement > 100;

    const allPass = kpi1Pass && kpi2Pass && kpi3Pass;

    return NextResponse.json(
      {
        status: allPass ? 'Loud and High ✓' : 'Building Momentum',
        allCylindersFiring: allPass,
        kpis: {
          kpi1: {
            name: 'New Users This Week',
            value: healthStatus.newUsersWeek,
            threshold: 50,
            passed: kpi1Pass,
          },
          kpi2: {
            name: 'Actions Completed in Last Hour',
            value: healthStatus.actionsLastHour,
            threshold: 100,
            passed: kpi2Pass,
          },
          kpi3: {
            name: 'Most Engaged Post Engagement',
            value: healthStatus.topPostEngagement,
            threshold: 100,
            passed: kpi3Pass,
          },
        },
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      {
        status: 'Error',
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
