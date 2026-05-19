import type { Metadata } from "next";
import { getProductById } from "@/services/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/features/add-to-cart-button";
import {
  RiTwitterXLine,
  RiFacebookFill,
  RiPinterestLine,
} from "react-icons/ri";

// Generate dynamic metadata for each product page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id).catch(() => null);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.title,
    description: product.description,
  };
}

// Type definition for the dynamic route parameters
type Props = {
  params: {
    id: string;
  };
};

// Fetch product details based on the dynamic route parameter and render the product details page
export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id).catch(() => null);

  if (!product) return notFound();

  return (
    <section className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Navigation */}
        <button className="group mb-8 flex items-center gap-2 text-gray-400 hover:text-[#FFBF00] transition-colors duration-300">
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm font-medium">Back to Shop</span>
        </button>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Section */}
          <div className="relative group">
            {/* Animated golden border effect */}
            <div className="absolute -inset-0.5 rounded-2xl  transition duration-500" />

            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-[#FFBF00]/20 overflow-hidden">
              <div className="relative w-full aspect-square">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="eager"
                  className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-[#FFBF00]/10 to-transparent transition-transform duration-1000" />
            </div>

            {/* Thumbnail gallery placeholder - can be extended */}
            <div className="flex gap-3 mt-4 justify-center">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-lg border border-[#FFBF00]/20 bg-gray-900 hover:border-[#FFBF00]/60 transition-all duration-300 cursor-pointer hover:scale-105"
                />
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6 animate-fade-in">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-medium text-[#FFBF00] bg-[#FFBF00]/10 rounded-full border border-[#FFBF00]/20">
                {product.category || "Premium Product"}
              </span>
              <span className="px-3 py-1 text-xs font-medium text-green-500 bg-green-500/10 rounded-full border border-green-500/20">
                In Stock
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-[#FFBF00] fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="text-gray-400 text-sm ml-2">
                  (128 reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-b border-[#FFBF00]/20 py-4">
              <p className="text-4xl lg:text-5xl font-bold text-[#FFBF00]">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Description</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Key Features</h3>
              <ul className="space-y-2">
                {[
                  "Premium quality materials",
                  "Free shipping worldwide",
                  "30-day money-back guarantee",
                  "24/7 customer support",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <svg
                      className="w-5 h-5 text-[#FFBF00]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#FFBF00]/30 rounded-lg bg-black">
                  <button className="px-4 py-2 text-[#FFBF00] hover:bg-[#FFBF00]/10 transition-colors duration-200">
                    -
                  </button>
                  <span className="w-12 text-center text-white">1</span>
                  <button className="px-4 py-2 text-[#FFBF00] hover:bg-[#FFBF00]/10 transition-colors duration-200">
                    +
                  </button>
                </div>

                <AddToCartButton
                  product={{
                    id: product.id,
                    image: product.image,
                    title: product.title,
                    price: product.price,
                  }}
                />
              </div>

              <p className="text-xs text-gray-500 text-center">
                Free shipping on orders over $50
              </p>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm text-gray-400">Share:</span>

              <button className="text-gray-400 hover:text-[#FFBF00] transition-colors">
                <RiTwitterXLine className="w-5 h-5" />
              </button>

              <button className="text-gray-400 hover:text-[#FFBF00] transition-colors">
                <RiFacebookFill className="w-5 h-5" />
              </button>

              <button className="text-gray-400 hover:text-[#FFBF00] transition-colors">
                <RiPinterestLine className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section - Optional */}
        <div className="mt-20">
          <div className="border-t border-[#FFBF00]/20 pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Related products can be mapped here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
