import { cache } from "react";
import {
  Product,
  ProductQuery,
  ProductResponse,
} from "@/types/product";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://fakestoreapi.com";

export const getProducts = cache(
  async ({
    page,
    limit,
    category,
    search,
    min,
    max,
    sort,
    token,
  }: ProductQuery & {
    token?: string;
  }): Promise<ProductResponse> => {

    const res = await fetch(
      `${BASE_URL}/products`,
      {
        headers: token
          ? {
              Authorization:
                `Bearer ${token}`,
            }
          : {},

        next: {
          revalidate: 300,
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed products"
      );
    }

    const products: Product[] =
      await res.json();

    let filtered = [...products];

    if(category){
      filtered=
      filtered.filter(
      p=>p.category===category
      );
    }

    if(search){

      filtered=
      filtered.filter(
      p=>
      p.title
      .toLowerCase()
      .includes(
      search.toLowerCase()
      )
      );
    }

    const minPrice =
      Number(min)||0;

    const maxPrice =
      Number(max)||Infinity;

    filtered=
    filtered.filter(
      p=>
      p.price>=minPrice &&
      p.price<=maxPrice
    );

    if(sort==="price-asc"){
      filtered.sort(
      (a,b)=>
      a.price-b.price
      );
    }

    if(sort==="price-desc"){
      filtered.sort(
      (a,b)=>
      b.price-a.price
      );
    }

    const total=
      filtered.length;

    const totalPages=
      Math.ceil(
      total/limit
      );

    const start=
      (page-1)*limit;

    const paginated=
      filtered.slice(
      start,
      start+limit
      );

    return{
      products:
      paginated,

      total,

      totalPages
    };

});

export const getProductById = cache(
  async (
    id: string,
    token?: string
  ): Promise<Product> => {

    const res = await fetch(
      `${BASE_URL}/products/${id}`,
      {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},

        next: {
          revalidate: 600,
        },

        cache: "force-cache",
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed product"
      );
    }

    return res.json();
  }
);

export const getCategories = cache(
  async () => {

    const res = await fetch(
      `${BASE_URL}/products/categories`,
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed categories"
      );
    }

    return res.json();
  }
);

export const searchProducts = cache(
  async (
    query: string,
    page = 1,
    limit = 8,
    token?: string
  ): Promise<ProductResponse> => {

    const params =
      new URLSearchParams();

    params.set(
      "search",
      query
    );

    params.set(
      "page",
      page.toString()
    );

    params.set(
      "limit",
      limit.toString()
    );

    const res = await fetch(
      `${BASE_URL}/products/search?${params}`,
      {
        headers: token
          ? {
              Authorization:
                `Bearer ${token}`,
            }
          : {},

        next: {
          revalidate: 60,
        },

        cache: "force-cache",
      }
    );

    if (!res.ok) {
      throw new Error(
        "Failed search"
      );
    }

    return res.json();
  }
);