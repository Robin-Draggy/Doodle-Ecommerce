import type { Metadata } from "next";
import { getProductById } from "@/services/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import AddToCartButton from "@/components/features/add-to-cart-button";

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
    <section className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="relative w-full h-[400px]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          loading="eager"
          className="object-contain"
        />
      </div>

      {/* Info */}
      <div>
        <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>

        <p className="text-gray-500 mb-6">{product.description}</p>

        <p className="text-xl font-bold mb-4">${product.price}</p>

        <AddToCartButton
          product={{
            id: product.id,
            image: product.image,
            title: product.title,
            price: product.price,
          }}
        />
      </div>
    </section>
  );
}
