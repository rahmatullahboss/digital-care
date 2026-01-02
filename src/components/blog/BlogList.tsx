"use client";

import { useState, useMemo, useRef } from "react";
import { type Post } from "@/lib/db";
import BlogCard from "./BlogCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface BlogListProps {
  posts: Post[];
  searchPlaceholder: string;
  noPostsMessage: string;
  clearSearchLabel: string;
}

export default function BlogList({ posts, searchPlaceholder, noPostsMessage, clearSearchLabel }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  useGSAP(() => {
    // Animate cards when filtering changes
    gsap.fromTo(
      ".blog-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
    );
  }, { dependencies: [filteredPosts], scope: containerRef });

  return (
    <div ref={containerRef} className="space-y-12">
      {/* Search Bar */}
      <div className="relative max-w-xl mx-auto mb-16">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <FaMagnifyingGlass />
        </div>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all backdrop-blur-sm"
        />
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/5">
          <div className="text-6xl mb-6">🔍</div>
          <p className="text-slate-400 text-xl font-medium">{noPostsMessage}</p>
          <button 
            onClick={() => setSearchQuery("")}
            className="mt-6 text-teal-500 hover:text-teal-400 font-medium underline underline-offset-4"
          >
            {clearSearchLabel}
          </button>
        </div>
      ) : (
        <>
          {/* Featured Post */}
          {featuredPost && (
            <div className="blog-card mb-16">
              <BlogCard post={featuredPost} featured />
            </div>
          )}

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <div key={post.id} className="blog-card h-full">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
