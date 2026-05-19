
import { CategorySection } from "@/components/sections/CategorySection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { getProducts, getCategories } from "@/services/products";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts({
      page: 1,
      limit: 8,
    }),
    getCategories(),
  ]);

  return (
    <main>
      <HeroSection />

      <FeaturedProducts
        products={products.products}
      />

      <CategorySection
        categories={categories}
      />

      <WhyChooseUs />
    </main>
  );
}