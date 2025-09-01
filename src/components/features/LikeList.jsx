import { useMovies } from "../../providers/MoviesContext.jsx";

const LikeList = () => {

    const { likedMovies, removeLikedMovie } = useMovies();

    return (
        <div className="container-sm">

            <h1>Your Liked Movies</h1>

            <div className="filter-bar">
                <form className="search-form ">
                    <input type="text" placeholder="Search..." className="full" />
                </form>
                <button className="button-icon">F</button>
            </div>

            <div className="grid gap-3">
                {likedMovies.map((movie) => (
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