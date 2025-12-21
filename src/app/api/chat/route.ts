import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Hardcoded account ID - this is public info (visible in Cloudflare dashboard URLs)
const CF_ACCOUNT_ID = "474078d5f990169d7dadf4e1df83214a";
const CF_AI_ENDPOINT = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/@cf/openai/gpt-oss-120b`;

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

// Define env type
interface CloudflareEnv {
  CF_AI_API_TOKEN?: string;
  AI?: {
    run: (model: string, options: unknown) => Promise<{ response?: string }>;
  };
  [key: string]: unknown;
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

    // Get environment from Cloudflare context
    let env: CloudflareEnv | null = null;
    try {
      const context = await getCloudflareContext({ async: true });
      env = context.env as unknown as CloudflareEnv;
    } catch (contextError) {
      console.error("[Chat API] Failed to get Cloudflare context:", contextError);
    }

    // Build conversation context
    const conversationContext = history.slice(-4).map((m: ChatMessage) => 
      `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
    ).join('\n');
    
    const fullInput = conversationContext 
      ? `${conversationContext}\nUser: ${message}`
      : message;

    console.log("[Chat API] Calling AI with input:", fullInput.substring(0, 100) + "...");

    // Try binding first (most efficient)
    if (env?.AI) {
      try {
        console.log("[Chat API] Using AI binding");
        const aiResponse = await env.AI.run("@cf/openai/gpt-oss-120b", {
          instructions: SYSTEM_PROMPT,
          input: fullInput,
        });
        
        if (aiResponse?.response) {
          console.log("[Chat API] AI binding success:", aiResponse.response.substring(0, 100));
          return NextResponse.json({ response: aiResponse.response });
        }
      } catch (bindingError) {
        console.error("[Chat API] AI binding failed:", bindingError);
      }
    }

    // Fallback to REST API
    const apiToken = env?.CF_AI_API_TOKEN;
    if (!apiToken) {
      console.error("[Chat API] No API token available");
      return NextResponse.json({
        response: "দুঃখিত, AI সার্ভিস কনফিগার করা হয়নি। অনুগ্রহ করে 01639590392 নম্বরে কল করুন।"
      });
    }

    console.log("[Chat API] Using REST API fallback");
    const aiResponse = await fetch(CF_AI_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instructions: SYSTEM_PROMPT,
        input: fullInput,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("[Chat API] REST API error:", aiResponse.status, errorText);
      return NextResponse.json({
        response: "দুঃখিত, AI সিস্টেমে সমস্যা হচ্ছে। অনুগ্রহ করে 01639590392 নম্বরে কল করুন।"
      });
    }

    const aiResult = await aiResponse.json();
    console.log("[Chat API] REST API response:", JSON.stringify(aiResult, null, 2));

    const responseText = aiResult?.result?.response 
      || aiResult?.result?.output 
      || aiResult?.response
      || null;

    if (responseText) {
      console.log("[Chat API] Successfully extracted response:", responseText.substring(0, 100));
      return NextResponse.json({ response: responseText });
    }

    console.warn("[Chat API] Could not extract response text");
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
