"use client";

import { useState } from "react";
import CreateBrand from "./components/CreateBrand";
import BrandCard from "./components/BrandCard";

export default function Page() {
  const [brands, setBrands] = useState([]);

  const handleCreate = (name) => {
    if (!name.trim()) return;
    setBrands([...brands, { name }]);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#111] px-6 py-10">
      <div className="max-w-lg mx-auto space-y-10">
        
        {/* HEADER */}
        <header className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            HannsFree — Brand Engine
          </h1>
          <p className="text-sm text-gray-500">
            Simple, fast brand ideation & automation.
          </p>
        </header>

        {/* CREATE BRAND CARD */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium mb-3">Create Brand</h2>
          <CreateBrand onCreate={handleCreate} />
        </div>

        {/* BRAND LIST */}
        <div className="space-y-3">
          {brands.length === 0 ? (
            <p className="text-center text-gray-500 text-sm">
              No brands created yet. Start by adding one above.
            </p>
          ) : (
            brands.map((brand, i) => (
              <BrandCard key={i} brand={brand} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
