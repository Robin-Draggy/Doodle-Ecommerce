// components/SearchBar/SearchDropdown.tsx
import { SearchResults } from "./SearchResults";
import { RecentSearches } from "./RecentSearches";
import { PopularSuggestions } from "./PopularSuggestions";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
}

interface SearchDropdownProps {
  query: string;
  loading: boolean;
  results: Product[];
  recentSearches: string[];
  selectedIndex: number;
  onProductClick: (productId: number, productTitle?: string) => void;
  onViewAllResults: () => void;
  onRecentSearchClick: (search: string) => void;
  onClearRecentSearches: () => void;
}

export function SearchDropdown({
  query,
  loading,
  results,
  recentSearches,
  selectedIndex,
  onProductClick,
  onViewAllResults,
  onRecentSearchClick,
  onClearRecentSearches,
}: SearchDropdownProps) {
  return (
    <div className="absolute top-full mt-2 w-full bg-black/95 backdrop-blur-md border border-[#FFBF00]/20 rounded-xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
      <div className="max-h-125 overflow-y-auto custom-scrollbar">
        <SearchResults
          query={query}
          loading={loading}
          results={results}
          selectedIndex={selectedIndex}
          onProductClick={onProductClick}
          onViewAllResults={onViewAllResults}
        />

        {!loading && !query && (
          <>
            <RecentSearches
              searches={recentSearches}
              onSearchClick={onRecentSearchClick}
              onClearAll={onClearRecentSearches}
            />
            
            {recentSearches.length === 0 && (
              <PopularSuggestions onSuggestionClick={onRecentSearchClick} />
            )}
          </>
        )}
      </div>
    </div>
  );
}