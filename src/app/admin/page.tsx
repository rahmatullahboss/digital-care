import { getD1Database } from "@/lib/db";
import { FaNewspaper, FaEnvelope, FaUsers, FaEye } from "react-icons/fa6";

async function getStats() {
    const db = await getD1Database();

    const [posts, contacts, affiliates] = await Promise.all([
        db.prepare("SELECT COUNT(*) as count FROM posts").first(),
        db.prepare("SELECT COUNT(*) as count FROM contacts WHERE status = 'new'").first(),
        db.prepare("SELECT COUNT(*) as count FROM affiliates WHERE status = 'pending'").first(),
    ]);

    return {
        totalPosts: (posts?.count as number) || 0,
        newContacts: (contacts?.count as number) || 0,
        pendingAffiliates: (affiliates?.count as number) || 0,
    };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    const statCards = [
        {
            label: "মোট ব্লগ পোস্ট",
            value: stats.totalPosts,
            icon: FaNewspaper,
            color: "bg-blue-500",
        },
        {
            label: "নতুন যোগাযোগ",
            value: stats.newContacts,
            icon: FaEnvelope,
            color: "bg-teal-500",
        },
        {
            label: "পেন্ডিং অ্যাফিলিয়েট",
            value: stats.pendingAffiliates,
            icon: FaUsers,
            color: "bg-purple-500",
        },
        {
            label: "আজকের ভিজিটর",
            value: "—",
            icon: FaEye,
            color: "bg-orange-500",
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
                    <div
                        key={stat.label}
                        className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-sm">{stat.label}</p>
                                <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                <stat.icon className="text-white text-xl" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">সাম্প্রতিক যোগাযোগ</h2>
                    <p className="text-slate-400">ডেটাবেস থেকে লোড হবে...</p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">সাম্প্রতিক অ্যাফিলিয়েট আবেদন</h2>
                    <p className="text-slate-400">ডেটাবেস থেকে লোড হবে...</p>
                </div>
            </div>
        </div>
    );
}
