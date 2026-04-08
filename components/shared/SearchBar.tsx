"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { searchProducts } from "@/services/products";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { 
  Search, 
  X, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  Loader2,
  Package,
  Sparkles
} from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored).slice(0, 5));
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }
  }, []);

  // Save recent search
  const saveRecentSearch = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s !== searchTerm);
      const updated = [searchTerm, ...filtered].slice(0, 5);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear search and close dropdown
  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    setLoading(false);
  }, []);

  // Handle product click
  const handleProductClick = useCallback(
    (productId: number, productTitle?: string) => {
      if (productTitle) {
        saveRecentSearch(productTitle);
      }
      clearSearch();
      router.push(`/products/${productId}`);
    },
    [clearSearch, router, saveRecentSearch]
  );

  // Handle "View All Results" click
  const handleViewAllResults = useCallback(() => {
    if (query.trim()) {
      saveRecentSearch(query);
      clearSearch();
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }, [query, clearSearch, router, saveRecentSearch]);

  // Debounced search function
  const performSearch = useDebouncedCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setLoading(false);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    try {
      const data = await searchProducts(searchQuery);
      setResults(data.slice(0, 5));
      setIsOpen(true);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, 400);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    if (!value.trim()) {
      setResults([]);
      setIsOpen(false);
      setLoading(false);
      return;
    }

    performSearch(value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleProductClick(
            results[selectedIndex].id,
            results[selectedIndex].title
          );
        } else if (query.trim()) {
          handleViewAllResults();
        }
        break;

      case "Escape":
        clearSearch();
        inputRef.current?.blur();
        break;
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clear on route change
  useEffect(() => {
    const handleRouteChange = () => {
      clearSearch();
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, [clearSearch]);

  // Memoize results rendering
  const resultItems = useMemo(() => {
    return results.map((item, index) => (
      <button
        key={item.id}
        onClick={() => handleProductClick(item.id, item.title)}
        className={`w-full flex items-center gap-3 p-3 transition-all duration-200 text-left cursor-pointer group ${
          selectedIndex === index
            ? "bg-gradient-to-r from-[#FFBF00]/10 to-transparent border-l-2 border-[#FFBF00]"
            : "hover:bg-[#FFBF00]/5"
        }`}
      >
        <div className="relative w-12 h-12 flex-shrink-0 bg-gradient-to-br from-gray-900 to-black rounded-lg border border-[#FFBF00]/20 overflow-hidden group-hover:border-[#FFBF00]/40 transition-colors duration-200">
          <Image
            src={item.image}
            alt={item.title}
            fill
            loading="eager"
            sizes="48px"
            className="object-contain p-1.5"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-200 line-clamp-1 group-hover:text-[#FFBF00] transition-colors duration-200">
            {item.title}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-sm font-semibold text-[#FFBF00]">
              ${item.price.toFixed(2)}
            </p>
            {item.category && (
              <span className="text-xs text-gray-500 capitalize">{item.category}</span>
            )}
          </div>
        </div>
        
        <ArrowRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-[#FFBF00] transition-all duration-200 group-hover:translate-x-1" />
      </button>
    ));
  }, [results, selectedIndex, handleProductClick]);

  // Suggestions for empty search
  const suggestions = ["electronics", "jewelery", "men's clothing", "women's clothing"];

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative group">
        {/* Search Icon */}
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#FFBF00] transition-colors duration-200" />
        
        <input
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if ((query.trim() && results.length > 0) || recentSearches.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder="Search products..."
          className="w-full bg-black/50 text-white placeholder-gray-500 border border-[#FFBF00]/20 rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:border-[#FFBF00]/60 focus:bg-black/70 transition-all duration-200"
          aria-label="Search"
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-4 h-4 text-[#FFBF00] animate-spin" />
          </div>
        )}

        {/* Clear Button */}
        {query && !loading && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-400 transition-colors duration-200 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-black/95 backdrop-blur-md border border-[#FFBF00]/20 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          {/* Loading State */}
          {loading && (
            <div className="p-8 text-center">
              <Loader2 className="w-6 h-6 text-[#FFBF00] animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-400">Searching products...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && query && results.length === 0 && (
            <div className="p-8 text-center">
              <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-400 mb-1">No products found</p>
              <p className="text-xs text-gray-500 mb-4">Try different keywords</p>
              <button
                onClick={handleViewAllResults}
                className="inline-flex items-center gap-2 text-sm text-[#FFBF00] hover:text-[#FFBF00]/80 transition-colors duration-200 group"
              >
                Search for "{query}" 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <>
              <div className="px-4 py-2 border-b border-[#FFBF00]/20 bg-gradient-to-r from-[#FFBF00]/5 to-transparent">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#FFBF00]" />
                  <p className="text-xs font-medium text-[#FFBF00] uppercase tracking-wider">
                    Products ({results.length})
                  </p>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {resultItems}
              </div>

              <div className="p-2 border-t border-[#FFBF00]/20 bg-[#FFBF00]/5">
                <button
                  onClick={handleViewAllResults}
                  className="w-full flex items-center justify-center gap-2 text-sm text-[#FFBF00] hover:text-[#FFBF00]/80 py-2 rounded-lg transition-all duration-200 group"
                >
                  View all results for "{query}"
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </>
          )}

          {/* Recent Searches (shown when no query) */}
          {!loading && !query && recentSearches.length > 0 && (
            <>
              <div className="px-4 py-2 border-b border-[#FFBF00]/20">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-gray-500" />
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recent Searches
                  </p>
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(search);
                      performSearch(search);
                      inputRef.current?.focus();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-[#FFBF00]/5 transition-colors duration-200 flex items-center gap-3 group"
                  >
                    <Clock className="w-4 h-4 text-gray-600 group-hover:text-[#FFBF00] transition-colors duration-200" />
                    <span className="text-sm text-gray-300 group-hover:text-[#FFBF00] transition-colors duration-200">{search}</span>
                  </button>
                ))}
              </div>

              <div className="p-2 border-t border-[#FFBF00]/20">
                <button
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem("recentSearches");
                  }}
                  className="w-full text-center text-xs text-gray-500 hover:text-red-400 py-2 transition-colors duration-200"
                >
                  Clear recent searches
                </button>
              </div>
            </>
          )}

          {/* Suggestions (shown when no query and no recent searches) */}
          {!loading && !query && recentSearches.length === 0 && (
            <>
              <div className="px-4 py-2 border-b border-[#FFBF00]/20">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-gray-500" />
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Popular Searches
                  </p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setQuery(suggestion);
                        performSearch(suggestion);
                        inputRef.current?.focus();
                      }}
                      className="text-xs px-3 py-1.5 bg-[#FFBF00]/10 border border-[#FFBF00]/20 rounded-full text-[#FFBF00] hover:bg-[#FFBF00]/20 hover:border-[#FFBF00]/40 transition-all duration-200 hover:scale-105"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}