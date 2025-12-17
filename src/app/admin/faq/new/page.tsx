"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaFloppyDisk, FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NewFaqPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        order_index: 0,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/faq", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to create FAQ");

            router.push("/admin/faq");
            router.refresh();
        } catch (error) {
            console.error("Error creating FAQ:", error);
            alert("FAQ তৈরি করতে সমস্যা হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/faq" className="text-slate-400 hover:text-white">
                    <FaArrowLeft />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">নতুন প্রশ্ন</h1>
                    <p className="text-slate-400 mt-1">সচরাচর জিজ্ঞাসিত প্রশ্ন যোগ করুন</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 space-y-6">
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="md:col-span-3">
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                প্রশ্ন <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.question}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                                placeholder="যেমন: আপনাদের অফিস কোথায়?"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                অর্ডার ইনডেক্স
                            </label>
                            <input
                                type="number"
                                value={formData.order_index}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        order_index: parseInt(e.target.value),
                                    })
                                }
                                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            উত্তর <span className="text-red-400">*</span>
                        </label>
                        <textarea
                            value={formData.answer}
                            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                            rows={5}
                            className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none"
                            placeholder="প্রশ্নের উত্তর লিখুন..."
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/faq">
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
