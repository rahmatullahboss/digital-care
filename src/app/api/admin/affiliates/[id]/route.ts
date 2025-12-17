import { getD1Database } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(
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
        const { status } = body;

        if (!["pending", "approved", "rejected"].includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        const db = await getD1Database();
        await db
            .prepare("UPDATE affiliates SET status = ? WHERE id = ?")
            .bind(status, id)
            .run();

        return NextResponse.json({ success: true, message: "Affiliate status updated" });
    } catch (error) {
        console.error("Error updating affiliate:", error);
        return NextResponse.json({ error: "Failed to update affiliate" }, { status: 500 });
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
        await db.prepare("DELETE FROM affiliates WHERE id = ?").bind(id).run();

        return NextResponse.json({ success: true, message: "Affiliate deleted" });
    } catch (error) {
        console.error("Error deleting affiliate:", error);
        return NextResponse.json({ error: "Failed to delete affiliate" }, { status: 500 });
    }
}
