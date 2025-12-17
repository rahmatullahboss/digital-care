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
        const { results } = await db.prepare("SELECT * FROM pricing ORDER BY order_index ASC").all();

        return NextResponse.json({ packages: results });
    } catch (error) {
        console.error("Error fetching pricing packages:", error);
        return NextResponse.json({ error: "Failed to fetch pricing packages" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, price, period, description, features, popular, order_index } = body;

        const db = await getD1Database();
        await db
            .prepare(
                `INSERT INTO pricing (name, price, period, description, features, popular, order_index)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
            )
            .bind(
                name,
                price,
                period || null,
                description || null,
                JSON.stringify(features || []),
                popular ? 1 : 0,
                order_index || 0
            )
            .run();

        return NextResponse.json({ success: true, message: "Pricing package created successfully" });
    } catch (error) {
        console.error("Error creating pricing package:", error);
        return NextResponse.json({ error: "Failed to create pricing package" }, { status: 500 });
    }
}
