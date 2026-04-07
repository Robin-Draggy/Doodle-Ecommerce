import { getProducts, getCategories } from "@/services/products";
import { Filters } from "@/components/features/Filters";
import { Suspense } from "react";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { ProductsSkeleton } from "@/components/shared/ProductsSkeleton";
import type { Metadata } from "next";
import { Pagination } from "@/components/features/Pagination";

const metadata: Metadata = {
  title: "All Products | MyStore",
  description: "Browse products with filters and categories",
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;

  return {
    title: params.category
      ? `${params.category} Products | MyStore`
      : "All Products | MyStore",
    description: "Explore our product collection",
  };
}

type Props = {
  searchParams: Promise<{
    category?: string;
    search?: string;
    min?: string;
    max?: string;
    sort?: string;
    page?: string;
  }>;
};

const ITEMS_PER_PAGE = 8;

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  const products = await getProducts();
  const categories = await getCategories();

  let filtered = [...products];

  // Category
  if (params.category) {
    filtered = filtered.filter((p) => p.category === params.category);
  }

  // Search
  if (params.search) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(params.search!.toLowerCase()),
    );
  }

  // Price
  const min = Number(params.min) || 0;
  const max = Number(params.max) || Infinity;

  filtered = filtered.filter((p) => p.price >= min && p.price <= max);

  // Sort
  if (params.sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (params.sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  // Pagination
  const page = Number(params.page) || 1;
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <Filters categories={categories} />

      {paginated.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-lg font-medium mb-2">No products found</h2>
          <p className="text-gray-500">Try adjusting your filters</p>
        </div>
      )}

      {paginated.length > 0 && (
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductGrid products={paginated} />
        </Suspense>
      )}

      <Pagination currentPage={page} totalPages={totalPages} />
    </section>
  );
}
