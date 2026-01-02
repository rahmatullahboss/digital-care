import Link from "next/link";
import Image from "next/image";
import { FaCalendar, FaArrowRight } from "react-icons/fa6";
import { type Post } from "@/lib/db";
import { useLocale, useTranslations } from "next-intl";

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const locale = useLocale();
  const t = useTranslations("BlogCard");
  const dateStr = new Date(post.created_at).toLocaleDateString(
    locale === "en" ? "en-US" : "bn-BD", 
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  if (featured) {
    return (
      <div className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-slate-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
        <div className="grid md:grid-cols-2 gap-0 h-full">
          <div className="relative h-64 md:h-full min-h-[300px] w-full overflow-hidden">
            <Image
              src={post.image_url || "/globe.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-teal-600 text-sm font-medium mb-4">
              <FaCalendar />
              <span>{dateStr}</span>
            </div>
            
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight group-hover:text-teal-600 transition-colors duration-300">
                {post.title}
              </h2>
            </Link>
            
            <p className="text-slate-600 text-lg mb-8 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
            
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-white font-semibold bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-full transition-all w-fit group/btn shadow-md hover:shadow-lg"
            >
              {t("readArticle")} 
              <FaArrowRight className="transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex flex-col h-full bg-white shadow-md border border-slate-100 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={post.image_url || "/globe.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs text-slate-900 font-medium border border-slate-200 shadow-sm">
            {t("articleBadge")}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-teal-600 text-xs mb-3 font-medium">
          <FaCalendar />
          <span>{dateStr}</span>
        </div>

        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-teal-600 transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
          {post.excerpt}
        </p>
        
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium text-sm mt-auto group/link"
        >
          {t("readMore")} 
          <FaArrowRight className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
