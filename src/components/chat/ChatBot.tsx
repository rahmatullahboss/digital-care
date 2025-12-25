"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  X,
  Send,
  Bot,
  User,
  Loader2,
  Users,
  Phone,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";
import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
// import { siteConfig, formatPrice } from "@/lib/config"; // Removing dep
import { cn } from "@/lib/utils"; // Assuming utils exists, otherwise will create

const siteConfig = {
    name: "Digital Care Solutions",
    whatsapp: "+8801570260118",
    facebookPageId: "digitalcaresolutions",
    phone: "01570260118"
};

function formatPrice(amount: number | string): string {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(num) || num === 0) return "Contact for Price";
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
}

// Product type parsed from AI response
interface Product {
  slug: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  imageUrl: string | null;
}

interface GuestInfo {
  name: string;
  phone: string;
}

// Generate unique session ID
function generateSessionId() {
  return `chat_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Content segment type for interleaving text and products
type ContentSegment =
  | { type: "text"; content: string }
  | { type: "product"; product: Product };

// Parse products from AI text response - returns segments in order
function parseProductsFromText(text: string): ContentSegment[] {
  const productRegex =
    /\[PRODUCT:([^:]+):([^:]+):([^:]+):([^:]+):(true|false):([^\]]*)\]/g;
  const segments: ContentSegment[] = [];
  let lastIndex = 0;
  let match;

  while ((match = productRegex.exec(text)) !== null) {
    // Add text before this product
    const textBefore = text.slice(lastIndex, match.index);
    const cleanedText = textBefore
      .replace(/^\s*\*\s*$/gm, "")
      .replace(/^\s*[-*]\s*$/gm, "")
      .replace(/\*{2,}/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (cleanedText) {
      segments.push({ type: "text", content: cleanedText });
    }

    // Add the product
    segments.push({
      type: "product",
      product: {
        slug: match[1],
        name: match[2],
        price: parseInt(match[3], 10),
        category: match[4],
        inStock: match[5] === "true",
        imageUrl: match[6] || null,
      },
    });

    lastIndex = match.index + match[0].length;
  }

  // Add any remaining text after the last product
  const remainingText = text.slice(lastIndex);
  const cleanedRemaining = remainingText
    .replace(/\[PRODUCT:[^\]]+\]/g, "")
    .replace(/^\s*\*\s*$/gm, "")
    .replace(/^\s*[-*]\s*$/gm, "")
    .replace(/\*{2,}/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\n+/, "")
    .replace(/\n+$/, "")
    .trim();

  if (cleanedRemaining) {
    segments.push({ type: "text", content: cleanedRemaining });
  }

  return segments;
}

// Product Card Component
function ChatProductCard({ product }: { product: Product }) {
  // Determine link based on category
  const isService = product.category === "Service";
  const href = isService ? `/services#${product.slug}` : `/contact?package=${product.name}`;

  return (
    <Link
      href={href}
      className="block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group"
    >
      <div className="flex gap-3 p-2">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          {product.imageUrl && product.imageUrl !== 'null' ? (
             // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <ShoppingCart className="w-6 h-6" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm line-clamp-1 group-hover:text-amber-600 transition-colors">
            {product.name}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="font-bold text-amber-600">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-amber-500 transition-colors" />
        </div>
      </div>
    </Link>
  );
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showHumanOptions, setShowHumanOptions] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [userId] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [historyMessages, setHistoryMessages] = useState<
    { id: string; role: "user" | "assistant"; content: string }[]
  >([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize session ID
  const [sessionId] = useState(() => {
    if (typeof window === "undefined") return "";
    const storedSession = localStorage.getItem("chat_session_id");
    if (storedSession) return storedSession;
    const newSession = generateSessionId();
    localStorage.setItem("chat_session_id", newSession);
    return newSession;
  });

  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(() => {
    if (typeof window === "undefined") return null;
    const storedGuestInfo = localStorage.getItem("chat_guest_info");
    if (storedGuestInfo) {
      try {
        return JSON.parse(storedGuestInfo);
      } catch {
        return null;
      }
    }
    return null;
  });

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  // Simulating auth check (since we might not have auth setup in this project yet or different one)
  useEffect(() => {
    setIsCheckingAuth(false);
  }, []);

  // Listen for custom event to open chatbot
  useEffect(() => {
    const handleOpenChatbot = () => setIsOpen(true);
    window.addEventListener("open-chatbot", handleOpenChatbot);
    return () => window.removeEventListener("open-chatbot", handleOpenChatbot);
  }, []);

  // Load chat history from database
  useEffect(() => {
    async function loadChatHistory() {
      if (!sessionId || historyLoaded) return;
      try {
        const res = await fetch(`/api/chat-history?sessionId=${sessionId}`);
        if (res.ok) {
          const data = await res.json() as {
            messages: { id: string; role: "user" | "assistant"; content: string }[];
            guestInfo: { name: string; phone: string } | null;
          };
          if (data.messages && data.messages.length > 0) {
            setHistoryMessages(data.messages);
          }
          // If we have saved guestInfo from history, use it
          if (data.guestInfo && data.guestInfo.phone) {
            setGuestInfo(data.guestInfo);
            localStorage.setItem("chat_guest_info", JSON.stringify(data.guestInfo));
          }
        }
      } catch (error) {
        console.error("Failed to load chat history:", error);
      } finally {
        setHistoryLoaded(true);
      }
    }
    loadChatHistory();
  }, [sessionId, historyLoaded]);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showHumanOptions, historyMessages]);

  // Auto-focus input when ready
  useEffect(() => {
    if (status === "ready" && isOpen && guestInfo) {
      inputRef.current?.focus();
    }
  }, [status, isOpen, guestInfo]);

  // Save message to database
  const saveMessage = useCallback(
    async (role: "user" | "assistant", content: string) => {
      if (!sessionId || !content.trim()) return;
      try {
        await fetch("/api/save-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            userId,
            guestInfo: userId ? undefined : guestInfo,
            message: { role, content },
          }),
        });
      } catch (error) {
        console.error("Failed to save message:", error);
      }
    },
    [sessionId, userId, guestInfo]
  );

  // Track saved messages to avoid duplicates
  const savedMessageIdsRef = useRef<Set<string>>(new Set());
  const prevStatusRef = useRef(status);

  // Save user messages immediately when sent
  useEffect(() => {
    messages.forEach((msg) => {
      if (msg.role === "user" && !savedMessageIdsRef.current.has(msg.id)) {
        const textContent = msg.parts
            .filter((part): part is { type: "text"; text: string } => part.type === "text")
            .map((part) => part.text)
            .join("");
          
          if (textContent) {
              saveMessage("user", textContent);
              savedMessageIdsRef.current.add(msg.id);
          }
      }
    });
  }, [messages, saveMessage]);

  // Save AI responses when streaming completes
  useEffect(() => {
    if (prevStatusRef.current === "streaming" && status === "ready") {
      const lastMessage = messages[messages.length - 1];
      if (
        lastMessage &&
        lastMessage.role === "assistant" &&
        !savedMessageIdsRef.current.has(lastMessage.id)
      ) {
         const textContent = lastMessage.parts
            .filter((part): part is { type: "text"; text: string } => part.type === "text")
            .map((part) => part.text)
            .join("");

        if (textContent) {
          saveMessage("assistant", textContent);
          savedMessageIdsRef.current.add(lastMessage.id);
        }
      }
    }
    prevStatusRef.current = status;
  }, [status, messages, saveMessage]);

  const handleGuestInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For logged-in users, only phone is required
    const nameToUse = userId ? (guestInfo?.name || guestName.trim()) : guestName.trim();
    const phoneToUse = guestPhone.trim();
    
    if ((userId || nameToUse) && phoneToUse) {
      const info = { name: nameToUse || "User", phone: phoneToUse };
      setGuestInfo(info);
      localStorage.setItem("chat_guest_info", JSON.stringify(info));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status === "ready") {
      sendMessage({ text: input });
      setInput("");
      setShowHumanOptions(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  // Render message content with product cards inline
  const renderMessageContent = (message: (typeof messages)[0]) => {
     const textContent = message.parts
            .filter((part): part is { type: "text"; text: string } => part.type === "text")
            .map((part) => part.text)
            .join("");

    const segments = parseProductsFromText(textContent);

    return (
      <div className="space-y-2">
        {segments.map((segment, idx) => {
          if (segment.type === "text") {
            return (
              <p key={`text-${idx}`} className="whitespace-pre-wrap">
                {segment.content}
              </p>
            );
          } else {
            return (
              <ChatProductCard
                key={`product-${segment.product.slug}-${idx}`}
                product={segment.product}
              />
            );
          }
        })}
      </div>
    );
  };

  const getWhatsAppLink = () => {
    const message = encodeURIComponent(
      `হ্যালো, আমি ${siteConfig.name} থেকে সাহায্য চাই।`
    );
    return `https://wa.me/${siteConfig.whatsapp.replace(
      /[^0-9]/g,
      ""
    )}?text=${message}`;
  };

  const getMessengerLink = () => {
    return `https://m.me/${siteConfig.facebookPageId}`;
  };

  // Show loading while checking auth
  if (isCheckingAuth) return null;

  return (
    <>
      {/* Floating Trigger Button (Always visible when chat is closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 md:bottom-28 right-4 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200 group"
          aria-label="Open chat"
        >
          <Bot className="w-6 h-6 md:w-7 md:h-7 text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          {/* Tooltip */}
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg shadow-md text-sm font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            AI Assistant
          </span>
        </button>
      )}

      {/* Chat Window - positioned on right side */}
      <div
        className={cn(
          "fixed z-50 transition-all duration-300 ease-out",
          "bottom-24 md:bottom-28 right-4",
          "w-[calc(100vw-2rem)] max-w-sm",
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[70vh] h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-rose-500 p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Assistant</h3>
                <p className="text-xs text-white/80">
                  {guestInfo
                    ? `Hello, ${guestInfo.name}!`
                    : "Always here to help"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Guest Info Form */}
          {(!guestInfo || !guestInfo.phone) ? (
            <div className="flex-1 overflow-y-auto">
                <form
                onSubmit={handleGuestInfoSubmit}
                className="p-6"
                >
                <div className="text-center mb-6">
                     <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Bot className="w-8 h-8 text-amber-600" />
                     </div>
                     <h3 className="font-semibold text-gray-900">স্বাগতম!</h3>
                     <p className="text-gray-500 text-sm mt-1">
                        Chat শুরু করতে আপনার তথ্য দিন
                     </p>
                </div>

                <div className="space-y-4">
                    {!userId && (
                    <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">আপনার নাম</label>
                        <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="এখানে নাম লিখুন"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all"
                            required
                        />
                    </div>
                    )}
                    <div>
                         <label className="block text-xs font-medium text-gray-700 mb-1">ফোন নম্বর</label>
                        <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="017..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm transition-all"
                        required
                        />
                    </div>
                    <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-xl font-medium text-sm hover:from-amber-600 hover:to-rose-600 transition-colors shadow-md hover:shadow-lg translate-y-0 hover:-translate-y-0.5"
                    >
                    Chat শুরু করুন
                    </button>
                    
                    <p className="text-xs text-center text-gray-400 mt-4">
                        আপনার তথ্য আমাদের কাছে নিরাপদ
                    </p>
                </div>
                </form>
            </div>
          ) : (
            <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {historyMessages.length === 0 && messages.length === 0 && (
                    <div className="text-center py-6">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-r from-amber-100 to-rose-100 flex items-center justify-center">
                        <Bot className="w-7 h-7 text-amber-600" />
                    </div>
                    <p className="text-gray-900 font-medium text-sm">
                        আসসালামু আলাইকুম, {guestInfo.name}! 👋
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                        আমি ডিজিটাল কেয়ার এআই অ্যাসিস্ট্যান্ট। কিভাবে সাহায্য করতে পারি?
                    </p>
                    </div>
                )}

                {/* History Messages from Database */}
                {historyMessages.map((msg) => (
                    <div
                    key={`history-${msg.id}`}
                    className={cn(
                        "flex gap-2",
                        msg.role === "user" ? "justify-end" : "justify-start"
                    )}
                    >
                    {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-white" />
                        </div>
                    )}
                    <div
                        className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                        msg.role === "user"
                            ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-br-sm"
                            : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                        )}
                    >
                        <div className="space-y-2">
                        {parseProductsFromText(msg.content).map((segment, idx) => {
                            if (segment.type === "text") {
                            return (
                                <p key={`text-${idx}`} className="whitespace-pre-wrap leading-relaxed">
                                {segment.content}
                                </p>
                            );
                            } else {
                            return (
                                <ChatProductCard
                                key={`product-${segment.product.slug}-${idx}`}
                                product={segment.product}
                                />
                            );
                            }
                        })}
                        </div>
                    </div>
                    {msg.role === "user" && (
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                    )}
                    </div>
                ))}

                {/* Real-time Messages */}
                {messages.map((message) => (
                    <div
                    key={message.id}
                    className={cn(
                        "flex gap-2",
                        message.role === "user" ? "justify-end" : "justify-start"
                    )}
                    >
                    {message.role === "assistant" && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-white" />
                        </div>
                    )}
                    <div
                        className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                        message.role === "user"
                            ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-br-sm"
                            : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                        )}
                    >
                         {renderMessageContent(message)}
                    </div>
                    {message.role === "user" && (
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                    )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-2 justify-start">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                        <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                    </div>
                    </div>
                )}
                
                 {showHumanOptions && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 mx-8 animate-in fade-in zoom-in duration-300">
                    <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-blue-600" />
                        <p className="text-sm font-medium text-blue-800">
                        সরাসরি কথা বলুন
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <a
                        href={getMessengerLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#0084FF] text-white px-4 py-2.5 rounded-lg hover:bg-[#0073E6] transition-colors text-sm font-medium"
                        >
                        <FaFacebookMessenger className="w-4 h-4" />
                        Facebook Messenger
                        </a>
                        <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2.5 rounded-lg hover:bg-[#1DA851] transition-colors text-sm font-medium"
                        >
                        <FaWhatsapp className="w-4 h-4" />
                        WhatsApp
                        </a>
                        <a
                        href={`tel:${siteConfig.phone}`}
                        className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2.5 rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                        >
                        <Phone className="w-4 h-4" />
                        Call Us ({siteConfig.phone})
                        </a>
                    </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
                </div>

                {/* Footer Input Area */}
                <div className="bg-white border-t border-gray-100 p-3 flex-shrink-0">
                    <div className="flex items-center justify-between mb-2 px-1">
                        <button
                        onClick={() => setShowHumanOptions(!showHumanOptions)}
                        className="text-[10px] text-gray-500 hover:text-amber-600 flex items-center gap-1 transition-colors"
                        >
                        <Users className="w-3 h-3" />
                         {showHumanOptions ? "Close Options" : "Human Support"}
                        </button>
                    </div>
                    <form
                    onSubmit={handleSubmit}
                    className="flex gap-2"
                    >
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200 text-sm bg-gray-50"
                        disabled={status !== "ready"}
                    />
                    <button
                        type="submit"
                        disabled={status !== "ready" || !input.trim()}
                        className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm",
                        input.trim() 
                            ? "bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white hover:scale-105"
                            : "bg-gray-100 text-gray-400"
                        )}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                    </form>
                </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
