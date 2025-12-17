import { NextResponse } from "next/server";
import { getD1Database } from "@/lib/db";

export const dynamic = "force-dynamic";

interface Contact {
    id: string;
    name: string;
    phone: string;
    email?: string;
    message: string;
    status: string;
    created_at: string;
}

export async function GET() {
    try {
        const db = await getD1Database();
        const results = await db
            .prepare("SELECT * FROM contacts ORDER BY created_at DESC")
            .all<Contact>();

        return NextResponse.json({ contacts: results.results || [] });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return NextResponse.json(
            { error: "Failed to fetch contacts" },
            { status: 500 }
        );
    }
}
