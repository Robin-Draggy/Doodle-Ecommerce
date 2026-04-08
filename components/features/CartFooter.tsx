import { memo } from "react";
import Link from "next/link";

interface CartFooterProps {
  total: number;
  onClearCart: () => void;
}

export const CartFooter = memo(function CartFooter({ total, onClearCart }: CartFooterProps) {
  const shippingCost = total > 50 ? 0 : 5.99;
  const tax = total * 0.1; // 10% tax
  const grandTotal = total + shippingCost + tax;

  return (
    <div className="bg-black/50 border border-[#FFBF00]/20 rounded-xl p-6 space-y-6 sticky top-24">
      <h2 className="text-xl font-semibold text-white">Order Summary</h2>
      
      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-gray-300">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-300">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        
        <div className="flex justify-between text-gray-300">
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-[#FFBF00]/20 pt-3">
          <div className="flex justify-between text-white font-bold text-lg">
            <span>Total</span>
            <span className="text-[#FFBF00]">${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Free Shipping Notice */}
      {total < 50 && total > 0 && (
        <div className="bg-[#FFBF00]/5 border border-[#FFBF00]/20 rounded-lg p-3">
          <p className="text-xs text-[#FFBF00] text-center">
            Add ${(50 - total).toFixed(2)} more to get free shipping!
          </p>
          <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#FFBF00] rounded-full transition-all duration-500"
              style={{ width: `${(total / 50) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button 
          className="w-full py-3 bg-[#FFBF00] text-black font-semibold rounded-lg hover:bg-[#FFBF00]/90 transition-all duration-300 hover:scale-105"
        >
          Proceed to Checkout
        </button>
        
        <Link
          href="/products"
          className="w-full py-3 border border-[#FFBF00]/30 text-[#FFBF00] font-semibold rounded-lg hover:bg-[#FFBF00]/10 transition-all duration-300 text-center block"
        >
          Continue Shopping
        </Link>
        
        <button
          onClick={onClearCart}
          className="w-full py-2 text-gray-500 text-sm hover:text-red-500 transition-colors duration-200"
        >
          Clear Cart
        </button>
      </div>

      {/* Payment Methods */}
      <div className="pt-4 border-t border-[#FFBF00]/20">
        <p className="text-xs text-gray-500 text-center mb-3">Secure payment methods</p>
        <div className="flex justify-center gap-2">
          {['visa', 'mastercard', 'paypal', 'amex'].map((method) => (
            <div key={method} className="w-10 h-6 bg-gray-800 rounded opacity-60 hover:opacity-100 transition-opacity" />
          ))}
        </div>
      </div>
    </div>
  );
});

CartFooter.displayName = "CartFooter";