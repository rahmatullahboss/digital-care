"use client";

import { useState, FormEvent, useEffect } from "react";
import { FaXmark, FaCheck } from "react-icons/fa6";
import Button from "@/components/ui/Button";

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    packageName: string;
    price: string;
}

export default function OrderModal({ isOpen, onClose, packageName, price }: OrderModalProps) {
    const [formState, setFormState] = useState({
        name: "",
        phone: "",
        email: "",
        companyName: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formState,
                    package_name: packageName,
                    price: price,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit order");
            }

            setSubmitStatus("success");
            setTimeout(() => {
                onClose();
                setSubmitStatus("idle");
                setFormState({ name: "", phone: "", email: "", companyName: "", message: "" });
            }, 3000);
        } catch (error) {
            console.error("Order error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-500 var-emerald-500 to-sky-500 p-6 text-white relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        <FaXmark className="text-xl" />
                    </button>
                    <h3 className="text-2xl font-bold">অর্ডার কনফার্ম করুন</h3>
                    <p className="opacity-90 mt-1">
                        <span className="font-semibold">{packageName}</span> প্যাকেজ - <span className="font-bold">৳{price}</span>
                    </p>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8">
                    {submitStatus === "success" ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaCheck className="text-4xl" />
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-2">অভিনন্দন!</h4>
                            <p className="text-slate-600">
                                আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।<br />
                                শীঘ্রই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 md:col-span-1">
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">আপনার নাম *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                                        placeholder="আপনার নাম"
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">ফোন নম্বর *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        value={formState.phone}
                                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                                        placeholder="০১XXXXXXXXX"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">ইমেইল (অপশনাল)</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                                    placeholder="example@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-1">প্রতিষ্ঠানের নাম (অপশনাল)</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    value={formState.companyName}
                                    onChange={(e) => setFormState({ ...formState, companyName: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                                    placeholder="আপনার প্রতিষ্ঠানের নাম"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">কোন বিশেষ অনুরোধ?</label>
                                <textarea
                                    id="message"
                                    rows={3}
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
                                    placeholder="বিস্তারিত লিখুন..."
                                />
                            </div>

                            {submitStatus === "error" && (
                                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">
                                    দুঃখিত, অর্ডারটি সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।
                                </div>
                            )}

                            <div className="pt-2">
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "সাবমিট করা হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
