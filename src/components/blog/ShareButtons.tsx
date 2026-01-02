"use client";

import { FaFacebook, FaLinkedin, FaTwitter, FaLink } from "react-icons/fa6";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string; // Should be absolute URL
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      icon: <FaFacebook />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      label: "Facebook",
      color: "hover:bg-blue-600",
    },
    {
      icon: <FaLinkedin />,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      label: "LinkedIn",
      color: "hover:bg-blue-700",
    },
    {
      icon: <FaTwitter />,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      label: "Twitter",
      color: "hover:bg-sky-500",
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Share:</span>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all ${link.color} hover:-translate-y-1`}
            aria-label={`Share on ${link.label}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={handleCopy}
          className="group relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all hover:bg-teal-600 hover:-translate-y-1"
          aria-label="Copy Link"
        >
          <FaLink />
          {copied && (
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded shadow-lg animate-fade-in-up whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
