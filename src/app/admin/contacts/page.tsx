"use client";

import { useEffect, useState } from "react";
import {
    FaEnvelope,
    FaPhone,
    FaTrash,
    FaEye,
    FaCheck,
    FaReply,
} from "react-icons/fa6";

interface Contact {
    id: string;
    name: string;
    phone: string;
    email?: string;
    message: string;
    status: string;
    created_at: string;
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await fetch("/api/admin/contacts");
            const data = await res.json();
            if (data.contacts) {
                setContacts(data.contacts);
            }
        } catch (error) {
            console.error("Error fetching contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/admin/contacts/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                setContacts(
                    contacts.map((c) => (c.id === id ? { ...c, status } : c))
                );
            }
        } catch (error) {
            console.error("Error updating contact:", error);
        }
    };

    const deleteContact = async (id: string) => {
        if (!confirm("আপনি কি নিশ্চিত এই মেসেজটি ডিলিট করতে চান?")) return;

        try {
            const res = await fetch(`/api/admin/contacts/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setContacts(contacts.filter((c) => c.id !== id));
                if (selectedContact?.id === id) {
                    setSelectedContact(null);
                }
            }
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            new: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
            read: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
            responded:
                "bg-green-500/20 text-green-400 border border-green-500/30",
        };
        const labels: Record<string, string> = {
            new: "নতুন",
            read: "পঠিত",
            responded: "উত্তর দেওয়া হয়েছে",
        };
        return (
            <span
                className={`px-3 py-1 rounded-full text-sm ${styles[status] || styles.new}`}
            >
                {labels[status] || status}
            </span>
        );
    };

    const viewContact = (contact: Contact) => {
        setSelectedContact(contact);
        if (contact.status === "new") {
            updateStatus(contact.id, "read");
        }
    };

    if (loading) {
        return <div className="text-white">লোড হচ্ছে...</div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">যোগাযোগ</h1>
                    <p className="text-slate-400 mt-1">
                        ভিজিটরদের মেসেজ দেখুন ও ম্যানেজ করুন
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-slate-400">
                        মোট মেসেজ: {contacts.length}
                    </span>
                    <span className="text-blue-400">
                        নতুন:{" "}
                        {contacts.filter((c) => c.status === "new").length}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact List */}
                <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-800/70 border-b border-slate-700">
                            <tr>
                                <th className="text-left p-4 text-slate-300 font-medium">
                                    নাম
                                </th>
                                <th className="text-left p-4 text-slate-300 font-medium">
                                    যোগাযোগ
                                </th>
                                <th className="text-left p-4 text-slate-300 font-medium">
                                    স্ট্যাটাস
                                </th>
                                <th className="text-left p-4 text-slate-300 font-medium">
                                    তারিখ
                                </th>
                                <th className="text-right p-4 text-slate-300 font-medium">
                                    অ্যাকশন
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {contacts.map((contact) => (
                                <tr
                                    key={contact.id}
                                    className={`hover:bg-slate-800/30 transition-colors cursor-pointer ${selectedContact?.id === contact.id
                                            ? "bg-slate-800/50"
                                            : ""
                                        }`}
                                    onClick={() => viewContact(contact)}
                                >
                                    <td className="p-4">
                                        <span
                                            className={`font-medium ${contact.status === "new" ? "text-white" : "text-slate-300"}`}
                                        >
                                            {contact.name}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-slate-400 flex items-center gap-2 text-sm">
                                                <FaPhone className="text-xs" />{" "}
                                                {contact.phone}
                                            </span>
                                            {contact.email && (
                                                <span className="text-slate-400 flex items-center gap-2 text-sm">
                                                    <FaEnvelope className="text-xs" />{" "}
                                                    {contact.email}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {getStatusBadge(contact.status)}
                                    </td>
                                    <td className="p-4 text-slate-400 text-sm">
                                        {new Date(
                                            contact.created_at
                                        ).toLocaleDateString("bn-BD")}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    viewContact(contact);
                                                }}
                                                className="p-2 text-teal-400 hover:bg-teal-500/10 rounded-lg transition-colors"
                                                title="দেখুন"
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteContact(contact.id);
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
                            {contacts.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="p-8 text-center text-slate-500"
                                    >
                                        কোন মেসেজ পাওয়া যায়নি
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Message Details */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    {selectedContact ? (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-white">
                                    মেসেজ বিবরণ
                                </h2>
                                {getStatusBadge(selectedContact.status)}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-slate-400 text-sm">
                                        নাম
                                    </label>
                                    <p className="text-white font-medium">
                                        {selectedContact.name}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-slate-400 text-sm">
                                        ফোন
                                    </label>
                                    <p className="text-white">
                                        <a
                                            href={`tel:${selectedContact.phone}`}
                                            className="text-teal-400 hover:underline"
                                        >
                                            {selectedContact.phone}
                                        </a>
                                    </p>
                                </div>

                                {selectedContact.email && (
                                    <div>
                                        <label className="text-slate-400 text-sm">
                                            ইমেইল
                                        </label>
                                        <p className="text-white">
                                            <a
                                                href={`mailto:${selectedContact.email}`}
                                                className="text-teal-400 hover:underline"
                                            >
                                                {selectedContact.email}
                                            </a>
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <label className="text-slate-400 text-sm">
                                        মেসেজ
                                    </label>
                                    <p className="text-white mt-1 whitespace-pre-wrap bg-slate-900/50 p-4 rounded-xl">
                                        {selectedContact.message}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-slate-400 text-sm">
                                        তারিখ
                                    </label>
                                    <p className="text-white">
                                        {new Date(
                                            selectedContact.created_at
                                        ).toLocaleString("bn-BD")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-6">
                                {selectedContact.status !== "responded" && (
                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                selectedContact.id,
                                                "responded"
                                            )
                                        }
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-colors"
                                    >
                                        <FaCheck />
                                        উত্তর দেওয়া হয়েছে
                                    </button>
                                )}
                                <a
                                    href={`mailto:${selectedContact.email || ""}?subject=Re: Digital Care Contact`}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-500/20 text-teal-400 rounded-xl hover:bg-teal-500/30 transition-colors"
                                >
                                    <FaReply />
                                    ইমেইল করুন
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-slate-500 py-12">
                            <FaEnvelope className="text-4xl mx-auto mb-4 opacity-50" />
                            <p>একটি মেসেজ সিলেক্ট করুন বিস্তারিত দেখতে</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
