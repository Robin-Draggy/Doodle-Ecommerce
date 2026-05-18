// components/SearchBar/SearchInput.tsx
import { forwardRef } from "react";
import { Search, X, Loader2 } from "lucide-react";

interface SearchInputProps {
  query: string;
  loading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear: () => void;
  onFocus: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ query, loading, onInputChange, onKeyDown, onClear, onFocus }, ref) => {
    return (
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#FFBF00] transition-colors duration-200" />
        
        <input
          ref={ref}
          value={query}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          placeholder="Search products..."
          className="w-full bg-black/50 text-white placeholder-gray-500 border border-[#FFBF00]/20 rounded-xl pl-10 pr-10 py-2.5 focus:outline-none focus:border-[#FFBF00]/60 focus:bg-black/70 transition-all duration-200"
          aria-label="Search"
          aria-autocomplete="list"
        />

        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-4 h-4 text-[#FFBF00] animate-spin" />
          </div>
        )}

        {query && !loading && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-400 transition-colors duration-200 cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";