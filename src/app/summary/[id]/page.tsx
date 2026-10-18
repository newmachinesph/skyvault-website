import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getOptionLabel } from "@/lib/data/elevator-options";
import { Navbar } from "@/components/Navbar";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default async function SummaryPage({
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

  const sections = [
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
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Success banner */}
        <div className="text-center mb-10">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircleIcon
              aria-hidden="true"
              className="size-10 text-green-600"
            />
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-gray-900">
            Configuration Submitted
          </h1>
          <p className="mt-2 text-sm/6 text-gray-600">
            Thank you! We will review your configuration and get in touch soon.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Reference:{" "}
            <span className="font-mono text-gray-700">{config.id}</span>
          </p>
        </div>

        {/* Configuration summary */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">
              Configuration Summary
            </h2>
          </div>
          <div className="px-6 py-4">
            <dl className="divide-y divide-gray-100">
              {sections.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between py-3 text-sm"
                >
                  <dt className="text-gray-500">{label}</dt>
                  <dd className="font-medium text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>

            {options.length > 0 && (
              <div className="border-t border-gray-100 pt-4 mt-1">
                <dt className="text-sm text-gray-500 mb-2">Accessories</dt>
                <ul className="space-y-1">
                  {options.map((optId) => (
                    <li
                      key={optId}
                      className="text-sm font-medium text-gray-900"
                    >
                      &bull; {getOptionLabel("options", optId)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Contact info */}
        {config.lead && (
          <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <h2 className="text-base font-semibold text-gray-900">
                Contact Information
              </h2>
            </div>
            <div className="px-6 py-4">
              <dl className="divide-y divide-gray-100">
                <div className="flex justify-between py-3 text-sm">
                  <dt className="text-gray-500">Name</dt>
                  <dd className="font-medium text-gray-900">
                    {config.lead.name}
                  </dd>
                </div>
                <div className="flex justify-between py-3 text-sm">
                  <dt className="text-gray-500">Company</dt>
                  <dd className="font-medium text-gray-900">
                    {config.lead.company}
                  </dd>
                </div>
                <div className="flex justify-between py-3 text-sm">
                  <dt className="text-gray-500">Email</dt>
                  <dd className="font-medium text-gray-900">
                    {config.lead.email}
                  </dd>
                </div>
                {config.lead.phone && (
                  <div className="flex justify-between py-3 text-sm">
                    <dt className="text-gray-500">Phone</dt>
                    <dd className="font-medium text-gray-900">
                      {config.lead.phone}
                    </dd>
                  </div>
                )}
                {config.lead.projectInfo && (
                  <div className="py-3">
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

        {/* Actions */}
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <a
            href={`/api/pdf/${config.id}`}
            className="rounded-md bg-brand-400 px-3.5 py-2.5 text-sm font-semibold text-navy-900 shadow-xs hover:bg-brand-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          >
            Download PDF
          </a>
          <Link
            href="/configure"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            New Configuration
          </Link>
        </div>
      </main>
    </div>
  );
}
