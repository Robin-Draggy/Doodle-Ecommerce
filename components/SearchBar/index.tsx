// components/SearchBar/index.tsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { searchProducts } from "@/services/products";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "@/hooks/useDebounce";
import { SearchInput } from "./SearchInput";
import { SearchDropdown } from "./SearchDropdown";
import { useRecentSearches } from "./useRecentSearches";

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

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { recentSearches, saveRecentSearch, clearRecentSearches } = useRecentSearches();

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    setLoading(false);
  }, []);

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

  const handleViewAllResults = useCallback(() => {
    if (query.trim()) {
      saveRecentSearch(query);
      clearSearch();
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }, [query, clearSearch, router, saveRecentSearch]);

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
      setResults(data.products?.slice(0, 5) || []);
      setIsOpen(true);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, 400);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      clearSearch();
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, [clearSearch]);

  const shouldShowDropdown = isOpen && (
    !loading || 
    (query && results.length === 0) || 
    results.length > 0 ||
    (!query && recentSearches.length > 0) ||
    (!query && recentSearches.length === 0)
  );

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <SearchInput
        ref={inputRef}
        query={query}
        loading={loading}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onClear={clearSearch}
        onFocus={() => {
          if ((query.trim() && results.length > 0) || recentSearches.length > 0) {
            setIsOpen(true);
          }
        }}
      />

      {shouldShowDropdown && (
        <SearchDropdown
          query={query}
          loading={loading}
          results={results}
          recentSearches={recentSearches}
          selectedIndex={selectedIndex}
          onProductClick={handleProductClick}
          onViewAllResults={handleViewAllResults}
          onRecentSearchClick={(search) => {
            setQuery(search);
            performSearch(search);
            inputRef.current?.focus();
          }}
          onClearRecentSearches={clearRecentSearches}
        />
      )}
    </div>
  );
}