"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { FaFloppyDisk, FaArrowLeft, FaTrash } from "react-icons/fa6";
import Link from "next/link";
import Button from "@/components/ui/Button";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image_url: "",
        published: false,
    });

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            const res = await fetch(`/api/admin/posts/${id}`);
            if (!res.ok) throw new Error("Post not found");
            const data = await res.json();
            setFormData({
                title: data.post.title,
                slug: data.post.slug,
                excerpt: data.post.excerpt || "",
                content: data.post.content,
                image_url: data.post.image_url || "",
                published: !!data.post.published,
            });
        } catch (error) {
            console.error("Error fetching post:", error);
            alert("পোস্ট লোড করতে সমস্যা হয়েছে");
            router.push("/admin/posts");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/admin/posts/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update post");

            router.push("/admin/posts");
            router.refresh();
        } catch (error) {
            console.error("Error updating post:", error);
            alert("পোস্ট আপডেট করতে সমস্যা হয়েছে");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("আপনি কি নিশ্চিত যে আপনি এই পোস্টটি মুছে ফেলতে চান?")) return;

        try {
            const res = await fetch(`/api/admin/posts/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.push("/admin/posts");
                router.refresh();
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (loading) {
        return <div className="text-white">লোড হচ্ছে...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/posts" className="text-slate-400 hover:text-white">
                        <FaArrowLeft />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">পোস্ট এডিট করুন</h1>
                        <p className="text-slate-400 mt-1">ব্লগ পোস্ট আপডেট করুন</p>
                    </div>
                </div>
                <button
                    onClick={handleDelete}
                    className="text-red-400 hover:text-red-300 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/10 transition-colors"
                >
                    <FaTrash /> মুছে ফেলুন
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            শিরোনাম <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                            required
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Slug (URL) <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none font-mono text-sm"
                            required
                        />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            সংক্ষিপ্ত বিবরণ <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none"
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            ফিচার্ড ইমেজ URL
                        </label>
                        <input
                            type="url"
                            value={formData.image_url}
                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none font-mono text-sm"
                        />
                    </div>

                    {/* Content Editor */}
                    <RichTextEditor
                        label="মূল কন্টেন্ট"
                        value={formData.content}
                        onChange={(content) => setFormData({ ...formData, content })}
                        required
                    />

                    {/* Status */}
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-slate-600">
                        <input
                            type="checkbox"
                            id="published"
                            checked={formData.published}
                            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                            className="w-5 h-5 rounded border-slate-500 text-teal-500 focus:ring-teal-500/20 bg-transparent"
                        />
                        <label htmlFor="published" className="text-white cursor-pointer select-none">
                            পোস্টটি প্রকাশ করুন (Publish Now)
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/posts">
                        <Button variant="outline">বাতিল</Button>
                    </Link>
                    <Button type="submit" icon={<FaFloppyDisk />} disabled={saving}>
                        {saving ? "সেভ হচ্ছে..." : "আপডেট করুন"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
