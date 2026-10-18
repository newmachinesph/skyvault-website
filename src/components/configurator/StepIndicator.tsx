"use client";

import { CheckIcon } from "@heroicons/react/24/solid";

const steps = [
  { id: "01", name: "Cab Size" },
  { id: "02", name: "Finishes" },
  { id: "03", name: "Options" },
  { id: "04", name: "Contact" },
];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol
        role="list"
        className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
      >
        {steps.map((step, stepIdx) => {
          const status =
            stepIdx < currentStep
              ? "complete"
              : stepIdx === currentStep
                ? "current"
                : "upcoming";

          return (
            <li key={step.name} className="relative md:flex md:flex-1">
              {status === "complete" ? (
                <div className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-800">
                      <CheckIcon
                        aria-hidden="true"
                        className="size-6 text-brand-400"
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium text-navy-800">
                      {step.name}
                    </span>
                  </span>
                </div>
              ) : status === "current" ? (
                <div
                  aria-current="step"
                  className="flex items-center px-6 py-4 text-sm font-medium"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-brand-400">
                    <span className="text-brand-500">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-brand-500">
                    {step.name}
                  </span>
                </div>
              ) : (
                <div className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
                      <span className="text-gray-500">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500">
                      {step.name}
                    </span>
                  </span>
                </div>
              )}

              {stepIdx !== steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-0 hidden h-full w-5 md:block"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 22 80"
                    preserveAspectRatio="none"
                    className="size-full text-gray-300"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      stroke="currentcolor"
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
