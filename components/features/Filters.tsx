"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  categories: string[];
};

export const Filters = ({ categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Controlled states
  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");

  const selectedCategory = searchParams.get("category") || "";
  const selectedSort = searchParams.get("sort") || "";

  // Helper to update URL
  const updateURL = (params: URLSearchParams) => {
    const query = params.toString();
    router.replace(query ? `/products?${query}` : "/products");
  };

  // Debounce MIN
  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (min) params.set("min", min);
      else params.delete("min");

      updateURL(params);
    }, 500);

    return () => clearTimeout(delay);
  }, [min]);

  // Debounce MAX
  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (max) params.set("max", max);
      else params.delete("max");

      updateURL(params);
    }, 500);

    return () => clearTimeout(delay);
  }, [max]);

  // Category change
  const handleCategory = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("category", value);
    else params.delete("category");

    updateURL(params);
  };

  // Sort change
  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("sort", value);
    else params.delete("sort");

    updateURL(params);
  };

  // Reset all filters
  const handleReset = () => {
    setMin("");
    setMax("");
    router.replace("/products");
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 flex-wrap items-center">

      {/* Category */}
      <select
        value={selectedCategory}
        onChange={(e) => handleCategory(e.target.value)}
        className="border border-gray-200 bg-black rounded-lg px-4 py-2 focus:outline-none"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Min Price */}
      <input
        type="number"
        placeholder="Min Price"
        value={min}
        onChange={(e) => setMin(e.target.value)}
        className="border border-gray-200 rounded-lg px-4 py-2 w-32 focus:outline-none"
      />

      {/* Max Price */}
      <input
        type="number"
        placeholder="Max Price"
        value={max}
        onChange={(e) => setMax(e.target.value)}
        className="border border-gray-200 rounded-lg px-4 py-2 w-32 focus:outline-none"
      />

      {/* Sort */}
      <select
        value={selectedSort}
        onChange={(e) => handleSort(e.target.value)}
        className="border border-gray-200 rounded-lg bg-black px-4 py-2 focus:outline-none"
      >
        <option value="">Sort</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
      </select>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="px-4 py-2 border border-gray-200 rounded-lg hover:scale-105 transition cursor-pointer"
      >
        Reset
      </button>

    </div>
  );
};