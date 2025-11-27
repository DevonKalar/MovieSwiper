export interface Movie {
  id?: number;
  tmdbId: number;
  title: string;
  description: string;
  posterUrl: string;
  genres: string[];
  ratings: number;
  releaseDate: string;
}

export type Watchlist = Movie[];
export type LikedMovies = Movie[]; // To be deprecated in future Watchlist implementation