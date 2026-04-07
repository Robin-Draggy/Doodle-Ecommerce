"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import SearchBar from "./SearchBar";

export const Header = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Doodle
        </Link>

        {/* Search Bar */}
        <SearchBar />

        {/* Nav */}
        <nav className="flex items-center gap-6">
          <Link href="/products" className="hover:scale-105 transition">Products</Link>
          <Link href="/cart" className="relative hover:scale-105 transition">
            <ShoppingCart className="w-5 h-5" />
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