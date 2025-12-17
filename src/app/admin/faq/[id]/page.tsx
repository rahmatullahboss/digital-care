"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { FaFloppyDisk, FaArrowLeft, FaTrash } from "react-icons/fa6";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        order_index: 0,
    });

    useEffect(() => {
        fetchFaq();
    }, [id]);

    const fetchFaq = async () => {
        try {
            const res = await fetch(`/api/admin/faq/${id}`);
            if (!res.ok) throw new Error("FAQ not found");
            const data = await res.json();
            setFormData({
                question: data.faq.question,
                answer: data.faq.answer,
                order_index: data.faq.order_index || 0,
            });
        } catch (error) {
            console.error("Error fetching FAQ:", error);
            alert("FAQ লোড করতে সমস্যা হয়েছে");
            router.push("/admin/faq");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/admin/faq/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update FAQ");

            router.push("/admin/faq");
            router.refresh();
        } catch (error) {
            console.error("Error updating FAQ:", error);
            alert("FAQ আপডেট করতে সমস্যা হয়েছে");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("আপনি কি নিশ্চিত যে আপনি এই প্রশ্নটি মুছে ফেলতে চান?")) return;

        try {
            const res = await fetch(`/api/admin/faq/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.push("/admin/faq");
                router.refresh();
            }
        } catch (error) {
            console.error("Error deleting FAQ:", error);
        }
    };

    if (loading) {
        return <div className="text-white">লোড হচ্ছে...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/faq" className="text-slate-400 hover:text-white">
                        <FaArrowLeft />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">প্রশ্ন এডিট করুন</h1>
                        <p className="text-slate-400 mt-1">FAQ আপডেট করুন</p>
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
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/faq">
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
