"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaFloppyDisk, FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import Button from "@/components/ui/Button";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function NewPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image_url: "",
        published: false,
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData((prev) => ({
            ...prev,
            title,
            slug: prev.slug || generateSlug(title), // Auto-generate slug if empty
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to create post");

            router.push("/admin/posts");
            router.refresh();
        } catch (error) {
            console.error("Error creating post:", error);
            alert("পোস্ট তৈরি করতে সমস্যা হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/posts" className="text-slate-400 hover:text-white">
                    <FaArrowLeft />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">নতুন পোস্ট</h1>
                    <p className="text-slate-400 mt-1">নতুন ব্লগ পোস্ট তৈরি করুন</p>
                </div>
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
                            onChange={handleTitleChange}
                            className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                            placeholder="পোস্টের শিরোনাম..."
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
                            onChange={(e) =>
                                setFormData({ ...formData, slug: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none font-mono text-sm"
                            placeholder="post-url-slug"
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
                            onChange={(e) =>
                                setFormData({ ...formData, excerpt: e.target.value })
                            }
                            rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none"
                            placeholder="পোস্টের সংক্ষিপ্ত বিবরণ..."
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
                            onChange={(e) =>
                                setFormData({ ...formData, image_url: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none font-mono text-sm"
                            placeholder="https://..."
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
                            onChange={(e) =>
                                setFormData({ ...formData, published: e.target.checked })
                            }
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
                    <Button type="submit" icon={<FaFloppyDisk />} disabled={loading}>
                        {loading ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
