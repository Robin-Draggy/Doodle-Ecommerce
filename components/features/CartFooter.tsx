import { memo } from "react";

interface CartFooterProps {
  total: number;
  onClearCart: () => void;
}

export const CartFooter = memo(function CartFooter({ total, onClearCart }: CartFooterProps) {
  return (
    <div className="mt-6 flex justify-between items-center">
      <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
      <button onClick={onClearCart} className="px-4 py-2 border rounded-lg hover:scale-105 transition cursor-pointer">
        Clear Cart
      </button>
    </div>
  );
});

CartFooter.displayName = "CartFooter";