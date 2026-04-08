"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import SearchBar from "./SearchBar";

export const Header = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className="border-b border-[#FFBF00]/20 bg-black">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          {/* <Image src="/logos/logo.png" alt="Logo" width={120} height={32} className="inline-block" /> */}
          <p className="text-[#FFBF00] font-bold leading-wider">Doodle</p>
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Nav */}
        <nav className="flex items-center gap-6">
          <Link href="/products" className="hover:scale-105 transition textColor">Products</Link>
          <Link href="/cart" className="relative textColor hover:scale-105 transition">
            <ShoppingCart className="w-7 h-7" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>

      </div>
    </header>
  );
}