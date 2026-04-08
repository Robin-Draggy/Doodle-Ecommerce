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
      className="px-6 py-3 thin-border text-white font-semibold rounded-lg hover:scale-105 hover:bg-[#FFBF00] hover:text-black transition cursor-pointer"
    >
      Add to Cart
    </button>
  );
}