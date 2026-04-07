export const ProductsSkeleton = () => {
  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-64 bg-gray-100 rounded-xl animate-pulse"
        />
      ))}
    </div>
  );
}