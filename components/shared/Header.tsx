"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X, Search } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useState, useEffect, useRef } from "react";
import SearchBar from "../SearchBar";

export const Header = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <header 
        className={`sticky top-0 z-50 border-b border-[#FFBF00]/20 transition-all duration-500 ${
          isScrolled 
            ? "bg-black/95 backdrop-blur-md shadow-2xl shadow-black/50" 
            : "bg-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-[#FFBF00] hover:bg-[#FFBF00]/10 transition-all duration-300 active:scale-95"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-5 h-5">
                <Menu 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                  }`}
                />
              </div>
            </button>

            {/* Logo */}
            <Link 
              href="/" 
              className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="w-8 h-8 bg-[#FFBF00] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:rotate-6 shadow-lg shadow-[#FFBF00]/25">
                <span className="text-black font-bold text-xl">D</span>
              </div>
              <p className="text-[#FFBF00] font-bold text-xl lg:text-2xl tracking-wide transition-all duration-300 group-hover:tracking-wider">
                Doodle
              </p>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link 
                href="/products" 
                className="relative text-gray-300 hover:text-[#FFBF00] font-medium transition-all duration-300 group py-2"
              >
                Products
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFBF00] to-[#FFBF00]/50 transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link 
                href="/about" 
                className="relative text-gray-300 hover:text-[#FFBF00] font-medium transition-all duration-300 group py-2"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFBF00] to-[#FFBF00]/50 transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link 
                href="/contact" 
                className="relative text-gray-300 hover:text-[#FFBF00] font-medium transition-all duration-300 group py-2"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFBF00] to-[#FFBF00]/50 transition-all duration-300 group-hover:w-full" />
              </Link>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-[#FFBF00] hover:bg-[#FFBF00]/10 transition-all duration-300 active:scale-95"
                aria-label={isSearchOpen ? "Close search" : "Open search"}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Desktop Search Bar */}
              <div className="hidden lg:block w-80 transition-all duration-300">
                <SearchBar />
              </div>

              {/* Cart Icon */}
              <Link 
                href="/cart" 
                className="relative group p-2 rounded-lg hover:bg-[#FFBF00]/10 transition-all duration-300 active:scale-95"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-[#FFBF00] transition-colors duration-300" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs font-bold min-w-[18px] h-[18px] px-1 flex items-center justify-center shadow-lg animate-pulse">
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay - Fixed for better visibility */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-md z-[60] lg:hidden transition-all duration-400 ${
          isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsSearchOpen(false)}
      >
        <div
          className="fixed top-0 left-0 right-0 bg-black border-b border-[#FFBF00]/20 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-lg text-[#FFBF00] hover:bg-[#FFBF00]/10 transition-all duration-200"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex-1">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/90 backdrop-blur-md z-40 lg:hidden transition-all duration-400 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          ref={mobileMenuRef}
          className={`fixed top-16 left-0 right-0 bg-black border-b border-[#FFBF00]/20 shadow-2xl transition-all duration-400 transform ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col p-6 space-y-2">
            <Link
              href="/products"
              className="text-gray-300 hover:text-[#FFBF00] font-medium py-4 px-4 rounded-xl hover:bg-gradient-to-r hover:from-[#FFBF00]/10 hover:to-transparent transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <span className="w-1 h-1 bg-[#FFBF00] rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100" />
                Products
              </div>
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-[#FFBF00] font-medium py-4 px-4 rounded-xl hover:bg-gradient-to-r hover:from-[#FFBF00]/10 hover:to-transparent transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <span className="w-1 h-1 bg-[#FFBF00] rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100" />
                About
              </div>
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-[#FFBF00] font-medium py-4 px-4 rounded-xl hover:bg-gradient-to-r hover:from-[#FFBF00]/10 hover:to-transparent transition-all duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <span className="w-1 h-1 bg-[#FFBF00] rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100" />
                Contact
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};