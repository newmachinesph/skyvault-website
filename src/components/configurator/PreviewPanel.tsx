"use client";

import { useConfigurator } from "./ConfiguratorContext";
import { getOptionLabel } from "@/lib/data/elevator-options";
import { getWarnings } from "@/lib/validation";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export function PreviewPanel() {
  const { config } = useConfigurator();

  const warnings = getWarnings(config);

  const selections = [
    { label: "Cab Type", value: config.cabType, category: "cabType" as const },
    { label: "Cab Size", value: config.cabSize, category: "cabSize" as const },
    {
      label: "Wall Finish",
      value: config.wallFinish,
      category: "wallFinish" as const,
    },
    {
      label: "Floor Type",
      value: config.floorType,
      category: "floorType" as const,
    },
    {
      label: "Ceiling",
      value: config.ceilingType,
      category: "ceilingType" as const,
    },
    {
      label: "Handrail",
      value: config.handrail,
      category: "handrail" as const,
    },
    {
      label: "Lighting",
      value: config.lighting,
      category: "lighting" as const,
    },
    { label: "Mirror", value: config.mirror, category: "mirror" as const },
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white sticky top-4">
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">
          Your Configuration
        </h3>
      </div>
      <div className="px-4 py-3">
        <dl className="divide-y divide-gray-100">
          {selections.map(({ label, value, category }) => (
            <div
              key={label}
              className="flex justify-between py-2 text-sm"
            >
              <dt className="text-gray-500">{label}</dt>
              <dd className="font-medium text-gray-900 text-right ml-2">
                {value ? getOptionLabel(category, value) : "\u2014"}
              </dd>
            </div>
          ))}
        </dl>
        {config.options.length > 0 && (
          <div className="border-t border-gray-100 pt-3 mt-1">
            <dt className="text-sm text-gray-500 mb-2">Accessories</dt>
            <ul className="space-y-1">
              {config.options.map((optId) => (
                <li key={optId} className="text-sm font-medium text-gray-900">
                  {getOptionLabel("options", optId)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {warnings.length > 0 && (
        <div className="border-t border-gray-200 bg-yellow-50 px-4 py-3">
          <div className="flex">
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="size-5 text-yellow-400 shrink-0"
            />
            <div className="ml-2">
              <h4 className="text-xs font-semibold text-yellow-800">
                Suggestions
              </h4>
              {warnings.map((w, i) => (
                <p key={i} className="mt-1 text-xs text-yellow-700">
                  {w}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
