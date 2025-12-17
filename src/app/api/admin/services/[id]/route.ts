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
        const service = await db.prepare("SELECT * FROM services WHERE id = ?").bind(id).first();

        if (!service) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        // Parse JSON fields
        const parsedService = {
            ...service,
            features: service.features ? JSON.parse(service.features as string) : [],
            benefits: service.benefits ? JSON.parse(service.benefits as string) : [],
        };

        return NextResponse.json({ service: parsedService });
    } catch (error) {
        console.error("Error fetching service:", error);
        return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
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
        const { title, slug, tagline, description, icon, features, benefits, order_index } = body;

        const db = await getD1Database();
        await db
            .prepare(
                `UPDATE services 
         SET title = ?, slug = ?, tagline = ?, description = ?, icon = ?, features = ?, benefits = ?, order_index = ?
         WHERE id = ?`
            )
            .bind(
                title,
                slug,
                tagline || null,
                description || null,
                icon || null,
                JSON.stringify(features || []),
                JSON.stringify(benefits || []),
                order_index || 0,
                id
            )
            .run();

        return NextResponse.json({ success: true, message: "Service updated successfully" });
    } catch (error) {
        console.error("Error updating service:", error);
        return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
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
        await db.prepare("DELETE FROM services WHERE id = ?").bind(id).run();

        return NextResponse.json({ success: true, message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error deleting service:", error);
        return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
    }
}
