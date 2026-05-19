import { ProductGrid } from "@/components/shared/ProductGrid";

export const FeaturedProducts = async ({ products }: any) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Featured Products
          </h2>
          <p className="text-gray-500 text-sm">
            Handpicked best selling items
          </p>
        </div>
      </div>

      <ProductGrid products={products} />
    </section>
  );
};