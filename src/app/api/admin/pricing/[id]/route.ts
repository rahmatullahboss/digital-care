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
        const pkg = await db.prepare("SELECT * FROM pricing WHERE id = ?").bind(id).first();

        if (!pkg) {
            return NextResponse.json({ error: "Package not found" }, { status: 404 });
        }

        const parsedPackage = {
            ...pkg,
            features: pkg.features ? JSON.parse(pkg.features as string) : [],
        };

        return NextResponse.json({ package: parsedPackage });
    } catch (error) {
        console.error("Error fetching package:", error);
        return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 });
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
        const { name, price, period, description, features, popular, order_index } = body;

        const db = await getD1Database();
        await db
            .prepare(
                `UPDATE pricing 
         SET name = ?, price = ?, period = ?, description = ?, features = ?, popular = ?, order_index = ?
         WHERE id = ?`
            )
            .bind(
                name,
                price,
                period || null,
                description || null,
                JSON.stringify(features || []),
                popular ? 1 : 0,
                order_index || 0,
                id
            )
            .run();

        return NextResponse.json({ success: true, message: "Package updated successfully" });
    } catch (error) {
        console.error("Error updating package:", error);
        return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
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
        await db.prepare("DELETE FROM pricing WHERE id = ?").bind(id).run();

        return NextResponse.json({ success: true, message: "Package deleted successfully" });
    } catch (error) {
        console.error("Error deleting package:", error);
        return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
    }
}
