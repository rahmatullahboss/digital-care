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
        return <div className="text-white">লোড হচ্ছে...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">সাইট সেটিংস</h1>
                <p className="text-slate-400 mt-1">যোগাযোগ এবং সোশ্যাল মিডিয়া সেটিংস আপডেট করুন</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                        <FaPhone className="text-teal-500" /> যোগাযোগ তথ্য
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                <FaPhone className="inline mr-2 text-slate-500" />
                                ফোন নম্বর
                            </label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none font-mono"
                                placeholder="01XXXXXXXXX"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                <FaEnvelope className="inline mr-2 text-slate-500" />
                                ইমেইল
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                                placeholder="example@email.com"
                            />
                        </div>
                    </div>
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            <FaLocationDot className="inline mr-2 text-slate-500" />
                            ঠিকানা
                        </label>
                        <textarea
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            rows={2}
                            className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none resize-none"
                            placeholder="আপনার ঠিকানা"
                        />
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">সোশ্যাল মিডিয়া লিংক</h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                <FaFacebook className="inline mr-2 text-blue-500" />
                                Facebook URL
                            </label>
                            <input
                                type="url"
                                value={formData.facebook_url}
                                onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                                placeholder="https://facebook.com/yourpage"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                <FaLinkedin className="inline mr-2 text-blue-400" />
                                LinkedIn URL
                            </label>
                            <input
                                type="url"
                                value={formData.linkedin_url}
                                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                                placeholder="https://linkedin.com/in/yourprofile"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                <FaYoutube className="inline mr-2 text-red-500" />
                                YouTube URL
                            </label>
                            <input
                                type="url"
                                value={formData.youtube_url}
                                onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-xl text-white placeholder:text-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
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
