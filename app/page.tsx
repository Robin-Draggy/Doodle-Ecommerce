// app/page.tsx
import { CategorySection } from "@/components/sections/CategorySection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { getProducts, getCategories } from "@/services/products";
import { ProductResponse } from "@/types/product";

// Add this to prevent static generation error
export const dynamic = 'force-dynamic';
// OR use revalidation
// export const revalidate = 3600;

export default async function HomePage() {
  // Fix: Properly type the variables
  let productsData: ProductResponse = { 
    products: [], 
    total: 0, 
    totalPages: 0 
  };
  let categories: string[] = [];
  let hasError = false;

  try {
    const [productsResult, categoriesResult] = await Promise.all([
      getProducts({
        page: 1,
        limit: 8,
      }),
      getCategories(),
    ]);
    
    productsData = productsResult;
    categories = categoriesResult;
  } catch (error) {
    console.error('Error fetching data:', error);
    hasError = true;
    // Provide fallback data
    productsData = { products: [], total: 0, totalPages: 0 };
    categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];
  }

  return (
    <main>
      <HeroSection />

      <FeaturedProducts
        products={productsData.products}
      />

      <CategorySection
        categories={categories}
      />

      <WhyChooseUs />
    </main>
  );
}