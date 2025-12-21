import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const GEMINI_API_KEY = "AIzaSyBbOhA5BC515l2UkvoojF4CFFLUAzTjwiE";

const SYSTEM_PROMPT = `তুমি ডিজিটাল কেয়ার সলিউশনস এর AI সহকারী দীপ্তি। বাংলায় উত্তর দাও। আমাদের সার্ভিস: ওয়েবসাইট (১০,০০০-৮০,০০০ টাকা), ফেসবুক ম্যানেজমেন্ট, AI চ্যাটবট। ফোন: 01639590392`;

export async function GET() {
  return NextResponse.json({ status: "ok", service: "chat" });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body?.message;
    
    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: `${SYSTEM_PROMPT}\n\nপ্রশ্ন: ${message}` }] }]
        })
      }
    );

    if (!response.ok) {
      return NextResponse.json({ response: "দুঃখিত, সমস্যা হচ্ছে। 01639590392 তে কল করুন।" });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "উত্তর দিতে পারছি না।";
    
    return NextResponse.json({ response: text });
  } catch {
    return NextResponse.json({ response: "দুঃখিত, সমস্যা হচ্ছে। 01639590392 তে কল করুন।" });
  }
}
