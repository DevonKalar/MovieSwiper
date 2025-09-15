const baseURL = import.meta.env.VITE_BACKEND_URL;


export const fetchMovieDetails = async (movieId) => {
  const url = `${baseURL}movie/${movieId}?language=en-US`;
  console.log("Fetching movie details from:", url);
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return {
      id: data.id,
      title: data.title,
      description: data.overview,
      companies: data.production_companies?.map(company => company.name) || "Unknown",
      genres: data.genres?.map(genre => genre.name) || "Unknown",
      releaseDate: data.release_date,
      poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    };
  } catch (error) {
    console.error("Fetch movie details failed:", error);
    return null;
  }
}

export const fetchMoviesByGenre = async (genres = ["878", "53"], page = 1) => {
  const genreString = genres.join("%7C");
  const url = `${baseURL}movies?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreString}`;
  console.log("Fetching movies from:", url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fetched movies:", data.results);
    return data;
  } catch (error) {
    console.error("Fetch movies failed:", error);
    return [];
  }
}

export const fetchGenres = async () => {
  const url = `${baseURL}genre/movie/list?language=en-US`;
  console.log("Fetching genres from:", url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fetched genres:", data.genres);
    return data.genres;
  } catch (error) {
    console.error("Fetch genres failed:", error);
    return [];
  }
}

export const fetchPopularMovies = async (page = 1) => {
  const url = `${baseURL}popular?language=en-US&page=${page}`;
  console.log("Fetching popular movies from:", url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fetched popular movies:", data.results);
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating: movie.vote_average,
      genres: movie.genre_ids, // Note: genre_ids are numeric IDs; mapping to names requires additional data
    }));
  } catch (error) {
    console.error("Fetch popular movies failed:", error);
    return [];
  }
}

export const fetchPersonalizedMovies = async (genres = ["878", "53"], page = 1) => {
  const genreString = genres.join("%7C");
  const url = `${baseURL}movies?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreString}`;
  const testUrl = "http://localhost:3000/api/tmdb/movies?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
  console.log("Fetching personalized movies from:", testUrl);
  try {
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fetched personalized movies:", data.results);
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
      releaseYear: movie.release_date.split("-")[0],
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      rating: movie.vote_average,
      genres: movie.genre_ids, // Note: genre_ids are numeric IDs; mapping to names requires additional data
    }));
  } catch (error) {
    console.error("Fetch personalized movies failed:", error);
    return [];
  }
}