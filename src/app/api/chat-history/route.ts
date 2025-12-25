import { NextRequest, NextResponse } from "next/server";
import { getD1Database } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    try {
        const sessionId = req.nextUrl.searchParams.get("sessionId");

        if (!sessionId) {
            return NextResponse.json(
                { error: "Missing sessionId" },
                { status: 400 }
            );
        }

        const db = await getD1Database();

        // Find the conversation by sessionId
        const conversationRequest = await db.prepare(
            "SELECT * FROM chat_conversations WHERE session_id = ?"
        ).bind(sessionId).first();

        const conversation = conversationRequest as any;

        if (!conversation) {
            return NextResponse.json({ messages: [], guestInfo: null });
        }

        // Fetch all messages for this conversation
        const messagesResult = await db.prepare(
            "SELECT id, role, content, created_at FROM chat_messages WHERE conversation_id = ? ORDER BY created_at ASC"
        ).bind(conversation.id).all();

        const messages = messagesResult.results;

        return NextResponse.json({
            messages,
            guestInfo: conversation.guest_name || conversation.guest_phone
                ? {
                    name: conversation.guest_name || "Guest",
                    phone: conversation.guest_phone || "",
                }
                : null,
        });
    } catch (error) {
        console.error("Error loading chat history:", error);
        return NextResponse.json(
            { error: "Failed to load chat history" },
            { status: 500 }
        );
    }
}
