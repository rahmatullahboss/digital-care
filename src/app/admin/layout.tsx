import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/admin-login");
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            <AdminNav />
            <main className="flex-1 w-full lg:w-auto p-4 lg:p-8 overflow-x-hidden">
                <div className="max-w-7xl mx-auto space-y-8">{children}</div>
            </main>
        </div>
    );
}
