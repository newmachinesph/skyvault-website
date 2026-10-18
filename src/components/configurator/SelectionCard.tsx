"use client";

import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";

interface SelectionCardProps {
  id: string;
  name: string;
  description: string;
  selected: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
}

export function SelectionCard({
  id,
  name,
  description,
  selected,
  onSelect,
  disabled,
}: SelectionCardProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onSelect(id)}
      disabled={disabled}
      className={cn(
        "group relative flex w-full rounded-lg border p-4 text-left transition-all focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400",
        selected
          ? "border-brand-400 bg-brand-50/50 ring-2 ring-brand-400"
          : "border-gray-300 bg-white hover:border-gray-400",
        disabled && "cursor-not-allowed opacity-50"
      )}
    >
      <div className="flex-1">
        <span className="block text-sm font-medium text-navy-800">
          {name}
        </span>
        <span className="mt-1 block text-sm text-navy-400">
          {description}
        </span>
      </div>
      <CheckCircleIcon
        aria-hidden="true"
        className={cn(
          "size-5 text-brand-500 shrink-0 ml-3 mt-0.5",
          selected ? "visible" : "invisible"
        )}
      />
    </button>
  );
}
