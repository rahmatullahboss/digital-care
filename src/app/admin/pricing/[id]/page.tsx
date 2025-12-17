"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { FaFloppyDisk, FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa6";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function EditPricingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [features, setFeatures] = useState<string[]>([]);
    const [newFeature, setNewFeature] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        period: "",
        description: "",
        popular: false,
        order_index: 0,
    });

    useEffect(() => {
        fetchPackage();
    }, [id]);

    const fetchPackage = async () => {
        try {
            const res = await fetch(`/api/admin/pricing/${id}`);
            if (!res.ok) throw new Error("Package not found");
            const data = await res.json();
            setFormData({
                name: data.package.name,
                price: data.package.price,
                period: data.package.period || "",
                description: data.package.description || "",
                popular: !!data.package.popular,
                order_index: data.package.order_index || 0,
            });
            setFeatures(data.package.features || []);
        } catch (error) {
            console.error("Error fetching package:", error);
            alert("প্যাকেজ লোড করতে সমস্যা হয়েছে");
            router.push("/admin/pricing");
        } finally {
            setLoading(false);
        }
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setFeatures([...features, newFeature.trim()]);
            setNewFeature("");
        }
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch(`/api/admin/pricing/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    features,
                }),
            });

            if (!res.ok) throw new Error("Failed to update package");

            router.push("/admin/pricing");
            router.refresh();
        } catch (error) {
            console.error("Error updating package:", error);
            alert("প্যাকেজ আপডেট করতে সমস্যা হয়েছে");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("আপনি কি নিশ্চিত যে আপনি এই প্যাকেজটি মুছে ফেলতে চান?")) return;

        try {
            const res = await fetch(`/api/admin/pricing/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.push("/admin/pricing");
                router.refresh();
            }
        } catch (error) {
            console.error("Error deleting package:", error);
        }
    };

    if (loading) {
        return <div className="text-white">লোড হচ্ছে...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin/pricing" className="text-slate-400 hover:text-white">
                        <FaArrowLeft />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">প্যাকেজ এডিট করুন</h1>
                        <p className="text-slate-400 mt-1">প্রাইসিং প্ল্যান আপডেট করুন</p>
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
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                প্যাকেজ নাম <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                দাম (টাকায়) <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none font-mono"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                সময়কাল (Period)
                            </label>
                            <input
                                type="text"
                                value={formData.period}
                                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                অর্ডার ইনডেক্স
                            </label>
                            <input
                                type="number"
                                value={formData.order_index}
                                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            বর্ণনা
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none"
                        />
                    </div>

                    {/* Features */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            প্যাকেজ ফিচারসমূহ
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                                className="flex-1 px-4 py-2 bg-white/5 border border-slate-600 rounded-xl text-white focus:border-teal-500 outline-none"
                                placeholder="নতুন ফিচার লিখুন..."
                            />
                            <button
                                type="button"
                                onClick={addFeature}
                                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                            >
                                <FaPlus />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center justify-between bg-white/5 px-4 py-2 rounded-lg border border-slate-700">
                                    <span className="text-slate-300">{feature}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-slate-600">
                        <input
                            type="checkbox"
                            id="popular"
                            checked={formData.popular}
                            onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                            className="w-5 h-5 rounded border-slate-500 text-teal-500 focus:ring-teal-500/20 bg-transparent"
                        />
                        <label htmlFor="popular" className="text-white cursor-pointer select-none">
                            জনপ্রিয় (Popular/Recommended) হিসেবে মার্ক করুন
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/pricing">
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
