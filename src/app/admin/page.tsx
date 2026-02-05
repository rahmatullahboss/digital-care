import { getD1Database } from "@/lib/db";
import Link from "next/link";
import { FaNewspaper, FaEnvelope, FaUsers, FaBox, FaBangladeshiTakaSign } from "react-icons/fa6";
import AdminStatCard from "@/components/admin/AdminStatCard";
import AdminTable from "@/components/admin/AdminTable";

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
        db.prepare("SELECT COUNT(*) as count FROM posts").first<{ count: number }>(),
        db.prepare("SELECT COUNT(*) as count FROM contacts WHERE status = 'new'").first<{ count: number }>(),
        db.prepare("SELECT COUNT(*) as count FROM affiliates WHERE status = 'pending'").first<{ count: number }>(),
        db.prepare("SELECT COUNT(*) as count FROM orders").first<{ count: number }>(),
        db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'").first<{ count: number }>(),
        db.prepare("SELECT SUM(CAST(REPLACE(price, ',', '') AS REAL)) as total FROM orders WHERE status = 'completed'").first<{ total: number }>(),
        db.prepare("SELECT id, name, phone, status, created_at FROM contacts ORDER BY created_at DESC LIMIT 5").all<Contact>(),
        db.prepare("SELECT id, name, email, status, created_at FROM affiliates ORDER BY created_at DESC LIMIT 5").all<Affiliate>(),
        db.prepare("SELECT id, package_name, name, price, status, created_at FROM orders ORDER BY created_at DESC LIMIT 5").all<Order>(),
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
            new: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
            read: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
            responded: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
        },
        affiliate: {
            pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
            approved: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
            rejected: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
        },
        order: {
            pending: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
            processing: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
            completed: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
            cancelled: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
        },
    };
    const labels: Record<string, Record<string, string>> = {
        contact: { new: "নতুন", read: "পঠিত", responded: "উত্তর" },
        affiliate: { pending: "অপেক্ষমাণ", approved: "অনুমোদিত", rejected: "প্রত্যাখ্যাত" },
        order: { pending: "অপেক্ষমান", processing: "প্রক্রিয়াধীন", completed: "সম্পন্ন", cancelled: "বাতিল" },
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[type][status] || "bg-slate-100 text-slate-600"}`}>
            {labels[type][status] || status}
        </span>
    );
};

export default async function AdminDashboard() {
    const data = await getDashboardData();

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-admin-primary to-admin-secondary bg-clip-text text-transparent font-admin">
                    ড্যাশবোর্ড
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 font-admin">
                    আপনার সাইটের সকল তথ্য এখানে দেখুন
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AdminStatCard
                    label="মোট অর্ডার"
                    value={data.totalOrders}
                    subtext={`${data.pendingOrders} পেন্ডিং`}
                    icon={FaBox}
                    href="/admin/orders"
                />
                <AdminStatCard
                    label="মোট আয়"
                    value={`৳${data.totalRevenue.toLocaleString("bn-BD")}`}
                    subtext="সম্পন্ন অর্ডার থেকে"
                    icon={FaBangladeshiTakaSign}
                    href="/admin/orders"
                />
                <AdminStatCard
                    label="নতুন যোগাযোগ"
                    value={data.newContacts}
                    subtext="উত্তর দেওয়া হয়নি"
                    icon={FaEnvelope}
                    href="/admin/contacts"
                />
                <AdminStatCard
                    label="পেন্ডিং অ্যাফিলিয়েট"
                    value={data.pendingAffiliates}
                    subtext="অনুমোদনের অপেক্ষায়"
                    icon={FaUsers}
                    href="/admin/affiliates"
                />
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Recent Orders - Spans 2 cols on XL */}
                <div className="xl:col-span-2">
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-slate-800 dark:text-white font-admin">
                                সাম্প্রতিক অর্ডার
                            </h2>
                            <Link href="/admin/orders" className="text-sm text-admin-primary hover:underline font-admin">
                                সব দেখুন
                            </Link>
                        </div>
                        <AdminTable
                            data={data.recentOrders}
                            keyExtractor={(item) => item.id}
                            columns={[
                                { header: "প্যাকেজ", accessorKey: "package_name", className: "font-medium" },
                                {
                                    header: "গ্রাহক",
                                    cell: (item) => (
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">{item.name}</div>
                                            <div className="text-xs text-slate-500">৳{item.price}</div>
                                        </div>
                                    )
                                },
                                {
                                    header: "স্ট্যাটাস",
                                    cell: (item) => getStatusBadge(item.status, "order")
                                }
                            ]}
                        />
                    </div>
                </div>

                {/* Recent Contacts & Affiliates - Stacked or Tabbed? Let's just stack "Contacts" for now as it's important */}
                <div className="space-y-6">
                     <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-slate-800 dark:text-white font-admin">
                                সাম্প্রতিক যোগাযোগ
                            </h2>
                             <Link href="/admin/contacts" className="text-sm text-admin-primary hover:underline font-admin">
                                সব দেখুন
                            </Link>
                        </div>
                        <AdminTable
                            data={data.recentContacts}
                            keyExtractor={(item) => item.id}
                             columns={[
                                {
                                    header: "নাম",
                                    cell: (item) => (
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">{item.name}</div>
                                            <div className="text-xs text-slate-500">{item.phone}</div>
                                        </div>
                                    )
                                },
                                {
                                    header: "স্ট্যাটাস",
                                    cell: (item) => getStatusBadge(item.status, "contact")
                                }
                            ]}
                        />
                    </div>

                     <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-slate-800 dark:text-white font-admin">
                                সাম্প্রতিক অ্যাফিলিয়েট
                            </h2>
                             <Link href="/admin/affiliates" className="text-sm text-admin-primary hover:underline font-admin">
                                সব দেখুন
                            </Link>
                        </div>
                         <AdminTable
                            data={data.recentAffiliates}
                            keyExtractor={(item) => item.id}
                             columns={[
                                {
                                    header: "নাম",
                                    cell: (item) => (
                                        <div>
                                            <div className="font-medium text-slate-900 dark:text-white">{item.name}</div>
                                            <div className="text-xs text-slate-500">{item.email}</div>
                                        </div>
                                    )
                                },
                                {
                                    header: "স্ট্যাটাস",
                                    cell: (item) => getStatusBadge(item.status, "affiliate")
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
