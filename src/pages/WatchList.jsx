import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@providers/UserProvider.jsx";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import WatchListGrid from "@components/WatchListGrid";
import WatchListFilter from "@components/WatchListFilter";
import WatchListPagination from "@components/WatchListPagination";

const WatchList = () => {
  const { likedMovies, removeLikedMovie } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 24;

  // Filtering logic
  const filteredMovies = likedMovies.filter(movie => {
    if (!movie.title) return false;
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = activeFilters.every(filter => {
      const movieProp = movie[filter.category];
      if (Array.isArray(movieProp)) {
        return movieProp.includes(filter.value);
      }
      return movieProp === filter.value;
    });
    return matchesSearch && matchesFilters;
  });

  // Reset to page 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilters]);

    // Filter options
  const filterOptions = useMemo(() => ([
    {
      dataName: 'genreNames',
      categoryName: 'Genre',
      dataOptions: [...new Set(likedMovies.flatMap(movie => movie.genreNames))],
    },
    {
      dataName: 'releaseDate',
      categoryName: 'Release Date',
      dataOptions: [...new Set(likedMovies.map(movie => movie.releaseDate).sort((a, b) => b - a))],
    },
    {
      dataName: 'rating',
      categoryName: 'Rating',
      dataOptions: [...new Set(likedMovies.map(movie => movie.rating))],
    },
  ]), [likedMovies]);

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
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center overflow-hidden py-12">
          <div className="flex flex-col items-center h-full justify-center gap-4">
            <h1 className="text-3xl">Your Watchlist Is Empty</h1>
            <p className="text-center">Explore great movies and swipe to add to your watchlist.</p>
            <Link to="/" className="px-6 h-12 flex flex-col align-center justify-center bg-secondary-500 text-white rounded-full hover:opacity-75">Discover Movies</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main ref={topRef} className="flex-1 overflow-hidden py-12">
        <div className="w-full max-w-7xl relative mx-auto px-4 md:px-8 xl:px-0 ">
          <h1>Your Watchlist</h1>
          <WatchListFilter
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            filters={filterOptions}
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
      <Footer />
    </>
  );
};

export default WatchList;
