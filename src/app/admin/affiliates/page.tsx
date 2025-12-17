"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaXmark, FaEnvelope, FaPhone } from "react-icons/fa6";

interface Affiliate {
    id: string;
    name: string;
    email: string;
    phone: string;
    promotion_strategy?: string;
    status: string;
    created_at: string;
}

export default function AffiliatesPage() {
    const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAffiliates();
    }, []);

    const fetchAffiliates = async () => {
        try {
            const res = await fetch("/api/admin/affiliates");
            const data = await res.json();
            if (data.affiliates) {
                setAffiliates(data.affiliates);
            }
        } catch (error) {
            console.error("Error fetching affiliates:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/admin/affiliates/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                setAffiliates(affiliates.map(a =>
                    a.id === id ? { ...a, status } : a
                ));
            }
        } catch (error) {
            console.error("Error updating affiliate:", error);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
            approved: "bg-green-500/20 text-green-400 border border-green-500/30",
            rejected: "bg-red-500/20 text-red-400 border border-red-500/30",
        };
        const labels: Record<string, string> = {
            pending: "অপেক্ষমাণ",
            approved: "অনুমোদিত",
            rejected: "প্রত্যাখ্যাত",
        };
        return (
            <span className={`px-3 py-1 rounded-full text-sm ${styles[status] || styles.pending}`}>
                {labels[status] || status}
            </span>
        );
    };

    if (loading) {
        return <div className="text-white">লোড হচ্ছে...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">এফিলিয়েট আবেদন</h1>
                    <p className="text-slate-400 mt-1">এফিলিয়েট পার্টনার আবেদন ম্যানেজ করুন</p>
                </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-800/70 border-b border-slate-700">
                        <tr>
                            <th className="text-left p-4 text-slate-300 font-medium">নাম</th>
                            <th className="text-left p-4 text-slate-300 font-medium">যোগাযোগ</th>
                            <th className="text-left p-4 text-slate-300 font-medium">প্রমোশন কৌশল</th>
                            <th className="text-left p-4 text-slate-300 font-medium">স্ট্যাটাস</th>
                            <th className="text-left p-4 text-slate-300 font-medium">তারিখ</th>
                            <th className="text-right p-4 text-slate-300 font-medium">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {affiliates.map((affiliate) => (
                            <tr key={affiliate.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="p-4">
                                    <span className="text-white font-medium">{affiliate.name}</span>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-slate-400 flex items-center gap-2">
                                            <FaEnvelope className="text-xs" /> {affiliate.email}
                                        </span>
                                        <span className="text-slate-400 flex items-center gap-2">
                                            <FaPhone className="text-xs" /> {affiliate.phone}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-400 max-w-xs truncate">
                                    {affiliate.promotion_strategy || "-"}
                                </td>
                                <td className="p-4">
                                    {getStatusBadge(affiliate.status)}
                                </td>
                                <td className="p-4 text-slate-400">
                                    {new Date(affiliate.created_at).toLocaleDateString("bn-BD")}
                                </td>
                                <td className="p-4 text-right">
                                    {affiliate.status === "pending" && (
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => updateStatus(affiliate.id, "approved")}
                                                className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                                                title="অনুমোদন করুন"
                                            >
                                                <FaCheck />
                                            </button>
                                            <button
                                                onClick={() => updateStatus(affiliate.id, "rejected")}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="প্রত্যাখ্যান করুন"
                                            >
                                                <FaXmark />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {affiliates.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-slate-500">
                                    কোন এফিলিয়েট আবেদন পাওয়া যায়নি
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
