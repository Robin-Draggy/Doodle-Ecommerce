import { getProducts, getCategories } from "@/services/products";
import { Filters } from "@/components/features/Filters";
import { ProductGrid } from "@/components/shared/ProductGrid";
import { Pagination } from "@/components/features/Pagination";
import type { Metadata } from "next";
import { cookies } from "next/headers";

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

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;

  return {
    title: params.category
      ? `${params.category} Products | MyStore`
      : "All Products | MyStore",
  };
}

export default async function ProductsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params.page) || 1;

  const cookieStore = await cookies();

  const token= cookieStore.get("token")?.value;

  const [categories, data] = await Promise.all([
    getCategories(),
    getProducts({
      page,
      limit: ITEMS_PER_PAGE,

      category: params.category,
      search: params.search,

      min: params.min,
      max: params.max,

      sort: params.sort,
      token
    }),
  ]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">

      <Filters categories={categories} />

      {data.products.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-lg font-medium">
            No products found
          </h2>

          <p className="text-gray-500">
            Try adjusting filters
          </p>
        </div>
      )}

      {data.products.length > 0 && (
        <ProductGrid products={data.products}/>
      )}

      <Pagination
        currentPage={page}
        totalPages={data.totalPages}
      />

    </section>
  );
}