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
        const { results } = await db.prepare("SELECT * FROM posts ORDER BY created_at DESC").all();

        return NextResponse.json({ posts: results });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { title, slug, excerpt, content, image_url, published } = body;

        const db = await getD1Database();
        await db
            .prepare(
                `INSERT INTO posts (title, slug, excerpt, content, image_url, published)
         VALUES (?, ?, ?, ?, ?, ?)`
            )
            .bind(
                title,
                slug,
                excerpt,
                content,
                image_url || null,
                published ? 1 : 0
            )
            .run();

        return NextResponse.json({ success: true, message: "Post created successfully" });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
