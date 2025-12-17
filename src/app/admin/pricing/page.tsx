"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus, FaPencil, FaTrash, FaCheck } from "react-icons/fa6";
import { PricingPackage } from "@/lib/db";
import Button from "@/components/ui/Button";

export default function PricingPage() {
    const [packages, setPackages] = useState<PricingPackage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const res = await fetch("/api/admin/pricing");
            const data = await res.json();
            if (data.packages) {
                setPackages(data.packages);
            }
        } catch (error) {
            console.error("Error fetching packages:", error);
        } finally {
            setLoading(false);
        }
    };

    const deletePackage = async (id: string) => {
        if (!confirm("আপনি কি নিশ্চিত যে আপনি এই প্যাকেজটি মুছে ফেলতে চান?")) return;

        try {
            const res = await fetch(`/api/admin/pricing/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setPackages(packages.filter((p) => p.id !== id));
            }
        } catch (error) {
            console.error("Error deleting package:", error);
        }
    };

    if (loading) {
        return <div className="text-white">লোড হচ্ছে...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">প্রাইসিং প্যাকেজ</h1>
                    <p className="text-slate-400 mt-1">সব প্যাকেজ ম্যানেজ করুন</p>
                </div>
                <Link href="/admin/pricing/new">
                    <Button icon={<FaPlus />}>নতুন প্যাকেজ</Button>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex flex-col items-start"
                    >
                        <div className="flex items-center justify-between w-full mb-4">
                            <span className="text-slate-400 text-sm font-mono">#{pkg.order_index}</span>
                            {pkg.popular === 1 && (
                                <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs rounded-full">
                                    Popular
                                </span>
                            )}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                        <div className="flex items-baseline gap-1 mb-4">
                            <span className="text-2xl font-bold text-teal-400">৳{pkg.price}</span>
                            {pkg.period && <span className="text-slate-500 text-sm">{pkg.period}</span>}
                        </div>

                        <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                            {pkg.description}
                        </p>

                        <div className="mt-auto flex items-center justify-end gap-3 w-full border-t border-slate-700 pt-4">
                            <Link href={`/admin/pricing/${pkg.id}`}>
                                <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
                                    <FaPencil /> এডিট
                                </button>
                            </Link>
                            <button
                                onClick={() => deletePackage(pkg.id)}
                                className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium"
                            >
                                <FaTrash /> ডিলিট
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {packages.length === 0 && (
                <div className="text-center py-12 text-slate-500 bg-slate-800/30 rounded-2xl border border-slate-800 border-dashed">
                    কোন প্যাকেজ তৈরি করা হয়নি
                </div>
            )}
        </div>
    );
}
