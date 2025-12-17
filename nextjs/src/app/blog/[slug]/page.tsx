import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaClock, FaCalendar } from "react-icons/fa6";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

const blogPosts: Record<string, { title: string; excerpt: string; image: string; date: string; readTime: string; content: string[] }> = {
  "digital-marketing-trends-2025": {
    title: "ডিজিটাল মার্কেটিং এর ভবিষ্যৎ: ২০২৫ সালের সেরা ৫টি ট্রেন্ড",
    excerpt: "ডিজিটাল মার্কেটিং এর জগত প্রতিনিয়ত পরিবর্তনশীল। যা আজ কার্যকর, কাল তা পুরনো হয়ে যেতে পারে।",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1470&auto=format&fit=crop",
    date: "২৩ আগস্ট, ২০২৫",
    readTime: "৫ মিনিট পঠন",
    content: [
      "ডিজিটাল মার্কেটিং এর জগত প্রতিনিয়ত রূপান্তরিত হচ্ছে। প্রযুক্তির দ্রুত উন্নতি এবং ভোক্তাদের আচরণের পরিবর্তনের সাথে তাল মিলিয়ে চলতে মার্কেটারদের সবসময় আপডেট থাকতে হয়।",
      "১. AI-চালিত পার্সোনালাইজেশন: কৃত্রিম বুদ্ধিমত্তা ২০২৫ সালে মার্কেটিংয়ের কেন্দ্রবিন্দুতে থাকবে। AI এর মাধ্যমে প্রতিটি গ্রাহকের জন্য কাস্টমাইজড কনটেন্ট এবং অফার তৈরি করা সম্ভব হবে।",
      "২. ভয়েস সার্চ অপ্টিমাইজেশন: স্মার্ট স্পিকার এবং ভয়েস অ্যাসিস্ট্যান্টের ব্যবহার বাড়ার সাথে সাথে ভয়েস সার্চ অপ্টিমাইজেশন অপরিহার্য হয়ে উঠবে।",
      "৩. শর্ট-ফর্ম ভিডিও কনটেন্ট: TikTok এবং Reels এর জনপ্রিয়তা অব্যাহত থাকবে। ব্র্যান্ডগুলোকে ১৫-৬০ সেকেন্ডের আকর্ষণীয় ভিডিও তৈরিতে মনোযোগ দিতে হবে।",
      "৪. কথোপকথনমূলক মার্কেটিং: চ্যাটবট এবং AI এজেন্টদের মাধ্যমে রিয়েল-টাইম গ্রাহক যোগাযোগ আরও গুরুত্বপূর্ণ হবে।",
      "৫. প্রাইভেসি-ফার্স্ট মার্কেটিং: থার্ড-পার্টি কুকিজের সমাপ্তির সাথে সাথে ফার্স্ট-পার্টি ডেটা এবং প্রাইভেসি-সচেতন মার্কেটিং কৌশল জরুরি হয়ে উঠবে।",
    ],
  },
  "ai-chatbot-business-growth": {
    title: "AI চ্যাটবট: আপনার ব্যবসার গ্রোথ ইঞ্জিন",
    excerpt: "আপনার ব্যবসার খরচ কমাতে চান? বিক্রি বাড়াতে চান? এবং গ্রাহকদের ২৪/৭ সাপোর্ট দিতে চান?",
    image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    date: "১০ আগস্ট, ২০২৫",
    readTime: "৪ মিনিট পঠন",
    content: [
      "AI চ্যাটবট এখন শুধু একটি প্রযুক্তি নয়, এটি ব্যবসার বৃদ্ধির একটি শক্তিশালী হাতিয়ার। সঠিকভাবে ব্যবহার করলে এটি আপনার ব্যবসাকে নতুন উচ্চতায় নিয়ে যেতে পারে।",
      "২৪/৭ গ্রাহক সেবা: AI চ্যাটবট দিনের যেকোনো সময় গ্রাহকদের প্রশ্নের উত্তর দিতে পারে। এতে গ্রাহক সন্তুষ্টি বাড়ে এবং কোনো লিড হারানোর সম্ভাবনা কমে।",
      "খরচ সাশ্রয়: একটি AI চ্যাটবট একই সাথে শত শত গ্রাহকের সাথে কথা বলতে পারে। এতে কাস্টমার সার্ভিস টিমের উপর চাপ কমে এবং অপারেশনাল খরচ ৬০% পর্যন্ত কমতে পারে।",
      "লিড কোয়ালিফিকেশন: চ্যাটবট স্বয়ংক্রিয়ভাবে লিড কোয়ালিফাই করতে পারে এবং শুধুমাত্র যোগ্য লিডগুলো সেলস টিমের কাছে পাঠাতে পারে।",
      "বিক্রয় বৃদ্ধি: প্রোডাক্ট রেকমেন্ডেশন, প্রমোশনাল অফার এবং আপসেলিং এর মাধ্যমে চ্যাটবট সরাসরি বিক্রয় বাড়াতে সাহায্য করে।",
    ],
  },
  "social-media-for-business": {
    title: "ব্যবসা অনুযায়ী সোশ্যাল মিডিয়া: ফেসবুক, ইনস্টাগ্রাম নাকি লিংকডইন?",
    excerpt: "প্রতিটি ব্যবসাই চায় সোশ্যাল মিডিয়ার মাধ্যমে গ্রাহকদের কাছে পৌঁছাতে।",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1374&auto=format&fit=crop",
    date: "৫ আগস্ট, ২০২৫",
    readTime: "৬ মিনিট পঠন",
    content: [
      "সব সোশ্যাল মিডিয়া প্ল্যাটফর্ম সব ব্যবসার জন্য উপযুক্ত নয়। আপনার টার্গেট অডিয়েন্স এবং ব্যবসার ধরন অনুযায়ী সঠিক প্ল্যাটফর্ম বেছে নেওয়া গুরুত্বপূর্ণ।",
      "ফেসবুক: বাংলাদেশে সবচেয়ে জনপ্রিয় প্ল্যাটফর্ম। B2C ব্যবসা, লোকাল সার্ভিস এবং ই-কমার্সের জন্য আদর্শ। ফেসবুক অ্যাডস এবং মেসেঞ্জার মার্কেটিং এ সুযোগ অফুরন্ত।",
      "ইনস্টাগ্রাম: ভিজুয়াল প্রোডাক্ট বিক্রি করে এমন ব্যবসার জন্য চমৎকার। ফ্যাশন, ফুড, বিউটি এবং লাইফস্টাইল ব্র্যান্ডগুলো এখানে সফল হয়।",
      "লিংকডইন: B2B ব্যবসা, প্রফেশনাল সার্ভিস এবং রিক্রুটমেন্টের জন্য সেরা। সিনিয়র প্রফেশনালদের কাছে পৌঁছাতে চাইলে এটি অপরিহার্য।",
      "টিকটক: তরুণ অডিয়েন্সকে টার্গেট করে এমন ব্র্যান্ডগুলোর জন্য দ্রুত বর্ধনশীল প্ল্যাটফর্ম। অর্গানিক রিচ এখনও অনেক বেশি।",
    ],
  },
  "small-business-online-success": {
    title: "ছোট ব্যবসা অনলাইনে সফল করার ১০টি অব্যর্থ কৌশল",
    excerpt: "আজকের ডিজিটাল যুগে, একটি ছোট ব্যবসার সফলতা অনেকাংশে নির্ভর করে তার অনলাইন উপস্থিতির ওপর।",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e2775d2?q=80&w=1470&auto=format&fit=crop",
    date: "১৬ আগস্ট, ২০২৫",
    readTime: "৭ মিনিট পঠন",
    content: [
      "ছোট ব্যবসাগুলোর জন্য অনলাইন উপস্থিতি এখন বিলাসিতা নয়, প্রয়োজনীয়তা। কিন্তু সঠিক কৌশল ছাড়া অনলাইনে সফল হওয়া কঠিন।",
      "১. প্রফেশনাল ওয়েবসাইট: আপনার ব্যবসার জন্য একটি প্রফেশনাল, মোবাইল-ফ্রেন্ডলি ওয়েবসাইট অপরিহার্য। এটি আপনার ডিজিটাল ঠিকানা।",
      "২. গুগল মাই বিজনেস: লোকাল সার্চে দেখা যেতে চাইলে গুগল মাই বিজনেস প্রোফাইল সম্পূর্ণ করুন এবং নিয়মিত আপডেট রাখুন।",
      "৩. সোশ্যাল মিডিয়া প্রেজেন্স: আপনার টার্গেট অডিয়েন্স যেখানে থাকে সেখানে উপস্থিত থাকুন। নিয়মিত পোস্ট করুন এবং এনগেজ করুন।",
      "৪. কনটেন্ট মার্কেটিং: মূল্যবান কনটেন্ট তৈরি করুন যা আপনার অডিয়েন্সের সমস্যা সমাধান করে। ব্লগ, ভিডিও, ইনফোগ্রাফিক ব্যবহার করুন।",
      "৫. অটোমেশন: সময় বাঁচাতে এবং গ্রাহক অভিজ্ঞতা উন্নত করতে অটোমেশন টুল ব্যবহার করুন। চ্যাটবট, ইমেইল অটোমেশন সেটাপ করুন।",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section className="hero-section relative py-16 md:py-24">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6">
              <FaArrowLeft /> সব পোস্ট দেখুন
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-slate-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-2"><FaCalendar /> {post.date}</span>
              <span className="flex items-center gap-2"><FaClock /> {post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-shell py-16">
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <GlassCard className="overflow-hidden">
            <Image src={post.image} alt={post.title} width={900} height={400} className="w-full h-64 md:h-96 object-cover" />
            <div className="p-8 md:p-12 space-y-6">
              {post.content.map((paragraph, index) => (
                <p key={index} className="text-slate-600 leading-relaxed text-lg">{paragraph}</p>
              ))}
            </div>
          </GlassCard>
          <div className="mt-8 text-center">
            <Button href="/#contact">বিনামূল্যে পরামর্শ নিন</Button>
          </div>
        </div>
      </section>
    </>
  );
}
