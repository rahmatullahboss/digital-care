"use client";

import Image from "next/image";
import { FaExternalLinkAlt, FaShoppingCart, FaHotel, FaRocket, FaHome, FaUsers } from "react-icons/fa";
import SectionHeader from "@/components/ui/SectionHeader";
import GlassCard from "@/components/ui/GlassCard";
import { useTranslations } from "next-intl";

interface Project {
    id: string;
    title: string;
    icon: React.ReactNode;
    tech: string[];
    link: string;
    gradient: string;
    screenshot?: string;
}

const projects: Project[] = [
    {
        id: "barguna-housing",
        title: "Barguna Housing",
        icon: <FaHome className="text-2xl" />,
        tech: ["Next.js", "Tailwind CSS", "TypeScript"],
        link: "https://bargunahousing.vercel.app",
        gradient: "from-emerald-500 to-teal-600",
        screenshot: "https://res.cloudinary.com/dpnccgsja/image/upload/v1766335530/portfolio/barguna-housing.png",
    },
    {
        id: "online-bazar",
        title: "Online Bazar",
        icon: <FaShoppingCart className="text-2xl" />,
        tech: ["Next.js", "Tailwind CSS", "TypeScript"],
        link: "https://online-bazar.top",
        gradient: "from-orange-500 to-pink-500",
        screenshot: "https://res.cloudinary.com/dpnccgsja/image/upload/v1766335532/portfolio/online-bazar.png",
    },
    {
        id: "zinurooms",
        title: "ZinuRooms",
        icon: <FaHotel className="text-2xl" />,
        tech: ["Next.js", "Tailwind CSS", "Prisma"],
        link: "https://zinurooms.vercel.app",
        gradient: "from-teal-500 to-cyan-500",
        screenshot: "https://res.cloudinary.com/dpnccgsja/image/upload/v1766335531/portfolio/zinurooms.png",
    },
    {
        id: "online-bazar-landing",
        title: "Online Bazar - Landing Page",
        icon: <FaRocket className="text-2xl" />,
        tech: ["HTML", "CSS", "JavaScript"],
        link: "https://onlinebazar.pages.dev",
        gradient: "from-purple-500 to-indigo-500",
    },
    {
        id: "talenthunt-bd",
        title: "TalentHunt BD",
        icon: <FaUsers className="text-2xl" />,
        tech: ["Next.js", "Tailwind CSS", "TypeScript"],
        link: "https://talenthuntbd.digitalcare.site",
        gradient: "from-blue-500 to-cyan-500",
        screenshot: "https://res.cloudinary.com/dpnccgsja/image/upload/v1766453037/portfolio/talenthuntbd.png",
    },
];

interface ProjectCardProps {
    project: Project;
    description: string;
    type: string;
    features: string[];
    viewLiveText: string;
}

function ProjectCard({ project, description, type, features, viewLiveText }: ProjectCardProps) {
    return (
        <GlassCard variant="dark" className="p-0 overflow-hidden group">
            {/* Header with screenshot or gradient */}
            <div className={`h-48 relative overflow-hidden ${!project.screenshot ? `bg-gradient-to-br ${project.gradient}` : ''}`}>
                {project.screenshot ? (
                    <>
                        <Image 
                            src={project.screenshot} 
                            alt={project.title}
                            fill
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-4xl transform group-hover:scale-110 transition-transform duration-300">
                                {project.icon}
                            </div>
                        </div>
                    </>
                )}
                {/* Type badge */}
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium">
                    {type}
                </span>
                {/* Icon overlay for screenshots */}
                {project.screenshot && (
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                        {project.icon}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {features.map((feature) => (
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
                    {viewLiveText}
                    <FaExternalLinkAlt className="text-xs group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
            </div>
        </GlassCard>
    );
}

export default function PortfolioSection() {
    const t = useTranslations("Portfolio");

    return (
        <section id="portfolio" className="section-shell section-shell-dark py-24">
            <div className="container mx-auto px-6 relative z-10">
                <SectionHeader
                    kicker={t("kicker")}
                    title={t("title")}
                    description={t("description")}
                    variant="dark"
                />

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            description={t(`projects.${project.id}.description`)}
                            type={t(`projects.${project.id}.type`)}
                            features={t.raw(`projects.${project.id}.features`) as string[]}
                            viewLiveText={t("viewLive")}
                        />
                    ))}
                </div>

                {/* More projects teaser */}
                <div className="text-center mt-12">
                    <p className="text-slate-400">
                        {t("moreProjects")}
                    </p>
                </div>
            </div>
        </section>
    );
}
