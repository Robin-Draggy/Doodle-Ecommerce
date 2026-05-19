import Link from "next/link";

export const CategorySection = ({ categories }: { categories: string[] }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-white mb-6">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/products?category=${cat}`}
            className="p-6 rounded-xl border border-[#FFBF00]/20 bg-black hover:border-[#FFBF00]/60 transition group"
          >
            <p className="text-gray-300 group-hover:text-[#FFBF00] capitalize font-medium">
              {cat}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};