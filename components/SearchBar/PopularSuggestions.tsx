// components/SearchBar/PopularSuggestions.tsx
import { TrendingUp } from "lucide-react";

interface PopularSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestions = ["electronics", "jewelery", "men's clothing", "women's clothing"];

export function PopularSuggestions({ onSuggestionClick }: PopularSuggestionsProps) {
  return (
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
              onClick={() => onSuggestionClick(suggestion)}
              className="text-xs px-3 py-1.5 bg-[#FFBF00]/10 border border-[#FFBF00]/20 rounded-full text-[#FFBF00] hover:bg-[#FFBF00]/20 hover:border-[#FFBF00]/40 transition-all duration-200 hover:scale-105"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}