"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
    FaHouse,
    FaNewspaper,
    FaLayerGroup,
    FaTags,
    FaEnvelope,
    FaUsers,
    FaCircleQuestion,
    FaGear,
    FaArrowRightFromBracket,
    FaCartShopping,
} from "react-icons/fa6";

const navItems = [
    { href: "/admin", icon: FaHouse, label: "ড্যাশবোর্ড" },
    { href: "/admin/orders", icon: FaCartShopping, label: "অর্ডার" },
    { href: "/admin/posts", icon: FaNewspaper, label: "ব্লগ পোস্ট" },
    { href: "/admin/services", icon: FaLayerGroup, label: "সার্ভিস" },
    { href: "/admin/pricing", icon: FaTags, label: "প্রাইসিং" },
    { href: "/admin/contacts", icon: FaEnvelope, label: "যোগাযোগ" },
    { href: "/admin/affiliates", icon: FaUsers, label: "অ্যাফিলিয়েট" },
    { href: "/admin/faq", icon: FaCircleQuestion, label: "FAQ" },
    { href: "/admin/settings", icon: FaGear, label: "সেটিংস" },
];

export default function AdminNav() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-900 min-h-screen p-4 flex flex-col">
            <div className="mb-8">
                <Link href="/" className="text-xl font-bold text-teal-400">
                    ডিজিটাল কেয়ার
                </Link>
                <p className="text-slate-500 text-sm mt-1">অ্যাডমিন প্যানেল</p>
            </div>

            <nav className="flex-1 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                ? "bg-teal-500/20 text-teal-400"
                                : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon className="text-lg" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-slate-800 pt-4 mt-4">
                <button
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors w-full"
                >
                    <FaArrowRightFromBracket />
                    <span>লগআউট</span>
                </button>
            </div>
        </aside>
    );
}
