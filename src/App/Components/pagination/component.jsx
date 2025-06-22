import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const createPageList = () => {
    if (totalPages <= 10) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const displayPages = createPageList();

  return (
    <div className="flex flex-row justify-end items-center mx-40 space-x-1">
      <button
        title="Previous"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`text-xs font-semibold py-2 px-3 rounded-lg transition-colors duration-300 ${
          currentPage === 1
            ? "bg-[#1c1c24] text-[#ccc] cursor-not-allowed"
            : "text-[#ccc] bg-[#1c1c24] hover:bg-[#1c1c30]"
        }`}
      >
        <FaAngleLeft />
      </button>

      {displayPages.map((page, index) =>
        page === "..." ? (
          <span
            key={`dots-${index}`}
            className="mx-1 text-xs font-semibold py-2 px-3 rounded-lg select-none"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`mx-1 text-xs font-semibold py-2 px-3 rounded-lg cursor-pointer transition-colors duration-300 ${
              page === currentPage
                ? "bg-[#4acd8d] text-white shadow-lg"
                : "text-[#ccc] bg-[#1c1c24] hover:[#1c1c30]"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        title="Next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`text-xs font-semibold py-2 px-3 rounded-lg transition-colors duration-300 ${
          currentPage === totalPages
            ? "bg-[#1c1c24] text-[#ccc] cursor-not-allowed"
            : "text-[#ccc] bg-[#1c1c24] hover:bg-[#1c1c30]"
        }`}
      >
        <FaAngleRight />
      </button>
    </div>
  );
};
