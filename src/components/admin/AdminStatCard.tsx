import Link from "next/link";
import { IconType } from "react-icons";

interface AdminStatCardProps {
    label: string;
    value: string | number;
    subtext?: string;
    icon: IconType;
    href?: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
}

export default function AdminStatCard({
    label,
    value,
    subtext,
    icon: Icon,
    href,
}: AdminStatCardProps) {
    const Content = () => (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className="text-6xl text-admin-primary" />
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-admin-bg rounded-lg">
                        <Icon className="text-xl text-admin-primary" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 font-admin">
                        {label}
                    </h3>
                </div>
                
                <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white font-mono-admin">
                        {value}
                    </p>
                </div>
                
                {subtext && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-admin">
                        {subtext}
                    </p>
                )}
            </div>
            
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-admin-primary to-admin-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block">
                <Content />
            </Link>
        );
    }

    return <Content />;
}
