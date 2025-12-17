"use client";

import { useEffect, useState } from "react";
import {
    FaEnvelope,
    FaPhone,
    FaTrash,
    FaEye,
    FaCheck,
    FaReply,
    FaBuilding,
    FaBox,
    FaTag,
} from "react-icons/fa6";
import { Order } from "@/lib/db";

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/admin/orders");
            const data = await res.json();
            if (data.orders) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                setOrders(
                    orders.map((o) => (o.id === id ? { ...o, status } : o))
                );
                if (selectedOrder?.id === id) {
                    setSelectedOrder({ ...selectedOrder, status });
                }
            }
        } catch (error) {
            console.error("Error updating order:", error);
        }
    };

    const deleteOrder = async (id: string) => {
        if (!confirm("আপনি কি নিশ্চিত এই অর্ডারটি ডিলিট করতে চান?")) return;

        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setOrders(orders.filter((o) => o.id !== id));
                if (selectedOrder?.id === id) {
                    setSelectedOrder(null);
                }
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            pending: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
            processing: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
            completed: "bg-green-500/20 text-green-400 border border-green-500/30",
            cancelled: "bg-red-500/20 text-red-400 border border-red-500/30",
        };
        const labels: Record<string, string> = {
            pending: "অপেক্ষমান",
            processing: "প্রক্রিয়াধীন",
            completed: "সম্পন্ন",
            cancelled: "বাতিল",
        };
        return (
            <span
                className={`px-3 py-1 rounded-full text-sm ${styles[status] || styles.pending}`}
            >
                {labels[status] || status}
            </span>
        );
    };

    const viewOrder = (order: Order) => {
        setSelectedOrder(order);
    };

    if (loading) {
        return <div className="text-white">লোড হচ্ছে...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">অর্ডার</h1>
                    <p className="text-slate-400 mt-1">
                        নতুন অর্ডারগুলো দেখুন ও ম্যানেজ করুন
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-slate-400">
                        মোট: {orders.length}
                    </span>
                    <span className="text-blue-400">
                        নতুন:{" "}
                        {orders.filter((o) => o.status === "pending").length}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order List */}
                <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-800/70 border-b border-slate-700">
                            <tr>
                                <th className="text-left p-4 text-slate-300 font-medium">প্যাকেজ</th>
                                <th className="text-left p-4 text-slate-300 font-medium">গ্রাহক</th>
                                <th className="text-left p-4 text-slate-300 font-medium">স্ট্যাটাস</th>
                                <th className="text-left p-4 text-slate-300 font-medium">তারিখ</th>
                                <th className="text-right p-4 text-slate-300 font-medium">অ্যাকশন</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className={`hover:bg-slate-800/30 transition-colors cursor-pointer ${selectedOrder?.id === order.id ? "bg-slate-800/50" : ""}`}
                                    onClick={() => viewOrder(order)}
                                >
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-white">{order.package_name}</span>
                                            <span className="text-sm text-teal-400">৳{order.price}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-slate-300">{order.name}</span>
                                            <span className="text-slate-500 text-xs">{order.phone}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {getStatusBadge(order.status)}
                                    </td>
                                    <td className="p-4 text-slate-400 text-sm">
                                        {new Date(order.created_at).toLocaleDateString("bn-BD")}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    viewOrder(order);
                                                }}
                                                className="p-2 text-teal-400 hover:bg-teal-500/10 rounded-lg transition-colors"
                                                title="দেখুন"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteOrder(order.id);
                                                }}
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                title="ডিলিট করুন"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500">
                                        কোন অর্ডার পাওয়া যায়নি
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Order Details */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    {selectedOrder ? (
                        <div>
                            <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
                                <h2 className="text-xl font-bold text-white">
                                    অর্ডার বিবরণ
                                </h2>
                                {getStatusBadge(selectedOrder.status)}
                            </div>

                            <div className="space-y-6">
                                {/* Package Info */}
                                <div className="bg-slate-900/40 p-4 rounded-xl space-y-3">
                                    <div className="flex items-start gap-3">
                                        <FaBox className="text-teal-500 mt-1" />
                                        <div>
                                            <label className="text-slate-400 text-xs block">প্যাকেজ</label>
                                            <p className="text-white font-medium">{selectedOrder.package_name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <FaTag className="text-teal-500 mt-1" />
                                        <div>
                                            <label className="text-slate-400 text-xs block">মূল্য</label>
                                            <p className="text-xl font-bold text-teal-400">৳{selectedOrder.price}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-slate-400 text-sm">গ্রাহকের নাম</label>
                                        <p className="text-white font-medium">{selectedOrder.name}</p>
                                    </div>

                                    {selectedOrder.company_name && (
                                        <div>
                                            <label className="text-slate-400 text-sm">প্রতিষ্ঠান</label>
                                            <p className="text-white flex items-center gap-2">
                                                <FaBuilding className="text-slate-500 text-sm" />
                                                {selectedOrder.company_name}
                                            </p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="text-slate-400 text-sm">ফোন</label>
                                            <p className="text-white">
                                                <a href={`tel:${selectedOrder.phone}`} className="text-teal-400 hover:underline flex items-center gap-2">
                                                    <FaPhone className="text-sm" />
                                                    {selectedOrder.phone}
                                                </a>
                                            </p>
                                        </div>
                                        {selectedOrder.email && (
                                            <div>
                                                <label className="text-slate-400 text-sm">ইমেইল</label>
                                                <p className="text-white">
                                                    <a href={`mailto:${selectedOrder.email}`} className="text-teal-400 hover:underline flex items-center gap-2">
                                                        <FaEnvelope className="text-sm" />
                                                        {selectedOrder.email}
                                                    </a>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {selectedOrder.message && (
                                    <div>
                                        <label className="text-slate-400 text-sm">বার্তা / অনুরোধ</label>
                                        <p className="text-white mt-1 whitespace-pre-wrap bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 text-sm">
                                            {selectedOrder.message}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <label className="text-slate-400 text-sm">অর্ডারের তারিখ</label>
                                    <p className="text-white text-sm">
                                        {new Date(selectedOrder.created_at).toLocaleString("bn-BD")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-8 pt-6 border-t border-slate-700">
                                {selectedOrder.status === "pending" && (
                                    <button
                                        onClick={() => updateStatus(selectedOrder.id, "completed")}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-colors"
                                    >
                                        <FaCheck />
                                        সম্পন্ন করুন
                                    </button>
                                )}
                                {selectedOrder.email && (
                                    <a
                                        href={`mailto:${selectedOrder.email}?subject=Order Update: ${selectedOrder.package_name}`}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-500/20 text-teal-400 rounded-xl hover:bg-teal-500/30 transition-colors"
                                    >
                                        <FaReply />
                                        ইমেইল করুন
                                    </a>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 py-12">
                            <FaBox className="text-4xl mx-auto mb-4 opacity-50" />
                            <p>একটি অর্ডার সিলেক্ট করুন বিস্তারিত দেখতে</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
