"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus, FaPencil, FaTrash, FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { Service } from "@/lib/db";
import Button from "@/components/ui/Button";

export default function ServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch("/api/admin/services");
            const data = await res.json();
            if (data.services) {
                setServices(data.services);
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteService = async (id: string) => {
        if (!confirm("আপনি কি নিশ্চিত যে আপনি এই সার্ভিসটি মুছে ফেলতে চান?")) return;

        try {
            const res = await fetch(`/api/admin/services/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setServices(services.filter((s) => s.id !== id));
            }
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    if (loading) {
        return <div className="text-white">লোড হচ্ছে...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">সার্ভিস সমূহ</h1>
                    <p className="text-slate-400 mt-1">সব সার্ভিস ম্যানেজ করুন</p>
                </div>
                <Link href="/admin/services/new">
                    <Button icon={<FaPlus />}>নতুন সার্ভিস</Button>
                </Link>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-800 text-slate-400">
                        <tr>
                            <th className="p-4">অর্ডার</th>
                            <th className="p-4">নাম</th>
                            <th className="p-4">Slug</th>
                            <th className="p-4">ট্যাগলাইন</th>
                            <th className="p-4 text-right">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {services.map((service) => (
                            <tr key={service.id} className="text-white hover:bg-slate-800/30">
                                <td className="p-4 font-mono text-slate-400">
                                    {service.order_index}
                                </td>
                                <td className="p-4 font-medium">
                                    <div className="flex items-center gap-3">
                                        {service.icon && (
                                            <span className="text-2xl">{service.icon}</span>
                                        )}
                                        {service.title}
                                    </div>
                                </td>
                                <td className="p-4 text-slate-400">{service.slug}</td>
                                <td className="p-4 text-slate-400 text-sm">{service.tagline}</td>
                                <td className="p-4 text-right space-x-2">
                                    <Link href={`/admin/services/${service.id}`}>
                                        <button className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                                            <FaPencil />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => deleteService(service.id)}
                                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {services.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-slate-500">
                                    কোন সার্ভিস পাওয়া যায়নি
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
