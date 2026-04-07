"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  currentPage: number;
  totalPages: number;
};

export const Pagination = ({ currentPage, totalPages }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) params.delete("page");
    else params.set("page", String(page));

    router.replace(`/products?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-10 gap-2">

      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:scale-95 transition cursor-pointer"
      >
        Prev
      </button>

      {/* Pages */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={`px-3 py-1 rounded border ${
            currentPage === page
              ? "bg-black text-white"
              : "hover:bg-[#2d3436]/30 transition cursor-pointer"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50 hover:scale-95 transition cursor-pointer"
      >
        Next
      </button>

    </div>
  );
}