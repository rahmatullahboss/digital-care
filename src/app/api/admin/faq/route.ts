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
        const { results } = await db.prepare("SELECT * FROM faq ORDER BY order_index ASC").all();

        return NextResponse.json({ faqs: results });
    } catch (error) {
        console.error("Error fetching FAQs:", error);
        return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { question, answer, order_index } = body;

        const db = await getD1Database();
        await db
            .prepare(
                `INSERT INTO faq (question, answer, order_index)
         VALUES (?, ?, ?)`
            )
            .bind(
                question,
                answer,
                order_index || 0
            )
            .run();

        return NextResponse.json({ success: true, message: "FAQ created successfully" });
    } catch (error) {
        console.error("Error creating FAQ:", error);
        return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
    }
}
