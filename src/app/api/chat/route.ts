import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Dynamic import to avoid module resolution issues in production
async function getEnv() {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const context = await getCloudflareContext({ async: true });
    return context.env;
  } catch (error) {
    console.error("[Chat API] Failed to import getCloudflareContext:", error);
    return null;
  }
}

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

// Type for all possible AI response formats
interface AIResponse {
  response?: string;
  output?: string;
  output_text?: string;
  text?: string;
  result?: string;
  content?: string;
  message?: string;
  [key: string]: unknown;
}

/**
 * Extract the response text from various possible AI response formats
 */
function extractResponseText(response: unknown): string | null {
  if (!response) return null;
  
  // If it's a string, return it directly
  if (typeof response === "string") {
    return response;
  }
  
  // If it's an object, try to extract from known fields
  if (typeof response === "object") {
    const res = response as AIResponse;
    
    // Try all possible response fields
    const possibleFields = [
      res.response,
      res.output,
      res.output_text,
      res.text,
      res.result,
      res.content,
      res.message,
    ];
    
    for (const field of possibleFields) {
      if (typeof field === "string" && field.trim()) {
        return field;
      }
    }
    
    // For nested structures, try to stringify if it has meaningful content
    const keys = Object.keys(res);
    if (keys.length > 0) {
      // Log the structure for debugging
      console.log("AI Response structure:", JSON.stringify(res, null, 2));
    }
  }
  
  return null;
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

    const env = await getEnv();
    if (!env) {
      console.error("[Chat API] Failed to get Cloudflare context");
      return NextResponse.json({
        response: "দুঃখিত, সার্ভিসে সমস্যা হচ্ছে। অনুগ্রহ করে 01639590392 নম্বরে কল করুন।"
      });
    }

    // Check if AI binding exists
    if (!env?.AI) {
      console.error("[Chat API] AI binding not found in environment");
      return NextResponse.json({
        response: "দুঃখিত, AI সার্ভিস এখন unavailable। অনুগ্রহ করে 01639590392 নম্বরে কল করুন।"
      });
    }

    // Build conversation context for GPT-OSS-120B (Responses API format)
    const conversationContext = history.slice(-4).map((m: ChatMessage) => 
      `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
    ).join('\n');
    
    const fullInput = conversationContext 
      ? `${conversationContext}\nUser: ${message}`
      : message;

    console.log("[Chat API] Calling AI with input:", fullInput.substring(0, 100) + "...");

    let aiResponse;
    try {
      // Run GPT-OSS-120B model using Responses API format
      // Documentation: https://developers.cloudflare.com/workers-ai/models/gpt-oss-120b/
      aiResponse = await env.AI.run("@cf/openai/gpt-oss-120b", {
        instructions: SYSTEM_PROMPT,
        input: fullInput,
      });
      
      console.log("[Chat API] Raw AI response type:", typeof aiResponse);
      console.log("[Chat API] Raw AI response:", JSON.stringify(aiResponse, null, 2));
    } catch (aiError) {
      console.error("[Chat API] AI.run() failed:", aiError);
      return NextResponse.json({
        response: "দুঃখিত, AI সিস্টেমে সমস্যা হচ্ছে। অনুগ্রহ করে 01639590392 নম্বরে কল করুন।"
      });
    }

    // Extract response text from the AI response
    const responseText = extractResponseText(aiResponse);
    
    if (responseText) {
      console.log("[Chat API] Successfully extracted response:", responseText.substring(0, 100));
      return NextResponse.json({ response: responseText });
    }

    // If we couldn't extract a response, log and return fallback
    console.warn("[Chat API] Could not extract response text from AI response");
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
