"use client";
import axios from "axios";
import { useState } from "react";

export default function CreateBrand({ refresh }) {
  const [name, setName] = useState("");
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);

  async function createBrand() {
    if (!name || !niche) return alert("Enter name + niche");

    setLoading(true);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND}/brand/create`, {
        name,
        niche
      });

      setName("");
      setNiche("");
      refresh();
    } catch (err) {
      console.log(err.message);
    }

    setLoading(false);
  }

  return (
    <div className="card mb-6 space-y-3">
      <h2 className="font-semibold text-lg">Create Brand</h2>

      <input
        className="input"
        placeholder="Brand Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="input"
        placeholder="Niche e.g. Fashion, Tech SaaS"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
      />

      <button className="button w-full" onClick={createBrand} disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
}
