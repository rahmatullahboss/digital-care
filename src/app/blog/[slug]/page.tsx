import { getD1Database } from "@/lib/db";
import { Post } from "@/lib/db";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FaCalendar, FaArrowLeft } from "react-icons/fa6";
import ReactMarkdown from "react-markdown";
import { getTranslations, getLocale } from "next-intl/server";

// Force dynamic rendering for D1 data
export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  const db = await getD1Database();
  return await db
    .prepare("SELECT * FROM posts WHERE slug = ? AND published = 1")
    .bind(slug)
    .first<Post>();
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  const t = await getTranslations("BlogPostPage");
  const locale = await getLocale();

  if (!post) {
    notFound();
  }

  return (
    <>
      <section className="hero-section relative py-16 md:py-24">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-teal-400 hover:text-white mb-8 transition-colors"
          >
            <FaArrowLeft /> {t("allPosts")}
          </Link>
          <SectionHeader
            kicker={t("kicker")}
            title={post.title}
            description=""
            centered
          />
          <div className="flex items-center justify-center gap-6 text-slate-400 mt-6">
            <span className="flex items-center gap-2">
              <FaCalendar className="text-teal-500" />
              {new Date(post.created_at).toLocaleDateString(locale === "en" ? "en-US" : "bn-BD")}
            </span>
          </div>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <GlassCard className="overflow-hidden p-0">
            <div className="relative h-64 md:h-96 w-full">
              <Image
                src={post.image_url || "/globe.svg"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 md:p-12">
              <article className="prose prose-invert prose-lg max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </article>
            </div>
          </GlassCard>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("ctaTitle")}
            </h3>
            <Button href="/#contact">{t("ctaBtn")}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
