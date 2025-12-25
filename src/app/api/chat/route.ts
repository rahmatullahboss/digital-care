import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type UIMessage } from "ai";
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

// Fetch all website content from database for AI context
async function fetchWebsiteContent() {
  try {
    const db = await getD1Database();
    
    // Fetch services
    const servicesResult = await db.prepare(
        "SELECT title, tagline, description, features, benefits FROM services"
    ).all();
    
    // Fetch pricing packages
    const pricingResult = await db.prepare(
        "SELECT name, price, period, description, features FROM pricing ORDER BY order_index"
    ).all();

    // Fetch FAQ - this contains a lot of useful info about the company
    const faqResult = await db.prepare(
        "SELECT question, answer FROM faq ORDER BY order_index"
    ).all();

    // Fetch active jobs/career positions
    const jobsResult = await db.prepare(
        "SELECT title, department, type, location, description, responsibilities, requirements, salary_range FROM jobs WHERE is_active = 1 ORDER BY order_index"
    ).all();

    return {
      services: servicesResult.results as { title: string; tagline?: string; description?: string; features?: string; benefits?: string }[],
      packages: pricingResult.results as { name: string; price: string; period: string; description?: string; features?: string }[],
      faqs: faqResult.results as { question: string; answer: string }[],
      jobs: jobsResult.results as { title: string; department?: string; type?: string; location?: string; description?: string; responsibilities?: string; requirements?: string; salary_range?: string }[],
    };
  } catch (error) {
    console.error("Error fetching website content for chat:", error);
    return { services: [], packages: [], faqs: [], jobs: [] };
  }
}

