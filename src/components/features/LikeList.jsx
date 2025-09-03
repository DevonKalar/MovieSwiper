import { useState } from "react";
import { useMovies } from "../../providers/MoviesContext.jsx";

const LikeList = () => {

    const { likedMovies, removeLikedMovie } = useMovies();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        genres: [],
        releaseDates: [],
        companies: [],
    });

    const addFilter = (category, value) => {
        if (!filters[category].includes(value)) setFilters(prev => ({
            ...prev,
            [category]: [...prev[category], value]
        }));
    };

    const removeFilter = (category, value) => {
        setFilters(prev => ({
            ...prev,
            [category]: prev[category].filter(item => item !== value)
        }));
    };

    // filtering logic

    const filteredMovies = () => {
        return likedMovies.filter(movie => {
            const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGenre = filters.genres.length === 0 || filters.genres.every(g => movie.genres.includes(g));
            const matchesReleaseDate = filters.releaseDates.length === 0 || filters.releaseDates.includes(movie.releaseDate);
            const matchesCompany = filters.companies.length === 0 || filters.companies.includes(movie.companies);
            return matchesSearch && matchesGenre && matchesReleaseDate && matchesCompany;
        });
    };

    // filtering modal

    const filterOptions = {
        genres: [...new Set(likedMovies.flatMap(movie => movie.genres))],
        releaseDates: [...new Set(likedMovies.map(movie => movie.releaseDates))],
        companies: [...new Set(likedMovies.flatMap(movie => movie.companies))],
    }

    return (
        <div className="container-xl">

            <h1>Your Liked Movies</h1>

            <div className="filter-bar">
                <form className="search-form ">
                    <input type="text" placeholder="Search..." className="full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </form>
                {isModalOpen ? <button className="button-icon bg-white text-secondary border-secondary" onClick={() => setIsModalOpen(false)}>F</button> : <button className="button-icon" onClick={() => setIsModalOpen(true)}>F</button>}
            </div>

            {isModalOpen && (
                    <div className="filter-modal p-2">
                        <div>
                            <h3>Filters</h3>
                            {Object.entries(filterOptions).map(([category, options]) => (
                                <div key={category}>
                                    <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                                    <div>
                                        {options.map(option => (
                                            <button key={option} onClick={() => addFilter(category, option)}>
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            {filters.genres.length > 0 || filters.releaseDates.length > 0 || filters.companies.length > 0 ? (
                <div className="active-filters flex-row align-center gap-2 p-2">
                    <h4 className="m-0">Active Filters:</h4>
                    {Object.entries(filters).flatMap(([category, filters]) => (
                        filters.map(filter => (
                            <div key={category + filter} className="filter-badge align-center">{filter}<button onClick={() => removeFilter(category, filter)}>x</button></div>
                        ))
                    ))}
                </div>
            ) : null}

            <div className="grid-cols-3 gap-3">
                {filteredMovies().map((movie) => (
                <div className="grid-cols-2 gap-2">
                    <div>
                        <img src={movie.poster} alt={movie.title} />
                    </div>
                    <div className="flex-col justify-between py-2 relative">
                        <button className="pos-top-right" onClick={() => removeLikedMovie(movie)}>x</button>
                        <div>
                            <h3>{movie.title}</h3>
                            <p>{movie.genres.join(", ")}</p>
                        </div>
                        <div className="flex-col gap-1">
                            <button className="button-primary">Watch</button>
                            <button className="button-outline">Explore</button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default LikeList;