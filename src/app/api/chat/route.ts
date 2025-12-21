import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Google Gemini API - simple HTTP fetch (no Cloudflare bundling issues)
const GEMINI_API_KEY = "AIzaSyBbOhA5BC515l2UkvoojF4CFFLUAzTjwiE";
const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

// Digital Care context for the AI
const SYSTEM_PROMPT = `তুমি ডিজিটাল কেয়ার সলিউশনস এর AI সহকারী। তোমার নাম "দীপ্তি"। তুমি বাংলায় উত্তর দেবে।

আমাদের সার্ভিস:
1. স্মার্ট ওয়েবসাইট ও সেলস ফানেল - ১০,০০০ টাকা থেকে শুরু
2. ফেসবুক পেজ ম্যানেজমেন্ট
3. AI সেলস এজেন্ট (২৪/৭ চ্যাটবট)
4. ডিজিটাল মার্কেটিং ও বিজ্ঞাপন
5. মোবাইল অ্যাপ ডেভেলপমেন্ট

প্যাকেজ:
- বেসিক ওয়েবসাইট: ১০,০০০ টাকা
- বিজনেস ওয়েবসাইট: ২৫,০০০ টাকা
- প্রিমিয়াম ওয়েবসাইট: ৮০,০০০ টাকা

যোগাযোগ:
- ফোন: 01639590392
- ওয়েবসাইট: digitalcare.site

নিয়ম:
- সংক্ষিপ্ত ও সহায়ক উত্তর দাও
- প্রশ্ন না বুঝলে বিনয়ের সাথে জিজ্ঞেস কর
- প্রাইসিং সম্পর্কে জিজ্ঞেস করলে সঠিক তথ্য দাও
- কাস্টমারদের ফোনে কল করতে উৎসাহিত কর`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Gemini API types
interface GeminiContent {
  role: "user" | "model";
  parts: { text: string }[];
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    message?: string;
    code?: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [] } = body;

    console.log("[Chat API] Received request:", { message, historyLength: history.length });

    if (!message || typeof message !== "string") {
      console.log("[Chat API] Invalid message:", message);
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build conversation history for Gemini
    const geminiHistory: GeminiContent[] = [];
    
    // Add system instruction as first user message (Gemini doesn't have system role)
    geminiHistory.push({
      role: "user",
      parts: [{ text: `নিম্নলিখিত নির্দেশনা মেনে চল:\n\n${SYSTEM_PROMPT}\n\nএখন আমার প্রশ্নের উত্তর দাও।` }]
    });
    geminiHistory.push({
      role: "model",
      parts: [{ text: "বুঝেছি! আমি দীপ্তি, ডিজিটাল কেয়ার সলিউশনস এর AI সহকারী। আপনাকে কীভাবে সাহায্য করতে পারি?" }]
    });

    // Add conversation history
    for (const msg of history.slice(-6)) {
      geminiHistory.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      });
    }

    // Add current message
    geminiHistory.push({
      role: "user",
      parts: [{ text: message }]
    });

    console.log("[Chat API] Calling Gemini API...");

    // Call Gemini API
    const geminiResponse = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: geminiHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error("[Chat API] Gemini API error:", geminiResponse.status, errorText);
      return NextResponse.json({
        response: "দুঃখিত, AI সিস্টেমে সমস্যা হচ্ছে। অনুগ্রহ করে 01639590392 নম্বরে কল করুন।"
      });
    }

    const geminiResult: GeminiResponse = await geminiResponse.json();
    console.log("[Chat API] Gemini response received");

    // Extract response text
    const responseText = geminiResult?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (responseText) {
      console.log("[Chat API] Success:", responseText.substring(0, 100));
      return NextResponse.json({ response: responseText });
    }

    // Check for error
    if (geminiResult?.error) {
      console.error("[Chat API] Gemini error:", geminiResult.error);
    }

    console.warn("[Chat API] Could not extract response");
    return NextResponse.json({
      response: "দুঃখিত, আমি উত্তর দিতে পারছি না। অনুগ্রহ করে আবার চেষ্টা করুন অথবা 01639590392 নম্বরে কল করুন।"
    });

  } catch (error) {
    console.error("[Chat API] Unexpected error:", error);
    return NextResponse.json({
      response: "দুঃখিত, কিছু সমস্যা হয়েছে। অনুগ্রহ করে 01639590392 নম্বরে কল করুন।"
    });
  }
}
