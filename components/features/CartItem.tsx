import { memo } from "react";
import Image from "next/image";

interface CartItemProps {
  item: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image?: string;
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
  const itemTotal = item.price * item.quantity;

  return (
    <div className="group bg-black/50 border border-[#FFBF00]/20 rounded-xl p-4 hover:border-[#FFBF00]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#FFBF00]/5">
      <div className="flex gap-4">
        {/* Product Image Placeholder */}
        <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-gray-900 to-black rounded-lg border border-[#FFBF00]/20 overflow-hidden">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.title}
              width={80}
              height={80}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#FFBF00]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start gap-4">
            <div>
              <h3 className="font-medium text-white group-hover:text-[#FFBF00] transition-colors duration-300">
                {truncateText(item.title, 40)}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Unit Price: ${item.price.toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-500 hover:text-red-500 transition-colors duration-200"
              aria-label="Remove item"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onDecrement(item.id)}
                className="w-8 h-8 flex items-center justify-center border border-[#FFBF00]/30 rounded-lg text-[#FFBF00] hover:bg-[#FFBF00]/10 hover:border-[#FFBF00]/60 transition-all duration-200 hover:scale-95"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-white font-medium min-w-[32px] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => onIncrement(item.id)}
                className="w-8 h-8 flex items-center justify-center border border-[#FFBF00]/30 rounded-lg text-[#FFBF00] hover:bg-[#FFBF00]/10 hover:border-[#FFBF00]/60 transition-all duration-200 hover:scale-95"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Item Total */}
            <p className="text-lg font-semibold text-[#FFBF00]">
              ${itemTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = "CartItem";