"use client";

import { useState } from "react";

export default function CreateBrand({ onCreate }) {
  const [name, setName] = useState("");

  return (
    <div className="flex items-center gap-2">
      <input
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black/10 outline-none"
        placeholder="Brand Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 transition"
        onClick={() => {
          onCreate(name);
          setName("");
        }}
      >
        Create
      </button>
    </div>
  );
}
