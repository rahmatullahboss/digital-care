"use client";

import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { useTranslations } from "next-intl";

const socialLinks = [
  { href: "#", icon: FaFacebookF, label: "Facebook" },
  { href: "#", icon: FaLinkedinIn, label: "LinkedIn" },
  { href: "#", icon: FaYoutube, label: "YouTube" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("Footer");
  const headerT = useTranslations("Header");

  const footerLinks = [
    { href: "/about", label: headerT("about") },
    { href: "/services", label: headerT("services") },
    { href: "/#pricing", label: t("solutions") },
    { href: "/#process", label: t("process") },
    { href: "/#faq", label: t("faq") },
  ];

  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-teal-500 mb-4">{t("brandName")}</h3>
            <p className="text-gray-400">
              {t("description")}
            </p>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("importantLinks")}</h3>
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
            <h3 className="text-lg font-semibold mb-4">{t("contactTitle")}</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 flex-shrink-0" />
                {t("address")}
              </li>
              <li className="flex items-start">
                <FaPhone className="mt-1 mr-2 flex-shrink-0" />
                01570260118
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
          <p>&copy; {currentYear} {t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
