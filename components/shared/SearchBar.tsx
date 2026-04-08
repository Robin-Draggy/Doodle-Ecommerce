"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { searchProducts } from "@/services/products";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { XIcon } from "lucide-react";

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
        setRecentSearches(JSON.parse(stored).slice(0, 3));
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
      const updated = [searchTerm, ...filtered].slice(0, 3);
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
        className={`w-full flex items-center gap-3 p-3 transition-colors text-left cursor-pointer ${
          selectedIndex === index
            ? "bg-gray-100"
            : "hover:bg-[#2d3436]/30 ="
        }`}
      >
        <div className="relative w-10 h-10 flex-shrink-0 bg-gray-100 rounded">
          <Image
            src={item.image}
            alt={item.title}
            fill
            loading="eager"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain p-1"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium line-clamp-1">
            {item.title}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            ${item.price}
          </p>
        </div>
      </button>
    ));
  }, [results, selectedIndex, handleProductClick]);

  // Suggestions for empty search
  const suggestions = ["electronics", "jewelery", "men's clothing", "women's clothing"];

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
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
          className="w-full bg-black text-white border border-[#FFBF00]/20 rounded-lg px-4 py-2 focus:outline-none pr-10"
          aria-label="Search"
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
          </div>
        )}

        {/* Clear Button */}
        {query && !loading && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            aria-label="Clear search"
          >
            <XIcon size={16} />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-black border border-gray-100 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Loading State */}
          {loading && (
            <div className="p-4 text-center">
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
              <p className="text-sm text-gray-500 mt-2">Searching...</p>
            </div>
          )}

          {/* No Results */}
          {!loading && query && results.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500">No products found</p>
              <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
              <div className="mt-3">
                <button
                  onClick={handleViewAllResults}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Search for "{query}" →
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {!loading && results.length > 0 && (
            <>
              <div className="p-2 border-b">
                <p className="text-xs text-gray-500">
                  Products ({results.length})
                </p>
              </div>

              {resultItems}

              <div className="p-2 border-t">
                <button
                  onClick={handleViewAllResults}
                  className="w-full text-center text-sm text-blue-600 hover:text-blue-700 py-1"
                >
                  View all results for "{query}" →
                </button>
              </div>
            </>
          )}

          {/* Recent Searches (shown when no query) */}
          {!loading && !query && recentSearches.length > 0 && (
            <>
              <div className="p-2 border-b bg-gray-50">
                <p className="text-xs text-gray-500">Recent Searches</p>
              </div>

              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search);
                    performSearch(search);
                    inputRef.current?.focus();
                  }}
                  className="w-full text-left p-2 hover:bg-gray-50 text-sm flex items-center gap-2"
                >
                  <span className="text-gray-400">🕒</span>
                  {search}
                </button>
              ))}

              <div className="p-2 border-t">
                <button
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem("recentSearches");
                  }}
                  className="w-full text-center text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear recent searches
                </button>
              </div>
            </>
          )}

          {/* Suggestions (shown when no query and no recent searches) */}
          {!loading && !query && recentSearches.length === 0 && (
            <>
              <div className="p-2 border-b">
                <p className="text-xs text-gray-500">Popular Searches</p>
              </div>

              <div className="p-3 flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setQuery(suggestion);
                      performSearch(suggestion);
                      inputRef.current?.focus();
                    }}
                    className="text-xs px-3 py-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}