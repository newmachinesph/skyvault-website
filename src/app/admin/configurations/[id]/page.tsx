import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getOptionLabel } from "@/lib/data/elevator-options";
import Link from "next/link";
import { StatusUpdater } from "./StatusUpdater";
import {
  ChevronRightIcon,
  HomeIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/20/solid";

export const dynamic = "force-dynamic";

export default async function AdminConfigDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const config = await prisma.configuration.findUnique({
    where: { id },
    include: { lead: true },
  });

  if (!config) notFound();

  const options: string[] = JSON.parse(config.options);

  const details = [
    { label: "Cab Type", value: getOptionLabel("cabType", config.cabType) },
    { label: "Cab Size", value: getOptionLabel("cabSize", config.cabSize) },
    {
      label: "Wall Finish",
      value: getOptionLabel("wallFinish", config.wallFinish),
    },
    {
      label: "Floor Type",
      value: getOptionLabel("floorType", config.floorType),
    },
    {
      label: "Ceiling Type",
      value: getOptionLabel("ceilingType", config.ceilingType),
    },
    { label: "Handrail", value: getOptionLabel("handrail", config.handrail) },
    { label: "Lighting", value: getOptionLabel("lighting", config.lighting) },
    { label: "Mirror", value: getOptionLabel("mirror", config.mirror) },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol role="list" className="flex items-center space-x-2">
          <li>
            <Link href="/admin" className="text-gray-400 hover:text-gray-500">
              <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                className="size-5 shrink-0 text-gray-400"
              />
              <span className="ml-2 text-sm font-medium text-gray-500">
                Configuration Detail
              </span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Configuration Detail
          </h1>
          <p className="mt-1 text-sm font-mono text-gray-500">{config.id}</p>
        </div>
        <div className="mt-4 flex shrink-0 gap-x-3 md:mt-0 md:ml-4">
          <StatusUpdater configId={config.id} currentStatus={config.status} />
        </div>
      </div>

      {/* Two-column cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Configuration */}
        <div className="overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-gray-900/5">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
            <h2 className="text-base font-semibold text-gray-900">
              Cab Configuration
            </h2>
          </div>
          <div className="px-4 py-4 sm:px-6">
            <dl className="divide-y divide-gray-100">
              {details.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between py-2.5 text-sm"
                >
                  <dt className="text-gray-500">{label}</dt>
                  <dd className="font-medium text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
            {options.length > 0 && (
              <div className="border-t border-gray-100 pt-3 mt-1">
                <dt className="text-sm text-gray-500 mb-2">Accessories</dt>
                <ul className="space-y-1">
                  {options.map((o) => (
                    <li
                      key={o}
                      className="text-sm font-medium text-gray-900"
                    >
                      &bull; {getOptionLabel("options", o)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Contact */}
        {config.lead && (
          <div className="overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-gray-900/5">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
              <h2 className="text-base font-semibold text-gray-900">
                Contact Information
              </h2>
            </div>
            <div className="px-4 py-4 sm:px-6">
              <dl className="divide-y divide-gray-100">
                <div className="flex justify-between py-2.5 text-sm">
                  <dt className="text-gray-500">Name</dt>
                  <dd className="font-medium text-gray-900">
                    {config.lead.name}
                  </dd>
                </div>
                <div className="flex justify-between py-2.5 text-sm">
                  <dt className="text-gray-500">Company</dt>
                  <dd className="font-medium text-gray-900">
                    {config.lead.company}
                  </dd>
                </div>
                <div className="flex justify-between py-2.5 text-sm">
                  <dt className="text-gray-500">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${config.lead.email}`}
                      className="font-medium text-brand-500 hover:text-brand-700"
                    >
                      {config.lead.email}
                    </a>
                  </dd>
                </div>
                {config.lead.phone && (
                  <div className="flex justify-between py-2.5 text-sm">
                    <dt className="text-gray-500">Phone</dt>
                    <dd className="font-medium text-gray-900">
                      {config.lead.phone}
                    </dd>
                  </div>
                )}
                {config.lead.projectInfo && (
                  <div className="py-2.5">
                    <dt className="text-sm text-gray-500">Project Info</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {config.lead.projectInfo}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-x-3">
        <a
          href={`/api/pdf/${config.id}`}
          target="_blank"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-brand-400 px-3 py-2 text-sm font-semibold text-navy-900 shadow-xs hover:bg-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
        >
          <ArrowDownTrayIcon aria-hidden="true" className="-ml-0.5 size-5" />
          Download PDF
        </a>
      </div>

      {/* Timestamps */}
      <div className="mt-4 text-xs text-gray-500">
        Created: {config.createdAt.toLocaleString()} | Updated:{" "}
        {config.updatedAt.toLocaleString()}
      </div>
    </div>
  );
}
