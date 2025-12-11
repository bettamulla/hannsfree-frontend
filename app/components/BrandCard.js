"use client";

export default function BrandCard({ brand }) {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h3 className="font-semibold">{brand.name}</h3>
    </div>
  );
}
