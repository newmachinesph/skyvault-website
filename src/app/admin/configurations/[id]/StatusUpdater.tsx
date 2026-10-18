"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const statuses = ["new", "reviewed", "quoted", "archived"];

export function StatusUpdater({
  configId,
  currentStatus,
}: {
  configId: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/configurations/${configId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
        router.refresh();
      }
    } catch {
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-x-3">
      <label
        htmlFor="status-select"
        className="text-sm font-medium text-gray-700"
      >
        Status
      </label>
      <select
        id="status-select"
        value={status}
        onChange={(e) => updateStatus(e.target.value)}
        disabled={loading}
        className="rounded-md bg-white py-1.5 pl-3 pr-8 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-400 disabled:opacity-50"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
