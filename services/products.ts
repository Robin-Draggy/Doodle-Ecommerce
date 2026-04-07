import { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com";

export const getProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${BASE_URL}/products`, {
        next: {
            revalidate: 60, // Revalidate the data every 60 seconds
        }
    });
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    return res.json();
}

export const getProductById = async (id: string): Promise<Product> => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
        next: {
            revalidate: 60, // Revalidate the data every 60 seconds
        }
    });
    if (!res.ok) {
        throw new Error("Failed to fetch product");
    }
    return res.json();
}

export const getCategories = async (): Promise<string[]> => {
  const res = await fetch("https://fakestoreapi.com/products/categories", {
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  return res.json();
}

export const searchProducts = async (query: string) => {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) throw new Error("Failed to search");

  const products = await res.json();

  return products.filter((p: any) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );
}