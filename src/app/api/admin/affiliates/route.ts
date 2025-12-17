import { getD1Database } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const db = await getD1Database();
        const { results } = await db.prepare("SELECT * FROM affiliates ORDER BY created_at DESC").all();

        return NextResponse.json({ affiliates: results });
    } catch (error) {
        console.error("Error fetching affiliates:", error);
        return NextResponse.json({ error: "Failed to fetch affiliates" }, { status: 500 });
    }
}
