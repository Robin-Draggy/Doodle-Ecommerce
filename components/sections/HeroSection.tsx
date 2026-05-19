import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Premium Shopping <span className="text-[#FFBF00]">Experience</span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          Discover high-quality products, curated collections, and a fast
          modern shopping experience built with Next.js and real-time performance.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/products"
            className="px-6 py-3 bg-[#FFBF00] text-black font-semibold rounded-xl hover:scale-105 transition"
          >
            Shop Now
          </Link>

          <Link
            href="/products?category=electronics"
            className="px-6 py-3 border border-[#FFBF00]/40 text-[#FFBF00] rounded-xl hover:bg-[#FFBF00]/10 transition"
          >
            Explore Electronics
          </Link>
        </div>
      </div>
    </section>
  );
};