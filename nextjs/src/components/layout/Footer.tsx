"use client";

import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const footerLinks = [
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/services", label: "সার্ভিসসমূহ" },
  { href: "/#pricing", label: "সলিউশন" },
  { href: "/#process", label: "আমাদের প্রক্রিয়া" },
  { href: "/#faq", label: "সাধারণ জিজ্ঞাসা" },
];

const socialLinks = [
  { href: "#", icon: FaFacebookF, label: "Facebook" },
  { href: "#", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "#", icon: FaYoutube, label: "YouTube" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-teal-500 mb-4">ডিজিটাল কেয়ার সলিউশনস</h3>
            <p className="text-gray-400">
              আমরা বাংলাদেশের স্বাস্থ্যসেবা প্রতিষ্ঠানগুলোকে আধুনিক প্রযুক্তির মাধ্যমে ডিজিটাল জগতে সফল হতে সাহায্য করি। 
              আমাদের লক্ষ্য হলো আপনার এবং আপনার রোগীদের মধ্যে একটি নির্ভরযোগ্য ডিজিটাল সেতু তৈরি করা।
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">গুরুত্বপূর্ণ লিংক</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">যোগাযোগ</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0" />
                ডিকেপি রোড, বরগুনা
              </li>
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-2 flex-shrink-0" />
                01639590392
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-2 flex-shrink-0" />
                rahmatullahzisan@gmail.com
              </li>
            </ul>
            <div className="mt-4 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-gray-500">
          <p>&copy; {currentYear} ডিজিটাল কেয়ার সলিউশনস। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
