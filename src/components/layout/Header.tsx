"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const t = useTranslations("Header");

  const navLinks = [
    { href: "/about", label: t("about") },
    { href: "/services", label: t("services") },
    { href: "/blog", label: t("blog") },
    { href: "/affiliate", label: t("affiliate") },
    { href: "/privacy-policy", label: t("privacy") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      const darkSections = document.querySelectorAll("#why-us, #contact, footer");
      
      if (!header) return;
      
      const headerHeight = header.offsetHeight;
      let overDark = false;
      
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
          overDark = true;
        }
      });
      
      setIsOverDark(overDark);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="bg-white/30 backdrop-blur-md border border-white/20 shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className={`text-2xl font-bold transition-colors duration-300 ${
            isOverDark ? "text-white" : "text-teal-600"
          }`}
        >
          {t("brandName")}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Link
            href="/#contact"
            className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition duration-300"
          >
            {t("contact")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t("menuToggle")}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden px-6 pb-4 space-y-2 ${mobileMenuOpen ? "block" : "hidden"}`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block text-gray-600 hover:text-teal-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/#contact"
          className="block bg-teal-500 text-white text-center px-4 py-2 rounded-full hover:bg-teal-600 transition duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          {t("contact")}
        </Link>
      </div>
    </header>
  );
}
