import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-xl border p-4 hover:scale-y-105 transition"
    >
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          loading="eager"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-contain group-hover:scale-105 transition"
        />
      </div>

      <h3 className="text-sm font-medium line-clamp-2 mb-2">{product.title}</h3>

      <p className="text-lg font-semibold">${product.price}</p>
    </Link>
  );
};
