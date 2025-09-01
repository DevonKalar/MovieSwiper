import { createContext, useContext, useState } from "react";

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
    const [likedMovies, setLikedMovies] = useState([]);
    const [rejectedMovies, setRejectedMovies] = useState([]);
    const [passedMovies, setPassedMovies] = useState([]);

    console.log('MoviesProvider Mounted!');

    const likeMovie = (newMovie) => {
        setLikedMovies((prev) => [...prev, newMovie]);
        setRejectedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
        setPassedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
    }

    const rejectMovie = (newMovie) => {
        setRejectedMovies((prev) => [...prev, newMovie]);
        setLikedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
        setPassedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
    }

    const passMovie = (newMovie) => {
        setPassedMovies((prev) => [...prev, newMovie]);
    }

    const removeLikedMovie = (newMovie) => {
        setLikedMovies((prev) => prev.filter(movie => movie.id !== newMovie.id));
    }

    return (
        <MoviesContext.Provider value={{
            likedMovies,
            rejectedMovies,
            passedMovies,
            likeMovie,
            rejectMovie,
            passMovie,
            removeLikedMovie
        }}>
            {children}
        </MoviesContext.Provider>
    )
};

const useMovies = () => {
    const context = useContext(MoviesContext);

    if(!context) {
        throw new Error('useMovies must be used within a MoviesProvider');
    }

    return context;
}

export { MoviesProvider, useMovies };