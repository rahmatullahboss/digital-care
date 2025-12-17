import { NextResponse } from "next/server";
import { getD1Database } from "@/lib/db";
import { Order } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const db = await getD1Database();
        const results = await db
            .prepare("SELECT * FROM orders ORDER BY created_at DESC")
            .all<Order>();

        return NextResponse.json({ orders: results.results || [] });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}
