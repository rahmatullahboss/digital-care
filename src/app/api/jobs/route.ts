import { getD1Database } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export interface Job {
  id: string;
  slug: string;
  title: string;
  title_bn: string | null;
  department: string | null;
  department_bn: string | null;
  type: string | null;
  type_bn: string | null;
  location: string | null;
  location_bn: string | null;
  description: string | null;
  description_bn: string | null;
  responsibilities: string[];
  responsibilities_bn: string[];
  requirements: string[];
  requirements_bn: string[];
  salary_range: string | null;
  salary_range_bn: string | null;
  is_active: number;
  order_index: number;
}

export async function GET() {
  try {
    const db = await getD1Database();
    
    const result = await db.prepare(
      "SELECT * FROM jobs WHERE is_active = 1 ORDER BY order_index"
    ).all();

    // Parse JSON fields
    const jobs = result.results.map((row: Record<string, unknown>) => ({
      ...row,
      responsibilities: row.responsibilities ? JSON.parse(row.responsibilities as string) : [],
      responsibilities_bn: row.responsibilities_bn ? JSON.parse(row.responsibilities_bn as string) : [],
      requirements: row.requirements ? JSON.parse(row.requirements as string) : [],
      requirements_bn: row.requirements_bn ? JSON.parse(row.requirements_bn as string) : [],
    })) as Job[];

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ jobs: [], error: "Failed to fetch jobs" }, { status: 500 });
  }
}
