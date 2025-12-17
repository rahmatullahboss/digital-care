import Image from "next/image";
import Link from "next/link";
import { FaWandMagicSparkles, FaMessage } from "react-icons/fa6";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

const blogPosts = [
  {
    slug: "digital-marketing-trends-2025",
    title: "ডিজিটাল মার্কেটিং এর ভবিষ্যৎ: ২০২৫ সালের সেরা ৫টি ট্রেন্ড",
    excerpt: "ডিজিটাল মার্কেটিং এর জগত প্রতিনিয়ত পরিবর্তনশীল। যা আজ কার্যকর, কাল তা পুরনো হয়ে যেতে পারে।",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1470&auto=format&fit=crop",
    date: "২৩ আগস্ট, ২০২৫",
    readTime: "৫ মিনিট পঠন",
    featured: true,
  },
  {
    slug: "small-business-online-success",
    title: "ছোট ব্যবসা অনলাইনে সফল করার ১০টি অব্যর্থ কৌশল",
    excerpt: "আজকের ডিজিটাল যুগে, একটি ছোট ব্যবসার সফলতা অনেকাংশে নির্ভর করে তার অনলাইন উপস্থিতির ওপর...",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e2775d2?q=80&w=1470&auto=format&fit=crop",
    date: "১৬ আগস্ট, ২০২৫",
    readTime: "৭ মিনিট পঠন",
  },
  {
    slug: "ai-chatbot-business-growth",
    title: "AI চ্যাটবট: আপনার ব্যবসার গ্রোথ ইঞ্জিন",
    excerpt: "আপনার ব্যবসার খরচ কমাতে চান? বিক্রি বাড়াতে চান? এবং গ্রাহকদের ২৪/৭ সাপোর্ট দিতে চান?",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    date: "১০ আগস্ট, ২০২৫",
    readTime: "৪ মিনিট পঠন",
  },
  {
    slug: "social-media-for-business",
    title: "ব্যবসা অনুযায়ী সোশ্যাল মিডিয়া: ফেসবুক, ইনস্টাগ্রাম নাকি লিংকডইন?",
    excerpt: "প্রতিটি ব্যবসাই চায় সোশ্যাল মিডিয়ার মাধ্যমে গ্রাহকদের কাছে পৌঁছাতে...",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1374&auto=format&fit=crop",
    date: "৫ আগস্ট, ২০২৫",
    readTime: "৬ মিনিট পঠন",
  },
];

export const metadata = {
  title: "আমাদের ব্লগ | ডিজিটাল কেয়ার সলিউশনস",
  description: "ডিজিটাল মার্কেটিং এবং ব্যবসার সর্বাধুনিক কৌশল সম্পর্কে আপডেট থাকুন",
};

export default function BlogPage() {
  const featuredPost = blogPosts.find((p) => p.featured);
  const otherPosts = blogPosts.filter((p) => !p.featured);

  return (
    <>
      {/* Hero */}
      <section className="hero-section relative py-20 md:py-32">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-teal-700 shadow-sm">
              আমাদের ব্লগ থেকে জানুন
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-slate-900">
              আমাদের ব্লগ থেকে জানুন
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              ডিজিটাল মার্কেটিং এবং ব্যবসার সর্বাধুনিক কৌশল সম্পর্কে আপডেট থাকুন।
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/services" icon={<FaWandMagicSparkles />}>
                সার্ভিসসমূহ
              </Button>
              <Button href="/#contact" variant="secondary" icon={<FaMessage />}>
                যোগাযোগ করুন
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-shell py-24">
        <div className="container mx-auto px-6 relative z-10">
          {/* Featured Post */}
          {featuredPost && (
            <GlassCard className="grid lg:grid-cols-2 gap-10 items-center p-10 mb-16">
              <div className="order-2 lg:order-1 space-y-4">
                <p className="text-teal-600 font-semibold">সর্বশেষ পোস্ট</p>
                <h2 className="text-3xl font-bold text-slate-900">{featuredPost.title}</h2>
                <p className="text-slate-600 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <Button href={`/blog/${featuredPost.slug}`}>পুরোটা পড়ুন →</Button>
              </div>
              <div className="order-1 lg:order-2 overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover"
                />
              </div>
            </GlassCard>
          )}

          {/* Other Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <GlassCard className="overflow-hidden h-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-semibold text-slate-900 group-hover:text-teal-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500 pt-4 border-t border-white/60">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
