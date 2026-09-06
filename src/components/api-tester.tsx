"use client";

import { useState } from "react";
import { Icon } from "./icon";

export function ApiTester({ baseUrl }: { baseUrl: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function runTest() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/try?url=${encodeURIComponent(baseUrl)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Request failed");
      setResult(JSON.stringify(json.data, null, 2).slice(0, 4000));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="brutal-box-sm bg-[var(--card-bg)] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
          <Icon name="faBolt" className="h-4 w-4 text-[var(--color-pink)]" />
          Live API Tester
        </p>
        <button
          type="button"
          onClick={runTest}
          disabled={loading}
          className="btn-glow px-4 py-2 text-xs font-bold uppercase disabled:opacity-60"
        >
          {loading ? "Calling API..." : "Send real request"}
        </button>
      </div>
      {error && <p className="mt-3 text-sm font-semibold text-red-500">⚠ {error}</p>}
      {result && (
        <pre className="mt-3 max-h-72 overflow-auto border-2 border-[var(--border-color)] bg-[var(--bg)] p-3 text-xs">
          {result}
        </pre>
      )}
    </div>
  );
}
