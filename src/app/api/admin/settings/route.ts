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
        const settings = await db.prepare("SELECT * FROM settings WHERE id = 1").first();

        return NextResponse.json({ settings: settings || {} });
    } catch (error) {
        console.error("Error fetching settings:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { phone, email, address, facebook_url, linkedin_url, youtube_url } = body;

        const db = await getD1Database();
        await db
            .prepare(
                `UPDATE settings 
         SET phone = ?, email = ?, address = ?, facebook_url = ?, linkedin_url = ?, youtube_url = ?, updated_at = datetime('now')
         WHERE id = 1`
            )
            .bind(
                phone || null,
                email || null,
                address || null,
                facebook_url || null,
                linkedin_url || null,
                youtube_url || null
            )
            .run();

        return NextResponse.json({ success: true, message: "Settings updated successfully" });
    } catch (error) {
        console.error("Error updating settings:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
