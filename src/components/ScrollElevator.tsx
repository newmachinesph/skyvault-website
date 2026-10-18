"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollElevator() {
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const y = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? y / maxScroll : 0);

      if (y > lastScrollY.current) setDirection("down");
      else if (y < lastScrollY.current) setDirection("up");
      lastScrollY.current = y;
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Which floor is closest (0-4 maps to 5 floors)
  const currentFloor = Math.round(progress * 4);

  return (
    <div
      aria-hidden="true"
      className="fixed right-5 top-0 z-[60] pointer-events-none hidden lg:flex items-center"
      style={{ height: "100vh" }}
    >
      <div className="relative" style={{ height: "calc(100vh - 140px)" }}>
        {/* Shaft rail */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1.5px] bg-brand-200 rounded-full" />

        {/* Floor markers */}
        {Array.from({ length: 5 }).map((_, i) => {
          const isActive = i === currentFloor;
          return (
            <div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center"
              style={{ top: `${(i / 4) * 100}%` }}
            >
              {/* Dot */}
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isActive
                    ? "bg-brand-400 shadow-[0_0_6px_rgba(201,169,91,0.5)]"
                    : "bg-gray-300"
                }`}
              />
              {/* Floor label */}
              <span
                className={`ml-3 text-[10px] font-mono tabular-nums transition-colors duration-300 ${
                  isActive ? "text-brand-500" : "text-gray-300"
                }`}
              >
                {5 - i}F
              </span>
            </div>
          );
        })}

        {/* Cable from top of shaft to cab */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-brand-200 origin-top"
          style={{
            height: `${progress * 100}%`,
            transition: "height 0.15s ease-out",
          }}
        />

        {/* Elevator cab */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${progress * 100}%`,
            transition: "top 0.15s ease-out",
          }}
        >
          <div className="relative">
            {/* Cab body */}
            <div className="w-8 h-10 bg-navy-800 rounded-lg shadow-lg shadow-navy-800/20 border border-brand-400/30 flex flex-col items-center gap-0.5 pt-1.5 pb-1 overflow-hidden">
              {/* Window */}
              <div className="w-5 h-2 rounded-sm bg-brand-400/40" />
              {/* Doors */}
              <div className="flex gap-[1px] flex-1 w-full px-1 mt-0.5">
                <div className="flex-1 bg-brand-400/25 rounded-sm" />
                <div className="flex-1 bg-brand-400/25 rounded-sm" />
              </div>
            </div>
            {/* Up/down arrows under cab */}
            <div className="flex justify-center mt-1 gap-0.5">
              <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                className={`transition-colors duration-300 ${
                  direction === "up"
                    ? "text-brand-400"
                    : "text-gray-300"
                }`}
              >
                <path d="M3 0.5L5.5 4.5H0.5Z" fill="currentColor" />
              </svg>
              <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                className={`transition-colors duration-300 ${
                  direction === "down"
                    ? "text-brand-400"
                    : "text-gray-300"
                }`}
              >
                <path d="M3 5.5L0.5 1.5H5.5Z" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
