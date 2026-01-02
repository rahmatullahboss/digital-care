import { getD1Database } from "@/lib/db";
import { Post } from "@/lib/db";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaCalendar, FaArrowLeft, FaClock } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getTranslations, getLocale } from "next-intl/server";
import ShareButtons from "@/components/blog/ShareButtons";
import BlogCard from "@/components/blog/BlogCard";

import { unstable_cache } from "next/cache";

// Force dynamic rendering for D1 data (required for now), but data will be cached
export const dynamic = "force-dynamic";

const getPost = unstable_cache(
  async (slug: string) => {
    const db = await getD1Database();
    return await db
      .prepare("SELECT * FROM posts WHERE slug = ? AND published = 1")
      .bind(slug)
      .first<Post>();
  },
  ['single-post'], // dynamic part 'slug' is automatically handled by the second arg of cache fn wrappers usually? No, for unstable_cache the key parts need to be unique.
  // Wait, unstable_cache signature is (fn, keys, options). The wrapper function receives arguments. The keys array is static + arguments? 
  // Actually, documentation says: "The key parts are combined with the arguments of the cached function to create a unique cache key." -> So ['single-post'] is fine, it will append slug.
  { revalidate: 86400, tags: ['posts'] }
);

const getRelatedPosts = unstable_cache(
  async (currentSlug: string) => {
    const db = await getD1Database();
    const { results } = await db
      .prepare("SELECT * FROM posts WHERE slug != ? AND published = 1 ORDER BY created_at DESC LIMIT 3")
      .bind(currentSlug)
      .all();
    return results as Post[];
  },
  ['related-posts'],
  { revalidate: 86400, tags: ['posts'] }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  const locale = await getLocale();

  if (!post) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  const title = locale === "en" ? (post.title_en || post.title) : post.title;
  const description = locale === "en" ? (post.excerpt_en || post.excerpt) : post.excerpt;
  const url = `https://digitalcare.site/blog/${post.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.created_at,
      images: post.image_url ? [{ url: post.image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.image_url ? [post.image_url] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  const relatedPosts = await getRelatedPosts(slug);
  const t = await getTranslations("BlogPostPage");
  const locale = await getLocale();

  if (!post) {
    notFound();
  }

  // Calculate read time (approximate)
  const words = post.content.split(/\s+/g).length;
  const readTimeMinutes = Math.ceil(words / 200);

  return (
    <>
      {/* Cinematic Header */}
      <div className="relative h-[60vh] min-h-[500px] w-full flex items-end">
        <Image
          src={post.image_url || "/globe.svg"}
          alt={post.title}
          fill
          className="object-cover brightness-[0.4] blur-sm scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30" />
        
        <div className="container mx-auto px-6 relative z-10 pb-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors backdrop-blur-md bg-white/5 py-2 px-4 rounded-full"
          >
            <FaArrowLeft /> {t("allPosts")}
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl">
            {locale === 'en' ? (post.title_en || post.title) : post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-300 font-medium">
            <span className="flex items-center gap-2">
              <FaCalendar className="text-teal-400" />
              {new Date(post.created_at).toLocaleDateString(locale === "en" ? "en-US" : "bn-BD", { dateStyle: 'long' })}
            </span>
            <span className="flex items-center gap-2">
              <FaClock className="text-teal-400" />
              {readTimeMinutes} {t("minRead")}
            </span>
          </div>
        </div>
      </div>

      <section className="section-shell pb-24 pt-10 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-6xl mx-auto">
            
            {/* Main Content */}
            <article className="prose prose-lg max-w-none 
              prose-headings:font-bold prose-headings:text-slate-900 
              prose-p:text-slate-700 prose-p:leading-relaxed
              prose-a:text-teal-600 prose-a:no-underline hover:prose-a:text-teal-700
              prose-strong:text-slate-900 prose-strong:font-semibold
              prose-blockquote:border-teal-500 prose-blockquote:bg-white/50 prose-blockquote:p-4 prose-blockquote:rounded-lg prose-blockquote:text-slate-700
              prose-li:text-slate-700
              prose-img:rounded-2xl prose-img:shadow-xl
              prose-code:text-teal-700 prose-code:bg-teal-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            ">
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {locale === 'en' ? (post.content_en || post.content) : post.content}
              </ReactMarkdown>

              {/* Share Section */}
              <div className="mt-16 pt-8 border-t border-white/10">
                 <ShareButtons title={post.title} url={`https://digitalcare.site/blog/${post.slug}`} />
              </div>
            </article>

            {/* Sidebar / Table of Contents could go here */}
            <aside className="hidden lg:block space-y-8">
                <div className="sticky top-24 p-6 rounded-2xl bg-white shadow-lg border border-slate-100 backdrop-blur-sm">
                   <h3 className="text-xl font-bold text-slate-900 mb-4">{t("ctaTitle")}</h3>
                   <p className="text-slate-600 mb-6 text-sm">{t("ctaDescription")}</p>
                   <Button href="/#contact" fullWidth>{t("ctaBtn")}</Button>
                </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">{t("relatedArticles")}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map(post => (
                 <div key={post.id} className="h-full">
                    <BlogCard post={post} />
                 </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
