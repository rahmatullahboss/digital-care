"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlus, FaPencil, FaTrash } from "react-icons/fa6";
import { Service } from "@/lib/db";
import Button from "@/components/ui/Button";
import AdminTable from "@/components/admin/AdminTable";

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
        return <div className="text-center p-8 font-admin text-slate-500">লোড হচ্ছে...</div>;
    }

    return (
        <div className="space-y-6 animate-fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-admin-primary to-admin-secondary bg-clip-text text-transparent font-admin">
                        সার্ভিস সমূহ
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-admin">
                        সব সার্ভিস ম্যানেজ করুন
                    </p>
                </div>
                <Link href="/admin/services/new">
                    <Button icon={<FaPlus />}>নতুন সার্ভিস</Button>
                </Link>
            </div>

            <AdminTable
                data={services}
                keyExtractor={(service) => service.id}
                emptyMessage="কোন সার্ভিস পাওয়া যায়নি"
                columns={[
                    {
                        header: "অর্ডার",
                        accessorKey: "order_index",
                        className: "font-mono"
                    },
                    {
                        header: "নাম",
                        cell: (service) => (
                            <div className="flex items-center gap-3">
                                {service.icon && (
                                    <span className="text-2xl">{service.icon}</span>
                                )}
                                <span className="font-medium text-slate-900 dark:text-white">
                                    {service.title}
                                </span>
                            </div>
                        )
                    },
                    {
                        header: "Slug",
                        accessorKey: "slug"
                    },
                    {
                        header: "ট্যাগলাইন",
                        accessorKey: "tagline"
                    }
                ]}
                actions={(service) => (
                    <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/services/${service.id}`}>
                            <button className="p-2 text-admin-primary hover:bg-admin-bg rounded-lg transition-colors">
                                <FaPencil />
                            </button>
                        </Link>
                        <button
                            onClick={() => deleteService(service.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                        >
                            <FaTrash />
                        </button>
                    </div>
                )}
            />
        </div>
    );
}
