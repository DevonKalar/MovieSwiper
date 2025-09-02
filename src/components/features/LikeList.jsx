import { useState } from "react";
import { useMovies } from "../../providers/MoviesContext.jsx";

const LikeList = () => {

    const { likedMovies, removeLikedMovie } = useMovies();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        genre: [],
        releaseDate: [],
        company: [],
    });

    const addFilter = (category, value) => {
        setFilters(prev => ({
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
            const matchesGenre = filters.genre.length === 0 || filters.genre.includes(movie.genre);
            const matchesReleaseDate = filters.releaseDate.length === 0 || filters.releaseDate.includes(movie.releaseDate);
            const matchesCompany = filters.company.length === 0 || filters.company.includes(movie.company);
            return matchesSearch && matchesGenre && matchesReleaseDate && matchesCompany;
        });
    };

    return (
        <div className="container-sm">

            <h1>Your Liked Movies</h1>

            <div className="filter-bar">
                <form className="search-form ">
                    <input type="text" placeholder="Search..." className="full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </form>
                <button className="button-icon" onClick={() => setIsModalOpen(true)}>F</button>
            </div>

            {isModalOpen && (
                    <div className="filter-modal p-2">
                        <div>
                            <h3>Filters</h3>
                            <h4>Genre</h4>
                            <h4>Release Date</h4>
                            <h4>Company</h4>
                            <h4>Rating</h4>
                        </div>
                        <button className="button-info" onClick={() => setIsModalOpen(false)}>x</button>
                    </div>
                )}

            <div className="grid gap-3">
                {filteredMovies().map((movie) => (
                <div className="grid-cols-2 gap-2">
                    <div className="relative">
                        <img src={movie.poster} alt={movie.title} />
                        <button className="button-info pos-bottom-right m-1">i</button>
                        <button className="button-info pos-top-left m-1" onClick={() => removeLikedMovie(movie)}>x</button>
                    </div>
                    <div className="flex-col justify-between py-2">
                        <div>
                            <h3>{movie.title}</h3>
                            <p>{movie.genre}</p>
                        </div>
                        <div className="flex-col gap-1">
                            <button className="button-primary">Watch</button>
                            <button className="button-outline">Share</button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default LikeList;