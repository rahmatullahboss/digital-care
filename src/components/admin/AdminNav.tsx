"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
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
    FaBars,
    FaXmark,
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
    { href: "/admin/careers", icon: FaUsers, label: "ক্যারিয়ার" },
    { href: "/admin/settings", icon: FaGear, label: "সেটিংস" },
];

export default function AdminNav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-admin-primary text-white rounded-lg shadow-lg"
            >
                {isOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
            </button>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800
                flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
            >
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <Link href="/" className="block">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-admin-primary to-admin-secondary bg-clip-text text-transparent font-admin">
                            Digital Care
                        </h1>
                        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-admin">
                            Admin Panel
                        </p>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-admin
                                ${isActive
                                        ? "bg-admin-bg text-admin-primary font-medium shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-admin-primary"
                                    }
                            `}
                            >
                                <item.icon className={`text-lg ${isActive ? "text-admin-primary" : "text-slate-400"}`} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 transition-colors font-admin group"
                    >
                        <FaArrowRightFromBracket className="group-hover:translate-x-1 transition-transform" />
                        <span>লগআউট</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
