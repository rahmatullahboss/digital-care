import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  return NextResponse.json({ status: "ok" });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;
    
    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    // Simple Gemini API call
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBbOhA5BC515l2UkvoojF4CFFLUAzTjwiE",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `তুমি ডিজিটাল কেয়ার সলিউশনস এর AI সহকারী দীপ্তি। বাংলায় উত্তর দাও। প্রশ্ন: ${message}` }]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      return NextResponse.json({ response: "দুঃখিত, সমস্যা হচ্ছে। 01639590392 তে কল করুন।" });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "উত্তর দিতে পারছি না।";
    
    return NextResponse.json({ response: text });
  } catch (error) {
    return NextResponse.json({ response: "দুঃখিত, সমস্যা হচ্ছে। 01639590392 তে কল করুন।" });
  }
}
