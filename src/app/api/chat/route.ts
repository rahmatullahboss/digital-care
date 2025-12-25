import { createGroq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { getD1Database } from "@/lib/db";

// Using default runtime for OpenNext compatibility
export const dynamic = "force-dynamic";

// Hardcoded site config for now as digital-care might not have it structured same way
const siteConfig = {
    name: "Digital Care Solutions",
    phone: "01639590392",
};

// Helper function to format currency
function formatPrice(amount: number | string): string {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  }

// Fetch real products (services/packages) from database
async function fetchProducts() {
  try {
    const db = await getD1Database();
    
    // Fetch packages (pricing) acting as products
    const packagesResult = await db.prepare(
        "SELECT id, name, price, period, description FROM pricing WHERE popular = 1 LIMIT 10"
    ).all();
    
    // Fetch services acting as categories/products
    const servicesResult = await db.prepare(
        "SELECT id, title, slug, tagline FROM services LIMIT 10"
    ).all();

    const packages = packagesResult.results.map((p: any) => ({
      id: p.id,
      name: p.name,
      slug: `package-${p.id}`, // Synthetic slug
      price: p.price,
      category: "Package",
      inStock: true,
      image: "/images/package_placeholder.png", // Placeholder
    }));
    
    const services = servicesResult.results.map((s: any) => ({
        id: s.id,
        name: s.title,
        slug: s.slug,
        price: 0, // Services might not have fixed price in this table context
        category: "Service",
        inStock: true,
        image: "/images/service_placeholder.png",
    }));

    return [...packages, ...services];
  } catch (error) {
    console.error("Error fetching products for chat:", error);
    // Return empty array if database fetch fails
    return [];
  }
}

function generateSystemPrompt(productList: string) {
  return `You are a helpful customer support assistant for "${siteConfig.name}".

LANGUAGE: Use Bengali when user writes in Bengali, otherwise English.
GREETING: Greet with "সালাম" or "আসসালামু আলাইকুম"

##MANDATORY PRODUCT FORMAT##
When showing ANY service or package, you MUST ALWAYS output it in this EXACT format:
[PRODUCT:slug:name:price:category:inStock:imageUrl]

Example output:
[PRODUCT:web-dev:Web Development:15000:Service:true:/images/web.jpg]

##AVAILABLE SERVICES/PACKAGES (USE ONLY THESE)##
${productList}

##RULES##
1. When user asks about services, packages, or pricing - show relevant items using the [PRODUCT:...] format
2. NEVER describe items in plain text if you can use the [PRODUCT:...] format
3. Pick relevant items from the list above
4. After showing items, ask if they want to know more details

##CONTACT INFO##
- Phone: ${siteConfig.phone}
- Email: rahmatullahzisan@gmail.com
- Address: ডিকেপি রোড, বরগুনা`;
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  // Fetch real products from database
  const realProducts = await fetchProducts();
  
  const productListStr = realProducts.length > 0
    ? realProducts
         .map(
          (p) =>
            `- SLUG:${p.slug} | ${p.name} | ${p.price > 0 ? formatPrice(p.price) : 'Custom Price'} | ${p.category} | ${p.image}`
        )
        .join("\n")
    : "No specific packages available at the moment.";

  const systemPrompt = generateSystemPrompt(productListStr);
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
