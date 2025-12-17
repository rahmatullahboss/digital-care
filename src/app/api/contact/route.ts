import { getD1Database } from "@/lib/db";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, email, message } = body;

        if (!name || !phone || !message) {
            return NextResponse.json(
                { error: "নাম, ফোন এবং বার্তা আবশ্যক" },
                { status: 400 }
            );
        }

        const db = await getD1Database();
        await db
            .prepare(
                "INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)"
            )
            .bind(name, phone, email || null, message)
            .run();

        return NextResponse.json({ success: true, message: "বার্তা সফলভাবে পাঠানো হয়েছে" });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "একটি সমস্যা হয়েছে" },
            { status: 500 }
        );
    }
}
