"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus, FaPencil, FaTrash } from "react-icons/fa6";
import { Post } from "@/lib/db";
import Button from "@/components/ui/Button";
import AdminTable from "@/components/admin/AdminTable";

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
        return <div className="text-center p-8 font-admin text-slate-500">লোড হচ্ছে...</div>;
    }

    return (
        <div className="space-y-6 animate-fade-in-up">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                     <h1 className="text-3xl font-bold bg-gradient-to-r from-admin-primary to-admin-secondary bg-clip-text text-transparent font-admin">
                        ব্লগ পোস্ট
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-admin">
                        সব ব্লগ পোস্ট ম্যানেজ করুন
                    </p>
                </div>
                <Link href="/admin/posts/new">
                    <Button icon={<FaPlus />}>নতুন পোস্ট</Button>
                </Link>
            </div>

            <AdminTable
                data={posts}
                keyExtractor={(post) => post.id}
                emptyMessage="কোন পোস্ট পাওয়া যায়নি"
                columns={[
                    {
                        header: "শিরোনাম",
                        cell: (post) => (
                             <span className="font-medium text-slate-900 dark:text-white">
                                {post.title}
                            </span>
                        )
                    },
                    {
                        header: "Slug",
                        accessorKey: "slug",
                        className: "text-slate-500"
                    },
                    {
                        header: "স্ট্যাটাস",
                        cell: (post) => (
                             <span
                                className={`px-2.5 py-1 rounded-full text-xs font-medium ${post.published
                                        ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
                                    }`}
                            >
                                {post.published ? "প্রকাশিত" : "ড্রাফট"}
                            </span>
                        )
                    }
                ]}
                actions={(post) => (
                    <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/posts/${post.id}`}>
                            <button className="p-2 text-admin-primary hover:bg-admin-bg rounded-lg transition-colors">
                                <FaPencil />
                            </button>
                        </Link>
                        <button
                            onClick={() => deletePost(post.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                        >
                            <FaTrash />
                        </button>
                    </div>
                )}
            />
        </div>
    );
}
