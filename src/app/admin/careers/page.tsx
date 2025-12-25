import { getD1Database } from "@/lib/db";
import { CareerApplication } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminCareersPage() {
  const db = await getD1Database();
  const { results } = await db
    .prepare("SELECT * FROM career_applications ORDER BY created_at DESC")
    .run<CareerApplication>();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Job Applications</h1>
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-700 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Position</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">CV</th>
                <th className="px-6 py-4">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    No applications received yet.
                  </td>
                </tr>
              ) : (
                results.map((app: CareerApplication) => (
                  <tr key={app.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        app.status === 'reviewed' ? 'bg-blue-100 text-blue-700' :
                        app.status === 'hired' ? 'bg-green-100 text-green-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {app.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {app.position}
                    </td>
                    <td className="px-6 py-4 text-slate-900">
                      {app.name}
                    </td>
                    <td className="px-6 py-4 space-y-1">
                      <div className="text-slate-600">{app.email}</div>
                      <div className="text-slate-500 text-xs">{app.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      {app.cv_link ? (
                        <a 
                          href={app.cv_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:underline"
                        >
                          View CV
                        </a>
                      ) : (
                        <span className="text-slate-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-slate-600" title={app.message}>
                      {app.message || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
