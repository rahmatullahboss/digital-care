import { getD1Database } from "@/lib/db";
import { Post } from "@/lib/db";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { FaCalendar, FaArrowRight } from "react-icons/fa6";
import { getTranslations, getLocale } from "next-intl/server";

// Force dynamic rendering for D1 data
export const dynamic = "force-dynamic";

async function getPosts() {
  const db = await getD1Database();
  const { results } = await db
    .prepare("SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC")
    .all();
  return results as Post[];
}

export default async function BlogPage() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);
  const t = await getTranslations("BlogPage");
  const locale = await getLocale();

  return (
    <>
      <section className="hero-section relative py-16 md:py-24">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <SectionHeader
            kicker={t("kicker")}
            title={t("title")}
            description={t("description")}
            centered
          />
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="container mx-auto px-6 relative z-10">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">{t("noPosts")}</p>
            </div>
          ) : (
            <>
              {featuredPost && (
                <div className="mb-16">
                  <GlassCard className="overflow-hidden group">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div className="relative h-64 md:h-96 w-full overflow-hidden">
                        <Image
                          src={featuredPost.image_url || "/globe.svg"}
                          alt={featuredPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-8 md:p-12">
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                          <span className="flex items-center gap-2">
                            <FaCalendar className="text-teal-500" />
                            {new Date(featuredPost.created_at).toLocaleDateString(locale === "en" ? "en-US" : "bn-BD")}
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-4 group-hover:text-teal-600 transition-colors">
                          <Link href={`/blog/${featuredPost.slug}`}>
                            {featuredPost.title}
                          </Link>
                        </h2>
                        <p className="text-slate-600 mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        <Button href={`/blog/${featuredPost.slug}`} icon={<FaArrowRight />}>
                          {t("readDetails")}
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post) => (
                  <GlassCard key={post.id} className="overflow-hidden group flex flex-col">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={post.image_url || "/globe.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                        <span className="flex items-center gap-2">
                          <FaCalendar className="text-teal-500" />
                          {new Date(post.created_at).toLocaleDateString(locale === "en" ? "en-US" : "bn-BD")}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-slate-600 mb-6 line-clamp-3 text-sm flex-1">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:gap-3 transition-all"
                      >
                        {t("readMore")} <FaArrowRight />
                      </Link>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
