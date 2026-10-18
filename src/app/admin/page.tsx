import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getOptionLabel } from "@/lib/data/elevator-options";
import {
  ClipboardDocumentListIcon,
  InboxIcon,
  EyeIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

const statusStyles: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 ring-blue-600/20",
  reviewed: "bg-yellow-50 text-yellow-800 ring-yellow-600/20",
  quoted: "bg-green-50 text-green-700 ring-green-600/20",
  archived: "bg-gray-50 text-gray-600 ring-gray-500/10",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const configurations = await prisma.configuration.findMany({
    include: { lead: true },
    orderBy: { createdAt: "desc" },
  });

  const stats = [
    {
      name: "Total",
      value: configurations.length,
      icon: ClipboardDocumentListIcon,
    },
    {
      name: "New",
      value: configurations.filter((c) => c.status === "new").length,
      icon: InboxIcon,
    },
    {
      name: "Reviewed",
      value: configurations.filter((c) => c.status === "reviewed").length,
      icon: EyeIcon,
    },
    {
      name: "Quoted",
      value: configurations.filter((c) => c.status === "quoted").length,
      icon: DocumentCheckIcon,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage elevator cab configuration submissions.
          </p>
        </div>
      </div>

      {/* Stats */}
      <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow-xs ring-1 ring-gray-900/5 sm:px-6"
          >
            <dt>
              <div className="absolute rounded-md bg-navy-800 p-3">
                <stat.icon aria-hidden="true" className="size-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      {/* Table */}
      <div className="mt-8 flow-root">
        {configurations.length === 0 ? (
          <div className="text-center py-16">
            <ClipboardDocumentListIcon className="mx-auto size-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              No configurations
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Configurations will appear here once customers submit them.
            </p>
          </div>
        ) : (
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden rounded-lg shadow-xs ring-1 ring-gray-900/5">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Contact
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Company
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Cab Type
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {configurations.map((config) => (
                      <tr key={config.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                          {config.createdAt.toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className="font-medium text-gray-900">
                            {config.lead?.name}
                          </div>
                          <div className="mt-0.5 text-gray-500">
                            {config.lead?.email}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {config.lead?.company}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {getOptionLabel("cabType", config.cabType)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[config.status] || statusStyles.new}`}
                          >
                            {config.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href={`/admin/configurations/${config.id}`}
                            className="text-brand-500 hover:text-brand-700"
                          >
                            View
                            <span className="sr-only">
                              , {config.lead?.name}
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
