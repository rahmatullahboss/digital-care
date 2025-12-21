"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { FaRobot, FaXmark, FaPaperPlane, FaSpinner } from "react-icons/fa6";
import { useTranslations } from "next-intl";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatWidget() {
    const t = useTranslations("Chat");
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: t("greeting") }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.map(m => ({ role: m.role, content: m.content }))
                }),
            });

            const data = await response.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
        } catch {
            setMessages(prev => [...prev, { 
                role: "assistant", 
                content: t("error") 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed left-5 bottom-5 z-[9999] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isOpen 
                        ? "bg-slate-700 rotate-0" 
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-110 animate-pulse"
                }`}
                aria-label={t("ariaLabel")}
            >
                {isOpen ? (
                    <FaXmark className="text-white text-xl" />
                ) : (
                    <FaRobot className="text-white text-2xl" />
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed left-5 bottom-24 z-[9999] w-80 sm:w-96 h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <FaRobot className="text-white text-lg" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold">{t("title")}</h3>
                            <p className="text-white/70 text-xs">{t("responseTime")}</p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                        msg.role === "user"
                                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-md"
                                            : "bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-md"
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white text-slate-500 px-4 py-2.5 rounded-2xl rounded-bl-md shadow-sm border border-slate-100">
                                    <FaSpinner className="animate-spin" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-3 border-t border-slate-100 bg-white">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={t("placeholder")}
                                className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none text-sm"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                            >
                                <FaPaperPlane className="text-sm" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
