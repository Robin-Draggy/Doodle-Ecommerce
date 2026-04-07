"use client";

import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";


type Props = {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => {
        addToCart(product)
        toast.success("Added to cart!")
    }}
      className="px-6 py-3 bg-black text-white rounded-lg hover:scale-105 transition cursor-pointer"
    >
      Add to Cart
    </button>
  );
}