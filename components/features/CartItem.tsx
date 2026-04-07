import { memo } from "react";

interface CartItemProps {
  item: {
    id: number;
    title: string;
    price: number;
    quantity: number;
  };
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onRemove: (id: number) => void;
  truncateText: (text: string, maxLength?: number) => string;
}

export const CartItem = memo(function CartItem({ 
  item, 
  onIncrement, 
  onDecrement, 
  onRemove,
  truncateText 
}: CartItemProps) {
  return (
    <div className="w-full flex items-center justify-between gap-3 border p-4 rounded-lg hover:bg-[#2d3436]/30 transition">
      <div className="px-4 w-80">
        <h2 className="font-medium">{truncateText(item.title)}</h2>
        <p className="text-sm text-gray-500">${item.price}</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onDecrement(item.id)}
          className="px-2 py-1 border rounded hover:scale-95 transition cursor-pointer"
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          onClick={() => onIncrement(item.id)}
          className="px-2 py-1 border rounded hover:scale-95 transition cursor-pointer"
        >
          +
        </button>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 text-sm cursor-pointer hover:underline"
      >
        Remove
      </button>
    </div>
  );
});

CartItem.displayName = "CartItem";