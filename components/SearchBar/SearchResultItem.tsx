// components/SearchBar/SearchResultItem.tsx
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
}

interface SearchResultItemProps {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
}

export function SearchResultItem({ product, isSelected, onClick }: SearchResultItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 transition-all duration-200 text-left cursor-pointer group relative z-0 ${
        isSelected
          ? "bg-gradient-to-r from-[#FFBF00]/10 to-transparent border-l-2 border-[#FFBF00]"
          : "hover:bg-[#FFBF00]/5"
      }`}
    >
      <div className="relative w-12 h-12 flex-shrink-0 bg-gradient-to-br from-gray-900 to-black rounded-lg border border-[#FFBF00]/20 overflow-hidden group-hover:border-[#FFBF00]/40 transition-colors duration-200">
        <Image
          src={product.image}
          alt={product.title}
          fill
          loading="eager"
          sizes="48px"
          className="object-contain p-1.5"
          style={{ position: 'absolute' }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-200 line-clamp-1 group-hover:text-[#FFBF00] transition-colors duration-200">
          {product.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="text-sm font-semibold text-[#FFBF00]">
            ${product.price.toFixed(2)}
          </p>
          {product.category && (
            <span className="text-xs text-gray-500 capitalize">{product.category}</span>
          )}
        </div>
      </div>
      
      <ArrowRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-[#FFBF00] transition-all duration-200 group-hover:translate-x-1 flex-shrink-0" />
    </button>
  );
}