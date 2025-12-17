import { getD1Database } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, promotion_strategy } = body;

        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: "নাম, ইমেইল এবং ফোন আবশ্যক" },
                { status: 400 }
            );
        }

        const db = await getD1Database();
        await db
            .prepare(
                "INSERT INTO affiliates (name, email, phone, promotion_strategy) VALUES (?, ?, ?, ?)"
            )
            .bind(name, email, phone, promotion_strategy || null)
            .run();

        return NextResponse.json({
            success: true,
            message: "আবেদন সফলভাবে জমা হয়েছে"
        });
    } catch (error) {
        console.error("Affiliate form error:", error);
        return NextResponse.json(
            { error: "একটি সমস্যা হয়েছে" },
            { status: 500 }
        );
    }
}
