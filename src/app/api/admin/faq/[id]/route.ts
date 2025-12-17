import { getD1Database } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const db = await getD1Database();
        const faq = await db.prepare("SELECT * FROM faq WHERE id = ?").bind(id).first();

        if (!faq) {
            return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
        }

        return NextResponse.json({ faq });
    } catch (error) {
        console.error("Error fetching FAQ:", error);
        return NextResponse.json({ error: "Failed to fetch FAQ" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { question, answer, order_index } = body;

        const db = await getD1Database();
        await db
            .prepare(
                `UPDATE faq 
         SET question = ?, answer = ?, order_index = ?
         WHERE id = ?`
            )
            .bind(
                question,
                answer,
                order_index || 0,
                id
            )
            .run();

        return NextResponse.json({ success: true, message: "FAQ updated successfully" });
    } catch (error) {
        console.error("Error updating FAQ:", error);
        return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const db = await getD1Database();
        await db.prepare("DELETE FROM faq WHERE id = ?").bind(id).run();

        return NextResponse.json({ success: true, message: "FAQ deleted successfully" });
    } catch (error) {
        console.error("Error deleting FAQ:", error);
        return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
    }
}
