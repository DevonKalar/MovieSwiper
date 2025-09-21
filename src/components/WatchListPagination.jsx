import React from "react";

const WatchListPagination = ({
  currentPage,
  totalPages,
  pageNumbers,
  prevPage,
  nextPage,
  goToPage,
}) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex flex-row justify-center items-center gap-4 p-3 my-4" aria-label="Pagination">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        type="button"
        aria-label="Go to previous page"
      >
        Previous
      </button>
      <ul className="flex flex-row gap-2" role="list">
        {pageNumbers.map((number) => (
          <li key={number} role="listitem">
            <button
              className={`bg-transparent w-9 h-9 ${currentPage === number ? "border-2" : "opacity-75"}`}
              onClick={() => goToPage(number)}
              type="button"
              aria-label={`Go to page ${number}`}
              aria-current={currentPage === number ? "page" : undefined}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        type="button"
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  );
};

export default WatchListPagination;
