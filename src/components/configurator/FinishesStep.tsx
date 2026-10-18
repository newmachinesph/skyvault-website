"use client";

import { useConfigurator } from "./ConfiguratorContext";
import { SelectionCard } from "./SelectionCard";
import {
  wallFinishes,
  floorTypes,
  ceilingTypes,
  handrailOptions,
} from "@/lib/data/elevator-options";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

function InlineError({ message }: { message: string }) {
  return (
    <div className="rounded-md bg-red-50 p-3 mb-3">
      <div className="flex">
        <ExclamationTriangleIcon
          aria-hidden="true"
          className="size-5 text-red-400 shrink-0"
        />
        <p className="ml-2 text-sm text-red-700">{message}</p>
      </div>
    </div>
  );
}

export function FinishesStep() {
  const { config, updateConfig, errors } = useConfigurator();

  const wallError = errors.find((e) => e.field === "wallFinish");
  const floorError = errors.find((e) => e.field === "floorType");

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-900/10 pb-6">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Choose Finishes &amp; Materials
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          Select the materials for walls, floor, ceiling, and handrails.
        </p>
      </div>

      {/* Wall Finish */}
      <div>
        <h3 className="text-sm/6 font-semibold text-gray-900 mb-4">
          Wall Finish
        </h3>
        {wallError && <InlineError message={wallError.message} />}
        <fieldset>
          <legend className="sr-only">Wall finish</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wallFinishes.map((w) => (
              <SelectionCard
                key={w.id}
                id={w.id}
                name={w.name}
                description={w.description}
                selected={config.wallFinish === w.id}
                onSelect={(id) => updateConfig({ wallFinish: id })}
              />
            ))}
          </div>
        </fieldset>
      </div>

      {/* Floor Type */}
      <div>
        <h3 className="text-sm/6 font-semibold text-gray-900 mb-4">
          Floor Type
        </h3>
        {floorError && <InlineError message={floorError.message} />}
        <fieldset>
          <legend className="sr-only">Floor type</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {floorTypes.map((f) => (
              <SelectionCard
                key={f.id}
                id={f.id}
                name={f.name}
                description={f.description}
                selected={config.floorType === f.id}
                onSelect={(id) => updateConfig({ floorType: id })}
              />
            ))}
          </div>
        </fieldset>
      </div>

      {/* Ceiling Type */}
      <div>
        <h3 className="text-sm/6 font-semibold text-gray-900 mb-4">
          Ceiling Type
        </h3>
        <fieldset>
          <legend className="sr-only">Ceiling type</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ceilingTypes.map((c) => (
              <SelectionCard
                key={c.id}
                id={c.id}
                name={c.name}
                description={c.description}
                selected={config.ceilingType === c.id}
                onSelect={(id) => updateConfig({ ceilingType: id })}
              />
            ))}
          </div>
        </fieldset>
      </div>

      {/* Handrail */}
      <div>
        <h3 className="text-sm/6 font-semibold text-gray-900 mb-4">
          Handrail
        </h3>
        <fieldset>
          <legend className="sr-only">Handrail</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {handrailOptions.map((h) => (
              <SelectionCard
                key={h.id}
                id={h.id}
                name={h.name}
                description={h.description}
                selected={config.handrail === h.id}
                onSelect={(id) => updateConfig({ handrail: id })}
              />
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
