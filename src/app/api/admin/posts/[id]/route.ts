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
        const post = await db.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first();

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ post });
    } catch (error) {
        console.error("Error fetching post:", error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
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
        const { title, slug, excerpt, content, image_url, published } = body;

        const db = await getD1Database();
        await db
            .prepare(
                `UPDATE posts 
         SET title = ?, slug = ?, excerpt = ?, content = ?, image_url = ?, published = ?, updated_at = datetime('now')
         WHERE id = ?`
            )
            .bind(
                title,
                slug,
                excerpt,
                content,
                image_url || null,
                published ? 1 : 0,
                id
            )
            .run();

        return NextResponse.json({ success: true, message: "Post updated successfully" });
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
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
        await db.prepare("DELETE FROM posts WHERE id = ?").bind(id).run();

        return NextResponse.json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }
}
