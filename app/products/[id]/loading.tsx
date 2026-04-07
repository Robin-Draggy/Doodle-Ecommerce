export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      <div className="h-[400px] bg-gray-100 rounded-xl animate-pulse" />
      <div className="space-y-4">
        <div className="h-6 bg-gray-100 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded animate-pulse" />
        <div className="h-4 bg-gray-100 rounded animate-pulse" />
        <div className="h-6 bg-gray-100 rounded w-1/4 animate-pulse" />
      </div>
    </div>
  );
}