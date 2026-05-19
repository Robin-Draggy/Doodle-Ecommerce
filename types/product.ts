export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type ProductQuery = {
  page: number;
  limit: number;

  category?: string;
  search?: string;
  min?: string;
  max?: string;
  sort?: string;
};

export type ProductResponse = {
  products: Product[];
  total: number;
  totalPages: number;
};