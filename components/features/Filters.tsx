"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  ArrowUpDown,
  DollarSign,
  Tag,
  RotateCcw,
  Filter
} from "lucide-react";

type Props = {
  categories: string[];
};

export const Filters = ({ categories }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Controlled states
  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const selectedCategory = searchParams.get("category") || "";
  const selectedSort = searchParams.get("sort") || "";

  // Helper to update URL
  const updateURL = useCallback((params: URLSearchParams) => {
    const query = params.toString();
    router.replace(query ? `/products?${query}` : "/products");
  }, []);

  // Debounced price filters
  useEffect(() => {
  const timeoutId = setTimeout(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (min && parseFloat(min) >= 0) {
      params.set("min", min);
    } else {
      params.delete("min");
    }

    if (max && parseFloat(max) >= 0) {
      params.set("max", max);
    } else {
      params.delete("max");
    }

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    // only navigate if changed
    if (nextQuery !== currentQuery) {
      router.replace(
        nextQuery ? `/products?${nextQuery}` : "/products"
      );
    }
  }, 500);

  return () => clearTimeout(timeoutId);
}, [min, max]);

  useEffect(() => {
  setMin(searchParams.get("min") || "");
  setMax(searchParams.get("max") || "");
}, [searchParams]);

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
    setIsMobileFiltersOpen(false);
  };

  // Get active filters count
  const activeFiltersCount = [
    selectedCategory,
    min,
    max,
    selectedSort
  ].filter(Boolean).length;

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden w-full">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="w-full flex items-center justify-between gap-3 px-5 py-3 bg-black/50 border border-[#FFBF00]/20 rounded-xl text-white hover:border-[#FFBF00]/40 transition-all duration-300 group"
        >
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-[#FFBF00]" />
            <span className="font-medium">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="px-2 py-0.5 text-xs bg-[#FFBF00] text-black rounded-full font-semibold">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#FFBF00] transition-colors" />
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:flex flex-wrap items-center gap-4">
        {/* Category Filter */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Tag className="w-4 h-4 text-gray-500 group-focus-within:text-[#FFBF00] transition-colors" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategory(e.target.value)}
            className="pl-9 pr-8 py-2.5 bg-black/50 border border-[#FFBF00]/20 rounded-xl text-gray-300 focus:text-white focus:border-[#FFBF00]/60 focus:outline-none appearance-none cursor-pointer hover:border-[#FFBF00]/40 transition-all duration-200 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="capitalize">
                {cat}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-500 group-focus-within:text-[#FFBF00] transition-colors" />
          </div>
        </div>

        {/* Price Range */}
        <div className="flex items-center gap-2 bg-black/50 border border-[#FFBF00]/20 rounded-xl px-2 focus-within:border-[#FFBF00]/60 transition-all duration-200">
          <div className="flex items-center gap-1 pl-2">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">Min</span>
          </div>
          <input
            type="number"
            placeholder="0"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-20 py-2.5 bg-transparent text-gray-300 placeholder-gray-600 focus:outline-none text-sm"
          />
          <span className="text-gray-600">-</span>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">Max</span>
          </div>
          <input
            type="number"
            placeholder="1000"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-20 py-2.5 bg-transparent text-gray-300 placeholder-gray-600 focus:outline-none text-sm"
          />
        </div>

        {/* Sort Filter */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <ArrowUpDown className="w-4 h-4 text-gray-500 group-focus-within:text-[#FFBF00] transition-colors" />
          </div>
          <select
            value={selectedSort}
            onChange={(e) => handleSort(e.target.value)}
            className="pl-9 pr-8 py-2.5 bg-black/50 border border-[#FFBF00]/20 rounded-xl text-gray-300 focus:text-white focus:border-[#FFBF00]/60 focus:outline-none appearance-none cursor-pointer hover:border-[#FFBF00]/40 transition-all duration-200 text-sm"
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-500 group-focus-within:text-[#FFBF00] transition-colors" />
          </div>
        </div>

        {/* Reset Button */}
        {activeFiltersCount > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-400 hover:text-red-400 transition-all duration-200 group"
          >
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Reset
          </button>
        )}
      </div>

      {/* Mobile Filters Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          
          {/* Modal */}
          <div className="absolute bottom-0 left-0 right-0 bg-black border-t border-[#FFBF00]/20 rounded-t-2xl shadow-2xl animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#FFBF00]/20">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#FFBF00]" />
                <h3 className="text-lg font-semibold text-white">Filters</h3>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 text-xs bg-[#FFBF00] text-black rounded-full font-semibold">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#FFBF00]/10 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Category Section */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <Tag className="w-4 h-4 text-[#FFBF00]" />
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategory("")}
                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                      selectedCategory === ""
                        ? "bg-[#FFBF00] text-black font-semibold"
                        : "bg-black/50 border border-[#FFBF00]/20 text-gray-300 hover:border-[#FFBF00]/40"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm capitalize transition-all duration-200 ${
                        selectedCategory === cat
                          ? "bg-[#FFBF00] text-black font-semibold"
                          : "bg-black/50 border border-[#FFBF00]/20 text-gray-300 hover:border-[#FFBF00]/40"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Section */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <DollarSign className="w-4 h-4 text-[#FFBF00]" />
                  Price Range
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Min"
                      value={min}
                      onChange={(e) => setMin(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black/50 border border-[#FFBF00]/20 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#FFBF00]/60 transition-all"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Max"
                      value={max}
                      onChange={(e) => setMax(e.target.value)}
                      className="w-full px-4 py-2.5 bg-black/50 border border-[#FFBF00]/20 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-[#FFBF00]/60 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Sort Section */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                  <ArrowUpDown className="w-4 h-4 text-[#FFBF00]" />
                  Sort By
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => handleSort("")}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      selectedSort === ""
                        ? "bg-[#FFBF00]/10 border border-[#FFBF00] text-[#FFBF00]"
                        : "bg-black/50 border border-[#FFBF00]/20 text-gray-300"
                    }`}
                  >
                    Default
                  </button>
                  <button
                    onClick={() => handleSort("price-asc")}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      selectedSort === "price-asc"
                        ? "bg-[#FFBF00]/10 border border-[#FFBF00] text-[#FFBF00]"
                        : "bg-black/50 border border-[#FFBF00]/20 text-gray-300"
                    }`}
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => handleSort("price-desc")}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 ${
                      selectedSort === "price-desc"
                        ? "bg-[#FFBF00]/10 border border-[#FFBF00] text-[#FFBF00]"
                        : "bg-black/50 border border-[#FFBF00]/20 text-gray-300"
                    }`}
                  >
                    Price: High to Low
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-[#FFBF00]/20 flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-3 border border-[#FFBF00]/30 text-[#FFBF00] rounded-xl font-medium hover:bg-[#FFBF00]/10 transition-all duration-200"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 px-4 py-3 bg-[#FFBF00] text-black rounded-xl font-semibold hover:bg-[#FFBF00]/90 transition-all duration-200"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};