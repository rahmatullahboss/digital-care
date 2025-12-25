import { NextRequest, NextResponse } from "next/server";
import { getD1Database } from "@/lib/db";

export const dynamic = "force-dynamic";

interface SaveChatRequest {
  sessionId: string;
  userId?: string;
  guestInfo?: {
    name: string;
    phone: string;
  };
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: SaveChatRequest = await req.json();
    const { sessionId, userId, guestInfo, message } = body;

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = await getD1Database();

    // Check if conversation exists (using Raw SQL)
    const existingConversation = await db.prepare(
        "SELECT * FROM chat_conversations WHERE session_id = ?"
    ).bind(sessionId).first();

    let conversationId: string;
    let existingGuestName: string | null = null;
    let existingGuestPhone: string | null = null;

    if (!existingConversation) {
      // Create new conversation
      conversationId = `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      const conversationData = (existingConversation as any);
      
      const now = new Date().toISOString();
      await db.prepare(
        `INSERT INTO chat_conversations (id, session_id, user_id, guest_name, guest_phone, message_count, last_message_at, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        conversationId,
        sessionId,
        userId || null,
        guestInfo?.name || null,
        guestInfo?.phone || null,
        0,
        now,
        now,
        now
      ).run();
    } else {
      conversationId = (existingConversation as any).id;
      existingGuestName = (existingConversation as any).guest_name;
      existingGuestPhone = (existingConversation as any).guest_phone;
    }

    // Save the message
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const now = new Date().toISOString();
    
    await db.prepare(
        `INSERT INTO chat_messages (id, conversation_id, role, content, created_at)
         VALUES (?, ?, ?, ?, ?)`
    ).bind(
        messageId,
        conversationId,
        message.role,
        message.content,
        now
    ).run();

    // Update conversation stats
    // Update guest info if provided and not already set
    const updateGuestName = (guestInfo && !existingGuestName) ? guestInfo.name : existingGuestName;
    const updateGuestPhone = (guestInfo && !existingGuestPhone) ? guestInfo.phone : existingGuestPhone;

    // We can't use complex SQL templating easily, so we just construct the update values
    // Actually, SQLITE doesn't support conditional updates inside SET easily without CASE which can be verbose.
    // Simpler to just update fields if we have new values, or keep old ones.
    
    // However, if we didn't fetch old values properly (we did above), we can just set them.
    // If existingGuestName was null and guestInfo.name is provided, we use guestInfo.name.
    // If existingGuestName was existing, we use it (or just don't touch it, but setting it to itself is safe).
    
    // Better logic:
    // If we have new guest info and the DB was empty, update it.
    
    let updateQuery = "UPDATE chat_conversations SET message_count = message_count + 1, last_message_at = ?, updated_at = ?";
    const updateBindArgs: any[] = [now, now];
    
    if (guestInfo && !existingGuestName) {
        updateQuery += ", guest_name = ?";
        updateBindArgs.push(guestInfo.name);
    }
    
    if (guestInfo && !existingGuestPhone) {
        updateQuery += ", guest_phone = ?";
        updateBindArgs.push(guestInfo.phone);
    }
    
    updateQuery += " WHERE id = ?";
    updateBindArgs.push(conversationId);
    
    // Spread args for bind
    await db.prepare(updateQuery).bind(...updateBindArgs).run();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving chat:", error);
    return NextResponse.json({ error: "Failed to save chat" }, { status: 500 });
  }
}
