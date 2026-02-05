"use client";

import { useState, useEffect } from "react";
import { FaFloppyDisk, FaPhone, FaEnvelope, FaLocationDot, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa6";
import Button from "@/components/ui/Button";

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        phone: "",
        email: "",
        address: "",
        facebook_url: "",
        linkedin_url: "",
        youtube_url: "",
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("/api/admin/settings");
            const data = await res.json();
            if (data.settings) {
                setFormData({
                    phone: data.settings.phone || "",
                    email: data.settings.email || "",
                    address: data.settings.address || "",
                    facebook_url: data.settings.facebook_url || "",
                    linkedin_url: data.settings.linkedin_url || "",
                    youtube_url: data.settings.youtube_url || "",
                });
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch("/api/admin/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to update settings");

            alert("সেটিংস সফলভাবে আপডেট হয়েছে!");
        } catch (error) {
            console.error("Error updating settings:", error);
            alert("সেটিংস আপডেট করতে সমস্যা হয়েছে");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="text-center p-8 font-admin text-slate-500">লোড হচ্ছে...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-admin-primary to-admin-secondary bg-clip-text text-transparent font-admin">
                    সাইট সেটিংস
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 font-admin">
                    যোগাযোগ এবং সোশ্যাল মিডিয়া সেটিংস আপডেট করুন
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center gap-2 font-admin">
                        <FaPhone className="text-admin-primary" /> যোগাযোগ তথ্য
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-admin">
                                <FaPhone className="inline mr-2 text-slate-400" />
                                ফোন নম্বর
                            </label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 outline-none font-mono-admin transition-all"
                                placeholder="01XXXXXXXXX"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-admin">
                                <FaEnvelope className="inline mr-2 text-slate-400" />
                                ইমেইল
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 outline-none font-mono-admin transition-all"
                                placeholder="example@email.com"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-admin">
                            <FaLocationDot className="inline mr-2 text-slate-400" />
                            ঠিকানা
                        </label>
                        <textarea
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 outline-none resize-none font-admin transition-all"
                            placeholder="আপনার ঠিকানা"
                        />
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 font-admin">সোশ্যাল মিডিয়া লিংক</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-admin">
                                <FaFacebook className="inline mr-2 text-blue-600 dark:text-blue-500" />
                                Facebook URL
                            </label>
                            <input
                                type="url"
                                value={formData.facebook_url}
                                onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 outline-none font-mono-admin transition-all"
                                placeholder="https://facebook.com/yourpage"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-admin">
                                <FaLinkedin className="inline mr-2 text-blue-700 dark:text-blue-400" />
                                LinkedIn URL
                            </label>
                            <input
                                type="url"
                                value={formData.linkedin_url}
                                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 outline-none font-mono-admin transition-all"
                                placeholder="https://linkedin.com/in/yourprofile"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 font-admin">
                                <FaYoutube className="inline mr-2 text-red-600 dark:text-red-500" />
                                YouTube URL
                            </label>
                            <input
                                type="url"
                                value={formData.youtube_url}
                                onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-admin-primary focus:ring-2 focus:ring-admin-primary/20 outline-none font-mono-admin transition-all"
                                placeholder="https://youtube.com/@yourchannel"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" icon={<FaFloppyDisk />} disabled={saving}>
                        {saving ? "সেভ হচ্ছে..." : "সেটিংস সেভ করুন"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
