import { getServerSession } from "next-auth";
import { redirect, RedirectType } from "next/navigation";
import { headers } from "next/headers";
import { authOptions } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const headersList = await headers();
    const pathname = headersList.get("x-pathname") || headersList.get("x-invoke-path") || "";

    // Skip auth check for login page to prevent redirect loop
    const isLoginPage = pathname.includes("/admin/login");

    if (!isLoginPage) {
        const session = await getServerSession(authOptions);
        if (!session) {
            redirect("/admin/login", RedirectType.replace);
        }
    }

    // For login page, render children without admin nav
    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-slate-950">
            <AdminNav />
            <main className="flex-1 p-8">
                <div className="max-w-7xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
