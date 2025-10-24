import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@providers/UserProvider.jsx";
import WatchListGrid from "@components/WatchListGrid";
import WatchListFilter from "@components/WatchListFilter";
import WatchListPagination from "@components/WatchListPagination";

const WatchList = () => {
  const { likedMovies, removeLikedMovie } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 24;

  // Filtering logic
  const filteredMovies = likedMovies.filter(movie => {
    if (!movie.title) return false;
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = activeFilters.every(filter => {
      const movieProp = movie[filter.dataProp];
      switch (filter.type) {
        case 'date': {
          // Compare year only
          const movieYear = movieProp?.split?.("-")[0];
          return movieYear === filter.value;
        }
        case 'range': {
          // filter.value should be { min, max }
          if (typeof movieProp !== 'number' || !filter.value) return false;
          return movieProp >= filter.value.min && movieProp <= filter.value.max;
        }
        default: {
          if (Array.isArray(movieProp)) {
            return movieProp.includes(filter.value);
          }
          return movieProp === filter.value;
        }
      }
    });
    return matchesSearch && matchesFilters;
  });

  // Reset to page 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilters]);

  // Pagination
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);
  const paginatedMovies = filteredMovies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    setTimeout(() => topRef.current.scrollIntoView({ behavior: 'smooth' }), 200);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
    setTimeout(() => topRef.current.scrollIntoView({ behavior: 'smooth' }), 200);
  };
  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    setTimeout(() => topRef.current.scrollIntoView({ behavior: 'smooth' }), 200);
  };

  const topRef = useRef(null);

  if (!likedMovies || likedMovies.length === 0) {
    return (
        <main className="flex-1 flex items-center justify-center overflow-hidden py-12">
          <div className="flex flex-col items-center h-full justify-center gap-4">
            <h1 className="text-3xl">Your Watchlist Is Empty</h1>
            <p className="text-center">Explore great movies and swipe to add to your watchlist.</p>
            <Link to="/" className="px-6 h-12 flex flex-col align-center justify-center bg-secondary-500 text-white rounded-full hover:opacity-75">Discover Movies</Link>
          </div>
        </main>
    );
  }

  return (
      <main ref={topRef} className="flex-1 overflow-hidden py-12">
        <div className="w-full max-w-7xl relative mx-auto px-4 md:px-8 xl:px-0 ">
          <h1>Your Watchlist</h1>
          <WatchListFilter
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <WatchListGrid
            movies={paginatedMovies}
            removeLikedMovie={removeLikedMovie}
          />
          <WatchListPagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            prevPage={prevPage}
            nextPage={nextPage}
            goToPage={goToPage}
          />
        </div>
      </main>
  );
};

export default WatchList;
