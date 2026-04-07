export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-64 rounded-xl bg-gray-100 animate-pulse"
        />
      ))}
    </div>
  );
}