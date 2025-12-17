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
        const { results } = await db.prepare("SELECT * FROM services ORDER BY order_index ASC").all();

        return NextResponse.json({ services: results });
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { title, slug, tagline, description, icon, features, benefits, order_index } = body;

        const db = await getD1Database();
        await db
            .prepare(
                `INSERT INTO services (title, slug, tagline, description, icon, features, benefits, order_index)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
            )
            .bind(
                title,
                slug,
                tagline || null,
                description || null,
                icon || null,
                JSON.stringify(features || []),
                JSON.stringify(benefits || []),
                order_index || 0
            )
            .run();

        return NextResponse.json({ success: true, message: "Service created successfully" });
    } catch (error) {
        console.error("Error creating service:", error);
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }
}
