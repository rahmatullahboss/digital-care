"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus, FaPencil, FaTrash, FaChevronDown } from "react-icons/fa6";
import { FAQ } from "@/lib/db";
import Button from "@/components/ui/Button";

export default function FAQPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const res = await fetch("/api/admin/faq");
            const data = await res.json();
            if (data.faqs) {
                setFaqs(data.faqs);
            }
        } catch (error) {
            console.error("Error fetching FAQs:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteFaq = async (id: string) => {
        if (!confirm("আপনি কি নিশ্চিত যে আপনি এই প্রশ্নটি মুছে ফেলতে চান?")) return;

        try {
            const res = await fetch(`/api/admin/faq/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setFaqs(faqs.filter((f) => f.id !== id));
            }
        } catch (error) {
            console.error("Error deleting FAQ:", error);
        }
    };

    if (loading) {
        return <div className="text-white">লোড হচ্ছে...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">সচরাচর জিজ্ঞাসিত প্রশ্ন</h1>
                    <p className="text-slate-400 mt-1">FAQ ম্যানেজ করুন</p>
                </div>
                <Link href="/admin/faq/new">
                    <Button icon={<FaPlus />}>নতুন প্রশ্ন</Button>
                </Link>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
                <div className="divide-y divide-slate-700">
                    {faqs.map((faq, index) => (
                        <div key={faq.id} className="p-4 hover:bg-slate-800/30 transition-colors">
                            <div
                                className="flex items-center justify-between cursor-pointer"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-slate-500 w-8 text-center">{faq.order_index}</span>
                                    <div className="font-semibold text-white">{faq.question}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/admin/faq/${faq.id}`} onClick={(e) => e.stopPropagation()}>
                                            <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                                                <FaPencil />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteFaq(faq.id);
                                            }}
                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                    <FaChevronDown
                                        className={`text-slate-500 transition-transform ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </div>
                            </div>

                            {openIndex === index && (
                                <div className="mt-4 pl-12 pr-12 pb-2 text-slate-400 leading-relaxed border-t border-slate-700/50 pt-4">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                    {faqs.length === 0 && (
                        <div className="p-8 text-center text-slate-500">
                            কোন প্রশ্ন পাওয়া যায়নি
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
