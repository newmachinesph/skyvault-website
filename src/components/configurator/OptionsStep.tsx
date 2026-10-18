"use client";

import { useConfigurator } from "./ConfiguratorContext";
import { SelectionCard } from "./SelectionCard";
import {
  lightingOptions,
  mirrorOptions,
  accessoryOptions,
} from "@/lib/data/elevator-options";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

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

export function OptionsStep() {
  const { config, updateConfig, errors } = useConfigurator();

  const lightingError = errors.find((e) => e.field === "lighting");
  const mirrorError = errors.find((e) => e.field === "mirror");
  const optionsError = errors.find((e) => e.field === "options");

  function toggleOption(optionId: string) {
    const current = config.options;
    if (optionId.startsWith("cop-")) {
      const withoutCop = current.filter((o) => !o.startsWith("cop-"));
      if (current.includes(optionId)) {
        updateConfig({ options: withoutCop });
      } else {
        updateConfig({ options: [...withoutCop, optionId] });
      }
      return;
    }
    if (current.includes(optionId)) {
      updateConfig({ options: current.filter((o) => o !== optionId) });
    } else {
      updateConfig({ options: [...current, optionId] });
    }
  }

  return (
    <div className="space-y-10">
      <div className="border-b border-gray-900/10 pb-6">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Options &amp; Accessories
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          Configure lighting, mirrors, and additional accessories.
        </p>
      </div>

      {/* Lighting */}
      <div>
        <h3 className="text-sm/6 font-semibold text-gray-900 mb-4">
          Lighting
        </h3>
        {lightingError && <InlineError message={lightingError.message} />}
        <fieldset>
          <legend className="sr-only">Lighting</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {lightingOptions.map((l) => (
              <SelectionCard
                key={l.id}
                id={l.id}
                name={l.name}
                description={l.description}
                selected={config.lighting === l.id}
                onSelect={(id) => updateConfig({ lighting: id })}
              />
            ))}
          </div>
        </fieldset>
      </div>

      {/* Mirror */}
      <div>
        <h3 className="text-sm/6 font-semibold text-gray-900 mb-4">Mirror</h3>
        {mirrorError && <InlineError message={mirrorError.message} />}
        <fieldset>
          <legend className="sr-only">Mirror</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {mirrorOptions.map((m) => (
              <SelectionCard
                key={m.id}
                id={m.id}
                name={m.name}
                description={m.description}
                selected={config.mirror === m.id}
                onSelect={(id) => updateConfig({ mirror: id })}
              />
            ))}
          </div>
        </fieldset>
      </div>

      {/* Accessories */}
      <div>
        <h3 className="text-sm/6 font-semibold text-gray-900 mb-1">
          Accessories
        </h3>
        <p className="text-sm/6 text-gray-600 mb-4">Select all that apply.</p>
        {optionsError && <InlineError message={optionsError.message} />}
        <fieldset>
          <legend className="sr-only">Accessories</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {accessoryOptions.map((a) => {
              const checked = config.options.includes(a.id);
              return (
                <label
                  key={a.id}
                  className={cn(
                    "relative flex cursor-pointer rounded-lg border p-4 transition-all focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-400",
                    checked
                      ? "border-brand-400 bg-brand-50/50 ring-2 ring-brand-400"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  )}
                >
                  <div className="flex h-6 shrink-0 items-center">
                    <div className="group grid size-4 grid-cols-1">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleOption(a.id)}
                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-brand-400 checked:bg-brand-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
                      />
                      <svg
                        fill="none"
                        viewBox="0 0 14 14"
                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                      >
                        <path
                          d="M3 8L6 11L11 3.5"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={checked ? "opacity-100" : "opacity-0"}
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <span className="block text-sm font-medium text-gray-900">
                      {a.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-gray-500">
                      {a.description}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
