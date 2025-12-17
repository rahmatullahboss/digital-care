"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus, FaPencil, FaTrash } from "react-icons/fa6";
import { Post } from "@/lib/db";
import Button from "@/components/ui/Button";

export default function BlogPostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/admin/posts");
            const data = await res.json();
            if (data.posts) {
                setPosts(data.posts);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async (id: string) => {
        if (!confirm("আপনি কি নিশ্চিত যে আপনি এই পোস্টটি মুছে ফেলতে চান?")) return;

        try {
            const res = await fetch(`/api/admin/posts/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setPosts(posts.filter((post) => post.id !== id));
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (loading) {
        return <div className="text-white">লোড হচ্ছে...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">ব্লগ পোস্ট</h1>
                    <p className="text-slate-400 mt-1">সব ব্লগ পোস্ট ম্যানেজ করুন</p>
                </div>
                <Link href="/admin/posts/new">
                    <Button icon={<FaPlus />}>নতুন পোস্ট</Button>
                </Link>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-800 text-slate-400">
                        <tr>
                            <th className="p-4">শিরোনাম</th>
                            <th className="p-4">Slug</th>
                            <th className="p-4">স্ট্যাটাস</th>
                            <th className="p-4 text-right">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {posts.map((post) => (
                            <tr key={post.id} className="text-white hover:bg-slate-800/30">
                                <td className="p-4 font-medium">{post.title}</td>
                                <td className="p-4 text-slate-400">{post.slug}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${post.published
                                                ? "bg-green-500/20 text-green-400"
                                                : "bg-yellow-500/20 text-yellow-400"
                                            }`}
                                    >
                                        {post.published ? "প্রকাশিত" : "ড্রাফট"}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <Link href={`/admin/posts/${post.id}`}>
                                        <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                                            <FaPencil />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => deletePost(post.id)}
                                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-slate-500">
                                    কোন পোস্ট পাওয়া যায়নি
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
