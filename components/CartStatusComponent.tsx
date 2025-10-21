"use client";
import React from "react";

export interface CartStatusProps {
  state: number;
  onStepChange?: (step: number) => void;
  className?: string;
  labels?: string[];
}

const DEFAULT_LABELS: string[] = [
  "Shopping cart",
  "Checkout details",
  "Order complete",
];

export default function CartStatus({
  state,
  onStepChange,
  className = "",
  labels = DEFAULT_LABELS,
}: CartStatusProps) {
  const idx = Math.max(0, Math.min(labels.length - 1, state));
  const progressPercent = (idx / (labels.length - 1)) * 100;

  return (
    <nav
      aria-label="Checkout progress"
      className={`w-[600px] max-w-2xl mx-auto px-6 ${className}`}
    >
      <div className="relative py-4">
        {/*Progress bar*/}
        <div className="absolute left-0 right-0 top-15 h-[3px] w-[550px] bg-gray-200" />
        <div
          className="absolute left-0 top-15 h-[3px] bg-gray-900 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />

        <ul
          role="list"
          className="relative z-10 flex justify-between items-center"
        >
          {labels.map((label, i) => {
            const isActive = i === idx;
            const isCompleted = i < idx;

            return (
              <li
                key={label}
                className="flex-1 min-w-[120px] cursor-pointer"
                onClick={() => onStepChange?.(i)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center justify-center rounded-full w-8 h-8 text-sm font-medium shrink-0 transition-all duration-200 ${
                      isActive
                        ? "bg-gray-900 text-white scale-110"
                        : isCompleted
                        ? "bg-gray-900 text-white/90"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div
                    className={`text-sm ${
                      isActive
                        ? "font-semibold text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {label}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
