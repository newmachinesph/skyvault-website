"use client";

import { useConfigurator } from "./ConfiguratorContext";
import { SelectionCard } from "./SelectionCard";
import { cabTypes } from "@/lib/data/elevator-options";

export function CabSizeStep() {
  const { config, updateConfig } = useConfigurator();

  const selectedCabType = cabTypes.find((ct) => ct.id === config.cabType);

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-900/10 pb-6">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Select Cab Type
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          Choose the type of elevator cab for your project.
        </p>
      </div>

      <fieldset>
        <legend className="sr-only">Cab type</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cabTypes.map((ct) => (
            <SelectionCard
              key={ct.id}
              id={ct.id}
              name={ct.name}
              description={ct.description}
              selected={config.cabType === ct.id}
              onSelect={(id) => updateConfig({ cabType: id, cabSize: "" })}
            />
          ))}
        </div>
      </fieldset>

      {selectedCabType && (
        <div>
          <h3 className="text-base/7 font-semibold text-gray-900 mb-4">
            Select Cab Size
          </h3>
          <fieldset>
            <legend className="sr-only">Cab size</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedCabType.sizes.map((size) => (
                <SelectionCard
                  key={size.id}
                  id={size.id}
                  name={size.label}
                  description={size.capacity}
                  selected={config.cabSize === size.id}
                  onSelect={(id) => updateConfig({ cabSize: id })}
                />
              ))}
            </div>
          </fieldset>
        </div>
      )}
    </div>
  );
}
