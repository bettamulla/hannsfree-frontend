"use client";

import { useState } from "react";

export default function Home() {
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);

  const checkout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-xl w-full space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-semibold">HannsFree</h1>
          <p className="text-neutral-400">
            Generate a brand in minutes. Launch today.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
          <input
            className="w-full bg-black border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white"
            placeholder="Brand name"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <button
            onClick={checkout}
            disabled={loading}
            className="w-full bg-white text-black font-medium py-3 rounded-lg hover:opacity-90 transition"
          >
            {loading ? "Redirecting…" : "Unlock Brand Engine — £10"}
          </button>

          <p className="text-xs text-neutral-500 text-center">
            One-time payment · Instant access
          </p>
        </div>
      </div>
    </main>
  );
}
