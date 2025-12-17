"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaFloppyDisk, FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa6";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NewServicePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [features, setFeatures] = useState<string[]>([]);
    const [benefits, setBenefits] = useState<string[]>([]);
    const [newFeature, setNewFeature] = useState("");
    const [newBenefit, setNewBenefit] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        tagline: "",
        description: "",
        icon: "",
        order_index: 0,
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
            slug: prev.slug || generateSlug(title),
        }));
    };

    const addFeature = () => {
        if (newFeature.trim()) {
            setFeatures([...features, newFeature.trim()]);
            setNewFeature("");
        }
    };

    const addBenefit = () => {
        if (newBenefit.trim()) {
            setBenefits([...benefits, newBenefit.trim()]);
            setNewBenefit("");
        }
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const removeBenefit = (index: number) => {
        setBenefits(benefits.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/admin/services", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    features,
                    benefits,
                }),
            });

            if (!res.ok) throw new Error("Failed to create service");

            router.push("/admin/services");
            router.refresh();
        } catch (error) {
            console.error("Error creating service:", error);
            alert("সার্ভিস তৈরি করতে সমস্যা হয়েছে");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/services" className="text-slate-400 hover:text-white">
                    <FaArrowLeft />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">নতুন সার্ভিস</h1>
                    <p className="text-slate-400 mt-1">নতুন সার্ভিস যোগ করুন</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                সার্ভিস নাম <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={handleTitleChange}
                                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                                required
                            />
                        </div>
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
                                required
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                আইকন বা ইমোজি
                            </label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) =>
                                    setFormData({ ...formData, icon: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                                placeholder="eg. 🌐 or FaGlobe"
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
                            ট্যাগলাইন
                        </label>
                        <input
                            type="text"
                            value={formData.tagline}
                            onChange={(e) =>
                                setFormData({ ...formData, tagline: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            বিস্তারিত বিবরণ
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            rows={4}
                            className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none"
                        />
                    </div>

                    {/* Features */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            ফিচারসমূহ
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

                    {/* Benefits */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            সুবিধাসমূহ (Benefits)
                        </label>
                        <div className="flex gap-2 mb-3">
                            <input
                                type="text"
                                value={newBenefit}
                                onChange={(e) => setNewBenefit(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                                className="flex-1 px-4 py-2 bg-white/5 border border-slate-600 rounded-xl text-white focus:border-teal-500 outline-none"
                                placeholder="নতুন সুবিধা লিখুন..."
                            />
                            <button
                                type="button"
                                onClick={addBenefit}
                                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                            >
                                <FaPlus />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center justify-between bg-white/5 px-4 py-2 rounded-lg border border-slate-700">
                                    <span className="text-slate-300">{benefit}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeBenefit(index)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Link href="/admin/services">
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
