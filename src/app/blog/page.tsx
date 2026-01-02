import { getD1Database } from "@/lib/db";
import { Post } from "@/lib/db";
import SectionHeader from "@/components/ui/SectionHeader";
import BlogList from "@/components/blog/BlogList";
import { getTranslations } from "next-intl/server";

import { unstable_cache } from "next/cache";

// Force dynamic rendering for D1 access (required for now), but data will be cached
export const dynamic = "force-dynamic";

const getPosts = unstable_cache(
  async () => {
    const db = await getD1Database();
    const { results } = await db
      .prepare("SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC")
      .all();
    return results as Post[];
  },
  ['posts-list'],
  { revalidate: 86400, tags: ['posts'] }
);

export async function generateMetadata() {
  const t = await getTranslations("BlogPage");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

export default async function BlogPage() {
  const posts = await getPosts();
  const t = await getTranslations("BlogPage");

  return (
    <>
      <section className="hero-section relative py-20 md:py-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[128px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] translate-y-1/2 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <SectionHeader
            kicker={t("kicker")}
            title={t("title")}
            description={t("description")}
            centered
          />
        </div>
      </section>

      <section className="section-shell pb-32">
        <div className="container mx-auto px-6 relative z-10">
          <BlogList 
            posts={posts} 
            searchPlaceholder={t("searchPlaceholder")} 
            noPostsMessage={t("noPosts")}
            clearSearchLabel={t("clearSearch")}
          />
        </div>
      </section>
    </>
  );
}
