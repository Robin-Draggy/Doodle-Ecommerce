import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative block overflow-hidden rounded-2xl bg-black border border-[#FFBF00]/20 hover:border-[#FFBF00]/50 transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image Container with golden gradient background */}
      <div className="relative w-full aspect-square overflow-hidden bg-gradient-to-br from-black to-gray-900">
        <Image
          src={product.image}
          alt={product.title}
          fill
          loading="eager"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-contain p-6 transition-all duration-500 group-hover:scale-105"
        />
        
        {/* Golden shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-[#FFBF00]/10 to-transparent transition-transform duration-1000" />
        
        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Content Area */}
      <div className="relative p-5 space-y-3 bg-black">
        {/* Golden accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#FFBF00] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        
        <h3 className="text-sm font-semibold text-gray-200 line-clamp-1 leading-relaxed group-hover:text-[#FFBF00] transition-colors duration-300">
          {product.title}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-[#FFBF00]">
              ${product.price.toFixed(2)}
            </p>
          </div>
          
          {/* Golden animated circle button */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFBF00]/10 border border-[#FFBF00]/30 text-[#FFBF00] transition-all duration-300 group-hover:bg-[#FFBF00] group-hover:text-black group-hover:scale-110">
            <svg 
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};