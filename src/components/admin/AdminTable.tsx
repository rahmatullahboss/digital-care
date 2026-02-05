import { ReactNode } from "react";

interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => ReactNode;
    className?: string;
}

interface AdminTableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (item: T) => string | number;
    emptyMessage?: string;
    actions?: (item: T) => ReactNode;
}

export default function AdminTable<T>({
    data,
    columns,
    keyExtractor,
    emptyMessage = "No data available",
    actions,
}: AdminTableProps<T>) {
    if (data.length === 0) {
        return (
            <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <p className="text-slate-500 font-admin">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-admin-bg border-b border-slate-200 dark:border-slate-700">
                        {columns.map((col, idx) => (
                            <th
                                key={idx}
                                className={`px-6 py-4 text-xs font-semibold text-admin-text uppercase tracking-wider font-admin ${col.className || ""}`}
                            >
                                {col.header}
                            </th>
                        ))}
                        {actions && (
                            <th className="px-6 py-4 text-xs font-semibold text-admin-text uppercase tracking-wider font-admin text-right">
                                Actions
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {data.map((item) => (
                        <tr
                            key={keyExtractor(item)}
                            className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                        >
                            {columns.map((col, idx) => (
                                <td
                                    key={idx}
                                    className={`px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-admin ${col.className || ""}`}
                                >
                                    {col.cell
                                        ? col.cell(item)
                                        : (item[col.accessorKey as keyof T] as ReactNode)}
                                </td>
                            ))}
                            {actions && (
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    {actions(item)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
