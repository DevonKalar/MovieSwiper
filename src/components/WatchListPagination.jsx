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
    <div className="flex flex-row justify-center items-center gap-4 p-3 my-4">
      <button onClick={prevPage} disabled={currentPage === 1} type="button">
        Previous
      </button>
      <div className="flex flex-row gap-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`bg-transparent w-9 h-9 ${currentPage === number ? "border-2" : "opacity-75"}`}
            onClick={() => goToPage(number)}
            type="button"
          >
            {number}
          </button>
        ))}
      </div>
      <button onClick={nextPage} disabled={currentPage === totalPages} type="button">
        Next
      </button>
    </div>
  );
};

export default WatchListPagination;
