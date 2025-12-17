import { getD1Database } from "@/lib/db";
import Link from "next/link";
import { FaNewspaper, FaEnvelope, FaUsers, FaBox, FaBangladeshiTakaSign } from "react-icons/fa6";

export const dynamic = "force-dynamic";

interface Contact {
    id: string;
    name: string;
    phone: string;
    status: string;
    created_at: string;
}

interface Affiliate {
    id: string;
    name: string;
    email: string;
    status: string;
    created_at: string;
}

interface Order {
    id: string;
    package_name: string;
    name: string;
    price: string;
    status: string;
    created_at: string;
}

async function getDashboardData() {
    const db = await getD1Database();

    const [
        postsCount,
        contactsCount,
        affiliatesCount,
        ordersCount,
        pendingOrdersCount,
        revenueResult,
        recentContacts,
        recentAffiliates,
        recentOrders,
    ] = await Promise.all([
        db.prepare("SELECT COUNT(*) as count FROM posts").first(),
        db.prepare("SELECT COUNT(*) as count FROM contacts WHERE status = 'new'").first(),
        db.prepare("SELECT COUNT(*) as count FROM affiliates WHERE status = 'pending'").first(),
        db.prepare("SELECT COUNT(*) as count FROM orders").first(),
        db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'").first(),
        db.prepare("SELECT SUM(CAST(REPLACE(price, ',', '') AS REAL)) as total FROM orders WHERE status = 'completed'").first(),
        db.prepare("SELECT id, name, phone, status, created_at FROM contacts ORDER BY created_at DESC LIMIT 5").all(),
        db.prepare("SELECT id, name, email, status, created_at FROM affiliates ORDER BY created_at DESC LIMIT 5").all(),
        db.prepare("SELECT id, package_name, name, price, status, created_at FROM orders ORDER BY created_at DESC LIMIT 5").all(),
    ]);

    return {
        totalPosts: (postsCount?.count as number) || 0,
        newContacts: (contactsCount?.count as number) || 0,
        pendingAffiliates: (affiliatesCount?.count as number) || 0,
        totalOrders: (ordersCount?.count as number) || 0,
        pendingOrders: (pendingOrdersCount?.count as number) || 0,
        totalRevenue: (revenueResult?.total as number) || 0,
        recentContacts: (recentContacts?.results || []) as Contact[],
        recentAffiliates: (recentAffiliates?.results || []) as Affiliate[],
        recentOrders: (recentOrders?.results || []) as Order[],
    };
}

const getStatusBadge = (status: string, type: "contact" | "affiliate" | "order") => {
    const styles: Record<string, Record<string, string>> = {
        contact: {
            new: "bg-blue-500/20 text-blue-400",
            read: "bg-yellow-500/20 text-yellow-400",
            responded: "bg-green-500/20 text-green-400",
        },
        affiliate: {
            pending: "bg-yellow-500/20 text-yellow-400",
            approved: "bg-green-500/20 text-green-400",
            rejected: "bg-red-500/20 text-red-400",
        },
        order: {
            pending: "bg-blue-500/20 text-blue-400",
            processing: "bg-yellow-500/20 text-yellow-400",
            completed: "bg-green-500/20 text-green-400",
            cancelled: "bg-red-500/20 text-red-400",
        },
    };
    const labels: Record<string, Record<string, string>> = {
        contact: { new: "নতুন", read: "পঠিত", responded: "উত্তর" },
        affiliate: { pending: "অপেক্ষমাণ", approved: "অনুমোদিত", rejected: "প্রত্যাখ্যাত" },
        order: { pending: "অপেক্ষমান", processing: "প্রক্রিয়াধীন", completed: "সম্পন্ন", cancelled: "বাতিল" },
    };
    return (
        <span className={`px-2 py-0.5 rounded-full text-xs ${styles[type][status] || "bg-slate-500/20 text-slate-400"}`}>
            {labels[type][status] || status}
        </span>
    );
};

export default async function AdminDashboard() {
    const data = await getDashboardData();

    const statCards = [
        {
            label: "মোট অর্ডার",
            value: data.totalOrders,
            subtext: `${data.pendingOrders} পেন্ডিং`,
            icon: FaBox,
            color: "bg-blue-500",
            href: "/admin/orders",
        },
        {
            label: "মোট আয়",
            value: `৳${data.totalRevenue.toLocaleString("bn-BD")}`,
            subtext: "সম্পন্ন অর্ডার থেকে",
            icon: FaBangladeshiTakaSign,
            color: "bg-green-500",
            href: "/admin/orders",
        },
        {
            label: "নতুন যোগাযোগ",
            value: data.newContacts,
            subtext: "উত্তর দেওয়া হয়নি",
            icon: FaEnvelope,
            color: "bg-teal-500",
            href: "/admin/contacts",
        },
        {
            label: "পেন্ডিং অ্যাফিলিয়েট",
            value: data.pendingAffiliates,
            subtext: "অনুমোদনের অপেক্ষায়",
            icon: FaUsers,
            color: "bg-purple-500",
            href: "/admin/affiliates",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">ড্যাশবোর্ড</h1>
                <p className="text-slate-400 mt-1">আপনার সাইটের সকল তথ্য এখানে দেখুন</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:bg-slate-800/70 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm">{stat.label}</p>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                                {stat.subtext && (
                                    <p className="text-slate-500 text-xs mt-1">{stat.subtext}</p>
                                )}
                            </div>
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon className="text-white text-xl" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Contacts */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white">সাম্প্রতিক যোগাযোগ</h2>
                        <Link href="/admin/contacts" className="text-teal-400 text-sm hover:underline">
                            সব দেখুন
                        </Link>
                    </div>
                    {data.recentContacts.length > 0 ? (
                        <div className="space-y-3">
                            {data.recentContacts.map((contact) => (
                                <div key={contact.id} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                                    <div>
                                        <p className="text-white text-sm font-medium">{contact.name}</p>
                                        <p className="text-slate-500 text-xs">{contact.phone}</p>
                                    </div>
                                    {getStatusBadge(contact.status, "contact")}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm">কোন যোগাযোগ নেই</p>
                    )}
                </div>

                {/* Recent Affiliates */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white">সাম্প্রতিক অ্যাফিলিয়েট</h2>
                        <Link href="/admin/affiliates" className="text-teal-400 text-sm hover:underline">
                            সব দেখুন
                        </Link>
                    </div>
                    {data.recentAffiliates.length > 0 ? (
                        <div className="space-y-3">
                            {data.recentAffiliates.map((affiliate) => (
                                <div key={affiliate.id} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                                    <div>
                                        <p className="text-white text-sm font-medium">{affiliate.name}</p>
                                        <p className="text-slate-500 text-xs">{affiliate.email}</p>
                                    </div>
                                    {getStatusBadge(affiliate.status, "affiliate")}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm">কোন আবেদন নেই</p>
                    )}
                </div>

                {/* Recent Orders */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white">সাম্প্রতিক অর্ডার</h2>
                        <Link href="/admin/orders" className="text-teal-400 text-sm hover:underline">
                            সব দেখুন
                        </Link>
                    </div>
                    {data.recentOrders.length > 0 ? (
                        <div className="space-y-3">
                            {data.recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between py-2 border-b border-slate-700/50 last:border-0">
                                    <div>
                                        <p className="text-white text-sm font-medium">{order.package_name}</p>
                                        <p className="text-slate-500 text-xs">{order.name} • ৳{order.price}</p>
                                    </div>
                                    {getStatusBadge(order.status, "order")}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm">কোন অর্ডার নেই</p>
                    )}
                </div>
            </div>
        </div>
    );
}
