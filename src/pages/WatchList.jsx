import { useState, useEffect, useRef, useMemo } from "react";
import { useUser } from "@providers/UserProvider.jsx";
import { CloseIcon } from '@icons';
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import WatchListGrid from "@components/WatchListGrid";
import WatchListFilter from "@components/WatchListFilter";

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
        <main className="flex-1 overflow-hidden py-12">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl">No Liked Movies Found</h2>
            <p className="text-center">You haven't liked any movies yet.</p>
            <button className="border-2 border-white bg-transparent mt-4" type="button">Explore Movies</button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 overflow-hidden py-12">
        <div ref={topRef} className="w-full max-w-7xl relative mx-auto px-4 md:px-8 xl:px-0 ">
            <h1>Your Watchlist</h1>
            <WatchListFilter
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
              filters={filterOptions}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-2" >
            {paginatedMovies.length === 0 ? (
              <p>No movies found matching your criteria.</p>
            ) : paginatedMovies.map((movie) => (
              <div className="grid-cols-2 gap-2" key={movie.id || movie.title}>
                <div className="relative">
                  <img className="rounded-2xl" src={movie.poster} alt={movie.title} />
                  <div className="flex flex-col absolute top-0 left-0 w-full h-full p-4 justify-between opacity-0 hover:opacity-100 bg-blur text-white rounded-2xl border-1 border-primary-300">
                    <div className="flex flex-row justify-between items-start gap-4">
                      <div>
                      <h3>{movie.title}</h3>
                      <p>{movie.genreNames.join(", ")}</p>
                      </div>
                      <button className="h-6 w-6 p-0 rounded-full bg-transparent text-error-500" onClick={() => removeLikedMovie(movie)} type="button"><CloseIcon /></button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="border-2 border-secondary-500 w-full" type="button">Watch</button>
                      <button className="border-2 border-white bg-transparent w-full" type="button">Explore</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
        
            {filteredMovies.length > ITEMS_PER_PAGE && (
            <div className="flex flex-row justify-center items-center gap-4 p-3 my-4">
              <button onClick={prevPage} disabled={currentPage === 1} type="button">Previous</button>
              <div className="flex flex-row gap-2">
              {pageNumbers.map(number => (
                <button
                key={number}
                className={`bg-transparent w-9 h-9 ${currentPage === number ? 'border-2' : 'opacity-75'}`}
                onClick={() => goToPage(number)}
                type="button"
                >
                {number}
                </button>
              ))}
              </div>
              <button onClick={nextPage} disabled={currentPage === totalPages} type="button">Next</button>
            </div>
            )}
        
            </div>
      </main>
      <Footer />
    </>
  );
};

export default WatchList;