function generateSystemPrompt(
  services: { title: string; tagline?: string; description?: string; features?: string; benefits?: string }[],
  packages: { name: string; price: string; period: string; description?: string; features?: string }[],
  faqs: { question: string; answer: string }[],
  jobs: { title: string; department?: string; type?: string; location?: string; description?: string; responsibilities?: string; requirements?: string; salary_range?: string }[]
) {
  const servicesList = services.length > 0
    ? services.map(s => `• ${s.title}: ${s.tagline || s.description?.substring(0, 100) || ''}`).join('\n')
    : 'Services data not available';
    
  const packagesList = packages.length > 0
    ? packages.map(p => `• ${p.name}: ৳${p.price}/${p.period} - ${p.description || ''}`).join('\n')
    : 'Packages data not available';

  const faqList = faqs.length > 0
    ? faqs.map(f => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')
    : 'FAQ data not available';

  const jobsList = jobs.length > 0
    ? jobs.map(j => {
        let jobInfo = `• **${j.title}**\n  - বিভাগ: ${j.department || 'N/A'}\n  - ধরন: ${j.type || 'N/A'}\n  - লোকেশন: ${j.location || 'N/A'}\n  - বিবরণ: ${j.description || ''}`;
        if (j.responsibilities) {
          try {
            const resp = JSON.parse(j.responsibilities);
            jobInfo += `\n  - দায়িত্ব: ${resp.join(', ')}`;
          } catch { /* ignore */ }
        }
        if (j.requirements) {
          try {
            const req = JSON.parse(j.requirements);
            jobInfo += `\n  - যোগ্যতা: ${req.join(', ')}`;
          } catch { /* ignore */ }
        }
        if (j.salary_range) {
          jobInfo += `\n  - বেতন: ${j.salary_range}`;
        }
        return jobInfo;
      }).join('\n\n')
    : 'বর্তমানে কোন পজিশন খোলা নেই।';

  return `## CRITICAL INSTRUCTION - READ FIRST
You are STRICTLY LIMITED to the information provided in this prompt. 
YOU MUST NOT invent, guess, or make up ANY information.
If information is not explicitly provided below, say: "এই বিষয়ে আমার কাছে সঠিক তথ্য নেই। দয়া করে ${siteConfig.phone} নম্বরে কল করুন।"

You are a customer support assistant for "${siteConfig.name}" (${siteConfig.nameEn}).
We are a digital marketing and web development agency in Bangladesh.

## YOUR PERSONALITY
- Be warm, friendly, and professional
- Use "আপনি" (not "তুমি") for respect
- Start with "আসসালামু আলাইকুম" or "সালাম" for Bengali users
- Be genuinely helpful and caring
- Ask clarifying questions to understand customer needs
- Never be pushy or salesy - focus on helping

## LANGUAGE RULES (VERY IMPORTANT - FOLLOW STRICTLY)
- ALWAYS respond in the SAME language the user uses
- If the user writes in Bengali/Bangla → respond in Bengali
- If the user writes in English → respond in English
- If the user writes in Banglish (Bengali in English letters) → respond in Bengali
- NEVER default to one language - match the user's language exactly
- For Bengali users only: Use "আপনি" (not "তুমি") and start with "আসসালামু আলাইকুম"

## OUR SERVICES
${servicesList}

## OUR PACKAGES
${packagesList}

## FREQUENTLY ASKED QUESTIONS (Company Info from Database)
${faqList}

## CAREER OPPORTUNITIES (From Database)
${jobsList}

**How to Apply:**
- Visit our Careers page: digitalcare.site/careers
- Or send CV to: ${siteConfig.email}
- Or message on WhatsApp: ${siteConfig.whatsapp}

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
- **Jobs/Career/Work**: Direct them to Careers page or share contact info

## CONTACT INFORMATION (Always provide when relevant)
- 📞 Phone: ${siteConfig.phone}
- 💬 WhatsApp: ${siteConfig.whatsapp}
- ✉️ Email: ${siteConfig.email}
- 📍 Address: ${siteConfig.address}
- ⏰ Available: সকাল ৯টা - রাত ৯টা (9 AM - 9 PM)
- 🌐 Careers: digitalcare.site/careers

## IMPORTANT RULES (MUST FOLLOW - NO EXCEPTIONS)
1. **NEVER make up or hallucinate information** - Only provide information that exists in this prompt
2. **If you don't know something, ADMIT IT honestly** - Say "এই বিষয়ে আমার কাছে তথ্য নেই" or "I don't have this information"
3. **When unsure, always direct to human contact** - Provide phone number ${siteConfig.phone} or WhatsApp ${siteConfig.whatsapp}
4. DO NOT use any special product formatting like [PRODUCT:...]
5. Respond in natural, conversational language
6. Only use information from the FAQ, Services, Packages, and Jobs sections provided above
7. For questions outside your knowledge, say: "এই বিষয়ে সঠিক তথ্য দিতে আমাকে আমাদের টিমের সাথে কথা বলতে হবে। দয়া করে ${siteConfig.phone} নম্বরে কল করুন।"
8. NEVER guess prices, timelines, or technical details that are not provided
9. It's better to say "I don't know" than to give wrong information

## EXAMPLE CONVERSATIONS
User: "আমি একটা ওয়েবসাইট বানাতে চাই"
You: "আসসালামু আলাইকুম! 😊 ওয়েবসাইট বানানোর কথা ভাবছেন, চমৎকার! আপনার ব্যবসা সম্পর্কে একটু জানতে চাই - কী ধরনের ব্যবসা আপনার? এবং ওয়েবসাইটে কী কী ফিচার চাইছেন?"

User: "price koto?"
You: "আমাদের ওয়েবসাইট প্যাকেজ শুরু হয় ৳১০,০০০ থেকে। কিন্তু সঠিক দাম নির্ভর করবে আপনার প্রয়োজনের উপর। একটু বলুন কী ধরনের ফিচার লাগবে - তাহলে সঠিক প্যাকেজ সাজেস্ট করতে পারব!"

User: "job lagbe" or "আমি কাজ করতে চাই"
You: "আমাদের Careers পেজে বর্তমান সব পজিশন দেখতে পাবেন: digitalcare.site/careers 🎉 আগ্রহী হলে সেখানে আবেদন করতে পারেন, অথবা সরাসরি CV পাঠাতে পারেন: ${siteConfig.email}"`;
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // Fetch all website content from database for context
  const { services, packages, faqs, jobs } = await fetchWebsiteContent();
  
  const systemPrompt = generateSystemPrompt(services, packages, faqs, jobs);
  
  // Convert UIMessages to simple format that OpenRouter understands
  // The AI SDK v6 convertToModelMessages creates complex parts that OpenRouter doesn't support
  const simpleMessages = messages.map((msg) => {
    const textContent = msg.parts
      .filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("");
    return {
      role: msg.role as "user" | "assistant",
      content: textContent,
    };
  });

  const openRouterKey = process.env.OPENROUTER_API_KEY;

  if (!openRouterKey) {
    return new Response(
      JSON.stringify({
        error: "Chat service unavailable. OPENROUTER_API_KEY not configured.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // Log request for debugging
  console.log(`Chat API called with ${messages.length} messages`);
  
  // Use OpenRouter via OpenAI-compatible API with required headers
  const openrouter = createOpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: openRouterKey,
    headers: {
      "HTTP-Referer": "https://digitalcare.site",
      "X-Title": "Digital Care Solutions",
    },
  });

  try {
    const result = streamText({
      model: openrouter("xiaomi/mimo-v2-flash:free"),
      system: systemPrompt,
      messages: simpleMessages,
      temperature: 0.3,
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("OpenRouter API error:", error);
    return new Response(
      JSON.stringify({ error: "Chat service error. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

