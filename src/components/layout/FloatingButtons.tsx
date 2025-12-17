"use client";

import { FaPhone } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa6";

export default function FloatingButtons() {
  return (
    <div className="fixed right-5 bottom-5 flex flex-col gap-3 z-[10000]">
      <a
        href="tel:01639590392"
        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-semibold text-white text-sm shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl bg-gradient-to-r from-teal-600 to-teal-500"
        aria-label="Call Now"
      >
        <FaPhone className="text-base" />
        <span>Call Now</span>
      </a>
      <a
        href="https://www.m.me/profile.php?id=61579772421831"
        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-semibold text-white text-sm shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl bg-gradient-to-r from-blue-600 to-blue-500"
        aria-label="Message Us"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFacebookMessenger className="text-base" />
        <span>Message Us</span>
      </a>
    </div>
  );
}
