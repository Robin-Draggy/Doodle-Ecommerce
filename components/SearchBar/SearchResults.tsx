// components/SearchBar/SearchResults.tsx
import { Loader2, Package, Sparkles, ArrowRight } from "lucide-react";
import { SearchResultItem } from "./SearchResultItem";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
}

interface SearchResultsProps {
  query: string;
  loading: boolean;
  results: Product[];
  selectedIndex: number;
  onProductClick: (productId: number, productTitle?: string) => void;
  onViewAllResults: () => void;
}

export function SearchResults({
  query,
  loading,
  results,
  selectedIndex,
  onProductClick,
  onViewAllResults,
}: SearchResultsProps) {
  if (loading) {
    return (
      <div className="p-8 text-center">
        <Loader2 className="w-6 h-6 text-[#FFBF00] animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-400">Searching products...</p>
      </div>
    );
  }

  if (query && results.length === 0) {
    return (
      <div className="p-8 text-center">
        <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <p className="text-sm text-gray-400 mb-1">No products found</p>
        <p className="text-xs text-gray-500 mb-4">Try different keywords</p>
        <button
          onClick={onViewAllResults}
          className="inline-flex items-center gap-2 text-sm text-[#FFBF00] hover:text-[#FFBF00]/80 transition-colors duration-200 group"
        >
          Search for "{query}" 
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    );
  }

  if (results.length > 0) {
    return (
      <div className="search-scroll-container">
        <div className="px-4 py-2 border-b border-[#FFBF00]/20 bg-gradient-to-r from-[#FFBF00]/5 to-transparent sticky top-0 z-10 bg-black/95 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#FFBF00]" />
            <p className="text-xs font-medium text-[#FFBF00] uppercase tracking-wider">
              Products ({results.length})
            </p>
          </div>
        </div>

        <div className="relative z-0">
          {results.map((item, index) => (
            <SearchResultItem
              key={item.id}
              product={item}
              isSelected={selectedIndex === index}
              onClick={() => onProductClick(item.id, item.title)}
            />
          ))}
        </div>

        <div className="p-2 border-t border-[#FFBF00]/20 bg-[#FFBF00]/5 sticky bottom-0 z-10 bg-black/95 backdrop-blur-sm">
          <button
            onClick={onViewAllResults}
            className="w-full flex items-center justify-center gap-2 text-sm text-[#FFBF00] hover:text-[#FFBF00]/80 py-2 rounded-lg transition-all duration-200 group"
          >
            View all results for "{query}"
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}