"use client";

import { FaExternalLinkAlt, FaShoppingCart, FaHotel } from "react-icons/fa";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";

interface Project {
    id: string;
    title: string;
    description: string;
    type: string;
    icon: React.ReactNode;
    features: string[];
    tech: string[];
    link: string;
    gradient: string;
}

const projects: Project[] = [
    {
        id: "online-bazar",
        title: "Online Bazar",
        description: "আধুনিক ই-কমার্স প্ল্যাটফর্ম যেখানে প্রিমিয়াম পণ্যের সংগ্রহ। ব্যবহারকারী-বান্ধব ইন্টারফেস এবং সহজ শপিং অভিজ্ঞতা।",
        type: "ই-কমার্স",
        icon: <FaShoppingCart className="text-2xl" />,
        features: ["প্রোডাক্ট ক্যাটালগ", "অর্ডার ম্যানেজমেন্ট", "ইউজার প্রোফাইল", "ব্লগ সেকশন"],
        tech: ["Next.js", "Tailwind CSS", "TypeScript"],
        link: "https://online-bazar.top",
        gradient: "from-orange-500 to-pink-500",
    },
    {
        id: "zinurooms",
        title: "ZinuRooms",
        description: "বাংলাদেশ জুড়ে যাচাইকৃত হোটেল বুকিং প্ল্যাটফর্ম। সেরা মূল্যে মানসম্পন্ন থাকার ব্যবস্থা।",
        type: "হোটেল বুকিং",
        icon: <FaHotel className="text-2xl" />,
        features: ["যাচাইকৃত প্রপার্টি", "তাৎক্ষণিক বুকিং", "হোটেলে পেমেন্ট", "২৪/৭ সাপোর্ট"],
        tech: ["Next.js", "Tailwind CSS", "Prisma"],
        link: "https://zinurooms.vercel.app",
        gradient: "from-teal-500 to-cyan-500",
    },
];

function ProjectCard({ project }: { project: Project }) {
    return (
        <GlassCard variant="dark" className="p-0 overflow-hidden group">
            {/* Header with gradient */}
            <div className={`h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-4xl transform group-hover:scale-110 transition-transform duration-300">
                        {project.icon}
                    </div>
                </div>
                {/* Type badge */}
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                    {project.type}
                </span>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {project.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.map((feature) => (
                        <span
                            key={feature}
                            className="px-2 py-1 rounded-md bg-slate-700/50 text-slate-300 text-xs"
                        >
                            {feature}
                        </span>
                    ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 rounded-md bg-teal-500/20 text-teal-300 text-xs font-medium"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Live link */}
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-teal-500/25 transition-all duration-300 group/link"
                >
                    Live দেখুন
                    <FaExternalLinkAlt className="text-xs group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
            </div>
        </GlassCard>
    );
}

export default function PortfolioSection() {
    return (
        <section id="portfolio" className="section-shell section-shell-dark py-24">
            <div className="container mx-auto px-6 relative z-10">
                <SectionHeader
                    kicker="আমাদের কাজের নমুনা"
                    title="আমাদের সম্পন্ন কিছু প্রজেক্ট"
                    description="আমরা বিভিন্ন ব্যবসার জন্য সফল ডিজিটাল সমাধান তৈরি করেছি। এখানে আমাদের কিছু উল্লেখযোগ্য কাজ দেখুন।"
                    variant="dark"
                />

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {/* More projects teaser */}
                <div className="text-center mt-12">
                    <p className="text-slate-400">
                        আরও প্রজেক্ট শীঘ্রই যোগ হবে...
                    </p>
                </div>
            </div>
        </section>
    );
}
