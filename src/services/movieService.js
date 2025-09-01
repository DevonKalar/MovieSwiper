const baseURL = "https://api.themoviedb.org/3/movie/";


export const fetchMovieDetails = async (movieId) => {
  const url = `${baseURL}${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`;
  console.log("Fetching movie details from:", url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return {
      id: data.id,
      title: data.title,
      description: data.overview,
      company: data.production_companies?.map(company => company.name).join(", ") || "Unknown",
      genre: data.genres?.map(genre => genre.name).join(", ") || "Unknown",
      releaseDate: data.release_date,
      poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    };
  } catch (error) {
    console.error("Fetch movie details failed:", error);
    return null;
  }
}