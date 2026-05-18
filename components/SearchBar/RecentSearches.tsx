// components/SearchBar/RecentSearches.tsx
import { Clock } from "lucide-react";

interface RecentSearchesProps {
  searches: string[];
  onSearchClick: (search: string) => void;
  onClearAll: () => void;
}

export function RecentSearches({ searches, onSearchClick, onClearAll }: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <>
      <div className="px-4 py-2 border-b border-[#FFBF00]/20 sticky top-0 bg-black/95 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3 text-gray-500" />
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            Recent Searches
          </p>
        </div>
      </div>

      <div>
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => onSearchClick(search)}
            className="w-full text-left px-4 py-2.5 hover:bg-[#FFBF00]/5 transition-colors duration-200 flex items-center gap-3 group"
          >
            <Clock className="w-4 h-4 text-gray-600 group-hover:text-[#FFBF00] transition-colors duration-200" />
            <span className="text-sm text-gray-300 group-hover:text-[#FFBF00] transition-colors duration-200">{search}</span>
          </button>
        ))}
      </div>

      <div className="p-2 border-t border-[#FFBF00]/20 sticky bottom-0 bg-black/95 backdrop-blur-sm">
        <button
          onClick={onClearAll}
          className="w-full text-center text-xs text-gray-500 hover:text-red-400 py-2 transition-colors duration-200"
        >
          Clear recent searches
        </button>
      </div>
    </>
  );
}