import { NextRequest, NextResponse } from "next/server";
import { getD1Database } from "@/lib/db";

export const dynamic = "force-dynamic";

// Update contact status
export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const { status } = body;

        if (!["new", "read", "responded"].includes(status)) {
            return NextResponse.json(
                { error: "Invalid status" },
                { status: 400 }
            );
        }

        const db = await getD1Database();
        await db
            .prepare("UPDATE contacts SET status = ? WHERE id = ?")
            .bind(status, id)
            .run();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating contact:", error);
        return NextResponse.json(
            { error: "Failed to update contact" },
            { status: 500 }
        );
    }
}

// Delete contact
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const db = await getD1Database();
        await db.prepare("DELETE FROM contacts WHERE id = ?").bind(id).run();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting contact:", error);
        return NextResponse.json(
            { error: "Failed to delete contact" },
            { status: 500 }
        );
    }
}
