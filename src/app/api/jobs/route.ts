import { getD1Database } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  type: string | null;
  location: string | null;
  description: string | null;
  responsibilities: string[];
  requirements: string[];
  salary_range: string | null;
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
      requirements: row.requirements ? JSON.parse(row.requirements as string) : [],
    })) as Job[];

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({ jobs: [], error: "Failed to fetch jobs" }, { status: 500 });
  }
}
