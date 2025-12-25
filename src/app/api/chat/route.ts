import { createGroq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { getD1Database } from "@/lib/db";

// Using default runtime for OpenNext compatibility
export const dynamic = "force-dynamic";

// Site configuration
const siteConfig = {
    name: "ডিজিটাল কেয়ার সলিউশনস",
    nameEn: "Digital Care Solutions",
    phone: "01570260118",
    whatsapp: "+8801570260118",
    email: "rahmatullahzisan@gmail.com",
    address: "ডিকেপি রোড, বরগুনা",
    facebookPageId: "digitalcaresolutions",
};

// Fetch services from database for AI context
async function fetchServices() {
  try {
    const db = await getD1Database();
    
    // Fetch services
    const servicesResult = await db.prepare(
        "SELECT title, tagline, description FROM services LIMIT 10"
    ).all();
    
    // Fetch pricing packages
    const pricingResult = await db.prepare(
        "SELECT name, price, period, description, features FROM pricing LIMIT 10"
    ).all();

    return {
      services: servicesResult.results as { title: string; tagline?: string; description?: string }[],
      packages: pricingResult.results as { name: string; price: number; period: string; description?: string }[],
    };
  } catch (error) {
    console.error("Error fetching services for chat:", error);
    return { services: [], packages: [] };
  }
}

function generateSystemPrompt(
  services: { title: string; tagline?: string; description?: string }[],
  packages: { name: string; price: number; period: string; description?: string }[]
) {
  const servicesList = services.length > 0
    ? services.map(s => `• ${s.title}: ${s.tagline || s.description?.substring(0, 100) || ''}`).join('\n')
    : 'Services data not available';
    
  const packagesList = packages.length > 0
    ? packages.map(p => `• ${p.name}: ৳${p.price}/${p.period} - ${p.description || ''}`).join('\n')
    : 'Packages data not available';

  return `You are a friendly and helpful customer support assistant for "${siteConfig.name}" (${siteConfig.nameEn}).
We are a digital marketing and web development agency in Bangladesh.

## YOUR PERSONALITY
- Be warm, friendly, and professional
- Use "আপনি" (not "তুমি") for respect
- Start with "আসসালামু আলাইকুম" or "সালাম" for Bengali users
- Be genuinely helpful and caring
- Ask clarifying questions to understand customer needs
- Never be pushy or salesy - focus on helping

## LANGUAGE RULES
- If the user writes in Bengali, respond in Bengali
- If the user writes in English, respond in English
- Mix is okay based on user's preference

## OUR SERVICES
${servicesList}

## OUR PACKAGES
${packagesList}

## HOW TO HELP CUSTOMERS
1. **Understand their needs first** - Ask what problem they're trying to solve
2. **Listen carefully** - Don't assume what they want
3. **Explain our services** - In simple, clear terms
4. **Give honest advice** - Even if it means recommending something smaller
5. **Be transparent about pricing** - No hidden costs
6. **Offer free consultation** - We provide free strategy sessions

## WHEN CUSTOMER ASKS ABOUT:
- **Website/Web Development**: Ask about their business type, features needed, budget
- **Mobile App**: Ask about platform preference (Android/iOS/both), features
- **Digital Marketing**: Ask about their goals, current challenges, budget
- **AI Chatbot**: Explain how it can help their business 24/7
- **Facebook Marketing**: Ask about their products/services, target audience

## CONTACT INFORMATION (Always provide when relevant)
- 📞 Phone: ${siteConfig.phone}
- 💬 WhatsApp: ${siteConfig.whatsapp}
- ✉️ Email: ${siteConfig.email}
- 📍 Address: ${siteConfig.address}
- ⏰ Available: সকাল ৯টা - রাত ৯টা (9 AM - 9 PM)

## IMPORTANT RULES
1. DO NOT use any special product formatting like [PRODUCT:...]
2. Respond in natural, conversational language
3. If you don't know something, say so and offer to connect them with a human
4. For complex queries, encourage them to call or schedule a meeting
5. Always be helpful, even if they're just asking general questions

## EXAMPLE CONVERSATIONS
User: "আমি একটা ওয়েবসাইট বানাতে চাই"
You: "আসসালামু আলাইকুম! 😊 ওয়েবসাইট বানানোর কথা ভাবছেন, চমৎকার! আপনার ব্যবসা সম্পর্কে একটু জানতে চাই - কী ধরনের ব্যবসা আপনার? এবং ওয়েবসাইটে কী কী ফিচার চাইছেন?"

User: "price koto?"
You: "আমাদের ওয়েবসাইট প্যাকেজ শুরু হয় ৳১০,০০০ থেকে। কিন্তু সঠিক দাম নির্ভর করবে আপনার প্রয়োজনের উপর। একটু বলুন কী ধরনের ফিচার লাগবে - তাহলে সঠিক প্যাকেজ সাজেস্ট করতে পারব!"`;
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // Fetch services from database for context
  const { services, packages } = await fetchServices();
  
  const systemPrompt = generateSystemPrompt(services, packages);
  const enhancedMessages = await convertToModelMessages(messages);

  const groqKey = process.env.GROQ_API_KEY;

  if (!groqKey) {
    return new Response(
      JSON.stringify({
        error: "Chat service unavailable. GROQ_API_KEY not configured.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const groq = createGroq({ apiKey: groqKey });
    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      messages: enhancedMessages,
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Groq API error:", error);
    return new Response(
      JSON.stringify({ error: "Chat service error. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

