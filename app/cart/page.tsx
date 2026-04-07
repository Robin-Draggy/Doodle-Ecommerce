"use client";

import { CartFooter } from "@/components/features/CartFooter";
import { CartItem } from "@/components/features/CartItem";
import { useCartStore } from "@/store/cart-store";
import { useCallback, useMemo } from "react";

export default function CartPage() {
  const { items, increment, decrement, removeFromCart, clearCart } =
    useCartStore();

  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  if (items.length === 0) {
    return <div className="text-center py-20">Your cart is empty</div>;
  }

  const turncateText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrement={increment}
            onDecrement={decrement}
            onRemove={removeFromCart}
            truncateText={turncateText}
          />
        ))}
      </div>

      <CartFooter total={total} onClearCart={clearCart} />
    </section>
  );
}
