export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  description: string;
  releaseDate: string;
  rating: number;
  genres: string[];
}

export interface RawMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  backdrop_path?: string; // To be deprecated in future service implementation
  vote_average: number;
  genre_names: string[];
  genre_ids?: number[];
  companies?: string[]; // To be deprecated in future service implementation
}

export type Watchlist = Movie[];
export type LikedMovies = Movie[]; // To be deprecated in future Watchlist implementation