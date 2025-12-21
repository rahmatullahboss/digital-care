import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

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

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const { env } = await getCloudflareContext({ async: true });

    // Check if AI binding exists
    if (!env.AI) {
      console.error("AI binding not found");
      return NextResponse.json(
        { error: "AI service unavailable", response: "দুঃখিত, AI সার্ভিস এখন unavailable। অনুগ্রহ করে 01639590392 নম্বরে কল করুন।" },
        { status: 200 }
      );
    }

    // Build conversation context for GPT-OSS-120B
    const conversationContext = history.slice(-4).map((m: ChatMessage) => 
      `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`
    ).join('\n');
    
    const fullInput = conversationContext 
      ? `${conversationContext}\nUser: ${message}`
      : message;

    // Run GPT-OSS-120B model (OpenAI's open-weight model)
    const response = await env.AI.run("@cf/openai/gpt-oss-120b", {
      instructions: SYSTEM_PROMPT,
      input: fullInput,
    });

    return NextResponse.json({
      response: response.response || (response as { output?: string }).output || "দুঃখিত, আমি উত্তর দিতে পারছি না। অনুগ্রহ করে আবার চেষ্টা করুন।",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        response: "দুঃখিত, কিছু সমস্যা হয়েছে। অনুগ্রহ করে 01639590392 নম্বরে কল করুন।"
      },
      { status: 200 }
    );
  }
}
