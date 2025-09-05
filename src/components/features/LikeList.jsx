import { useState, useRef, useEffect } from "react";
import { useMovies } from "../../providers/MoviesContext.jsx";

const LikeList = () => {

    const { likedMovies, removeLikedMovie } = useMovies();

    // filtering options

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState([]);

    const addFilter = (category, value) => {
        if (!filters.some(filter => filter.category === category && filter.value === value)) {
            setFilters(prev => [...prev, { category, value }]);
        }
    };

    const removeFilter = (category, value) => {
        setFilters(prev => prev.filter(filter => filter.category !== category || filter.value !== value));
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filters]);

    // filtering logic

    const filteredMovies = () => {
        return likedMovies.filter(movie => {
            if(movie.title == null) return false;
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
    };

    // filter tags

    const filterOptions = {
        genres: [...new Set(likedMovies.flatMap(movie => movie.genres))],
        releaseDates: [...new Set(likedMovies.map(movie => movie.releaseDates))],
        companies: [...new Set(likedMovies.flatMap(movie => movie.companies))],
    }

    // client-side pagination

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 24;

    const paginatedMovies = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredMovies().slice(start, end);
    };

    const pageNumbers = () => {
        const totalPages = Math.ceil(filteredMovies().length / itemsPerPage);
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredMovies().length / itemsPerPage)) {
            setCurrentPage(prev => prev + 1);
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }

    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // modal states

    const [modals, setModals] = useState({});

    const modalRef = useRef();

    // close modal on outside click
    useEffect(() => {
        if (Object.keys(modals).length === 0) return;
        const handleClick = (e) => {
            if (e.target.closest('.filter-modal') || e.target.closest('.modal-button')) {
                return;
            }
            setModals({});
        };
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [modals]);

    const toggleModal = (category) => {
    setModals(prev => 
        prev[category] ? {} : { [category]: true }
    );
    };

    return (
        <div className="w-full max-w-7xl relative mx-auto px-4 md:px-8 xl:px-0 ">

            {likedMovies.length == 0 ? <p>Like some movies man</p> : 
            
            <>

            <h1>Your Liked Movies</h1>

            <div className="grid md:grid-cols-4 gap-4 my-4 mt-8">
                <form>
                    <input type="text" placeholder="Filter By Title" className="border-2 p-2 px-4 transparent w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </form>
                {Object.entries(filterOptions).map(([category, options]) => (
                    <div key={category} className="flex flex-col justify-center relative">
                        <div className="flex flex-row justify-between items-center">
                        <h4 className="m-0">{category.charAt(0).toUpperCase() + category.slice(1)}</h4> 
                        <button className="modal-button bg-transparent border-2 border-white rounded-full p-2 w-8 h-8" onClick={() => toggleModal(category)}><img src="/src/assets/icons/down-arrow.png" className="w-4 h-4 invert"/></button>
                        </div>
                        {modals[category] && 
                            <div ref={modalRef} className="filter-modal flex flex-row flex-wrap absolute top-full bg-primary-500 border-2 rounded-2xl p-4 my-2 gap-2 overflow-y-auto z-10">
                                {options.map(option => (
                                    <button className="flex h-8 p-2 px-4 text-sm outline border-1" key={option} onClick={() => addFilter(category, option)}>
                                        {option}
                                    </button>
                                ))}
                            </div>}
                    </div>
                ))}
            </div>

            {filters.length > 0 ? (
                <div className="flex flex-row align-center gap-2 py-2">
                    {filters.map((filter, index) => (
                        <div key={`${filter.category}-${filter.value}-${index}`} className="flex flex-row items-center text-sm gap-1 outline border-1 px-4 rounded-4xl">
                            <span>{filter.value} ({filter.category})</span>
                            <button className="bg-transparent px-2 h-8" onClick={() => removeFilter(filter.category, filter.value)}>x</button>
                        </div>
                    ))}
                </div>
            ) : null}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-2">
                {paginatedMovies().length === 0 ? <p>No movies found matching your criteria.</p> : paginatedMovies().map((movie) => (
                <div className="grid-cols-2 gap-2">
                    <div className="relative">
                        <img className="rounded-2xl" src={movie.poster} alt={movie.title} />
                        <div className="flex flex-col absolute top-0 left-0 w-full h-full p-4 justify-between opacity-0 hover:opacity-100 hover:backdrop-blur-xs bg-blur text-white rounded-2xl border-1 border-primary-300">
                            <div className="flex flex-row justify-between items-start gap-4">
                                <div>
                                    <h3>{movie.title}</h3>
                                    <p>{movie.genres.join(", ")}</p>
                                </div>
                                <button className="border-1 h-6 w-6 p-2 rounded-full bg-white text-xs text-secondary-500 border-secondary-500" onClick={() => removeLikedMovie(movie)}>x</button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="border-2 border-secondary-500 w-full">Watch</button>
                                <button className="border-2 border-white bg-transparent w-full">Explore</button>
                            </div>
                        </div>
                    </div>
                    
                </div>
                ))}
            </div>

            {filteredMovies().length > itemsPerPage && (
                <div className="flex flex-row justify-center items-center gap-4 p-3 my-4">
                    <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                        <div className="flex flex-row gap-2">
                            {pageNumbers().map(number => {
                                return (
                                    <button key={number} className={`bg-transparent w-9 h-9 ${currentPage === number ? 'border-2' : 'opacity-75'}`} onClick={() => goToPage(number)}>
                                        {number}
                                    </button>
                                );
                            })}
                        </div>
                    <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredMovies().length / itemsPerPage)}>Next</button>
                </div>
            )}
            
            </>}

        </div>
    )
}

export default LikeList;