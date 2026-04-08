"use client";

import { CartFooter } from "@/components/features/CartFooter";
import { CartItem } from "@/components/features/CartItem";
import { useCartStore } from "@/store/cart-store";
import { useMemo } from "react";
import Link from "next/link";

export default function CartPage() {
  const { items, increment, decrement, removeFromCart, clearCart } =
    useCartStore();

  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-black flex items-center justify-center px-4">
        <div className="text-center space-y-6 animate-fade-in-cart">
          {/* Empty Cart Icon */}
          <div className="w-24 h-24 mx-auto bg-[#FFBF00]/10 rounded-full flex items-center justify-center border border-[#FFBF00]/20">
            <svg className="w-12 h-12 text-[#FFBF00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 18v3" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-semibold text-white">Your cart is empty</h2>
          <p className="text-gray-400 max-w-sm mx-auto">
            Looks like you haven&apos;t added any items to your cart yet
          </p>
          
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFBF00] text-black font-semibold rounded-lg hover:bg-[#FFBF00]/90 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const truncateText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <section className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Shopping Cart</h1>
          <p className="text-gray-400">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        {/* Cart Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrement={increment}
                onDecrement={decrement}
                onRemove={removeFromCart}
                truncateText={truncateText}
              />
            ))}
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <CartFooter total={total} onClearCart={clearCart} />
          </div>
        </div>
      </div>
    </section>
  );
}