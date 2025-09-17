import { useState, useEffect, useRef } from "react";
import { useMovies } from "../../providers/MoviesContext.jsx";
import downArrow from '@icons/down-arrow.png';

const LikeList = () => {
  const { likedMovies, removeLikedMovie } = useMovies();

  // Filtering options
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;
  const [modals, setModals] = useState({});

  // Add/remove filter
  const addFilter = (category, value) => {
    if (!filters.some(filter => filter.category === category && filter.value === value)) {
      setFilters(prev => [...prev, { category, value }]);
    }
  };
  const removeFilter = (category, value) => {
    setFilters(prev => prev.filter(filter => filter.category !== category || filter.value !== value));
  };

  // Reset to page 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Filtering logic
  const filteredMovies = likedMovies.filter(movie => {
    if (!movie.title) return false;
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters = filters.every(filter => {
      const movieProp = movie[filter.category];
      if (Array.isArray(movieProp)) {
        return movieProp.includes(filter.value);
      }
      return movieProp === filter.value;
    });
    return matchesSearch && matchesFilters;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const paginatedMovies = filteredMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    setTimeout(() => topRef.current.scrollIntoView({ behavior: 'smooth' }), 100);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
    setTimeout(() => topRef.current.scrollIntoView({ behavior: 'smooth' }), 100);
  };
  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    setTimeout(() => topRef.current.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const topRef = useRef(null);

  // Modal logic
  useEffect(() => {
    if (Object.keys(modals).length === 0) return;
    const handleClick = (e) => {
      if (e.target.closest('.filter-modal') || e.target.closest('.modal-button')) return;
      setModals({});
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [modals]);

  const toggleModal = (category) => {
    setModals(prev => prev[category] ? {} : { [category]: true });
  };

  // Filter options
  const filterOptions = {
    genreNames: [...new Set(likedMovies.flatMap(movie => movie.genreNames))],
    releaseDate: [...new Set(likedMovies.map(movie => movie.releaseDate).sort((a, b) => b - a))],
    rating: [...new Set(likedMovies.map(movie => movie.rating))],
  };

  return (
    <div ref={topRef} className="w-full max-w-7xl relative mx-auto px-4 md:px-8 xl:px-0 ">

    <h1>Your Liked Movies</h1>
    <div className="grid md:grid-cols-4 gap-4 my-4 mt-8">
    <form>
        <input
        type="text"
        placeholder="Filter By Title"
        className="border-2 p-2 px-4 transparent w-full"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        />
    </form>
    {Object.entries(filterOptions).map(([category, options]) => (
        <div key={category} className="flex flex-col justify-center relative">
        <div className="flex flex-row justify-between items-center">
            <h4 className="m-0">{category.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}</h4>
            <button
            className="modal-button bg-transparent border-2 border-white rounded-full p-2 w-8 h-8"
            onClick={() => toggleModal(category)}
            type="button"
            >
            <img src={downArrow} className="w-4 h-4 invert" alt="Toggle" />
            </button>
        </div>
        {modals[category] && (
            <div className="filter-modal flex flex-row flex-wrap absolute top-full bg-primary-500 border-2 rounded-2xl p-4 my-2 gap-2 overflow-y-auto z-10">
            {options.map(option => (
                <button
                className="flex h-8 p-2 px-4 text-sm outline border-1"
                key={option}
                onClick={() => addFilter(category, option)}
                type="button"
                >
                {option}
                </button>
            ))}
            </div>
        )}
        </div>
    ))}
    </div>

    {filters.length > 0 && (
    <div className="flex flex-row align-center gap-2 py-2">
        {filters.map((filter, index) => (
        <div key={`${filter.category}-${filter.value}-${index}`} className="flex flex-row items-center text-sm gap-1 outline border-1 px-4 rounded-4xl">
            <span>{filter.value} ({filter.category})</span>
            <button className="bg-transparent px-2 h-8" onClick={() => removeFilter(filter.category, filter.value)} type="button">x</button>
        </div>
        ))}
    </div>
    )}

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
                <button className="border-1 h-6 w-6 p-2 rounded-full bg-white text-xs text-secondary-500 border-secondary-500" onClick={() => removeLikedMovie(movie)} type="button">x</button>
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

    {filteredMovies.length > itemsPerPage && (
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
  );
};

export default LikeList;