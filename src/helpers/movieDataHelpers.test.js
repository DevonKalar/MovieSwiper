import { fetchMoviesWithGenres } from "./movieDataHelpers";
import movieService from '@services/movies';
import { vi, describe, it, expect } from 'vitest';

vi.mock('@services/movies', () => ({
  default: {
    fetchMoviesByGenreId: vi.fn(),
    fetchGenres: vi.fn(),
  }
}));

describe("fetchMoviesWithGenres", () => {

  it("should transform genre IDs to genre names", async () => {
    // Mock 1: Movies with genre IDs
    movieService.fetchMoviesByGenreId.mockResolvedValue([
      { 
        id: 1, 
        title: "Blade Runner", 
        genreIds: [878, 53]  // Science Fiction, Thriller
      }
    ]);
    
    // Mock 2: Genre mapping
    movieService.fetchGenres.mockResolvedValue([
      { id: 878, name: "Science Fiction" },
      { id: 53, name: "Thriller" }
    ]);

    const movies = await fetchMoviesWithGenres([878, 53], 1);
    
    // Verify the transformation worked
    expect(movies[0].genreNames).toEqual(["Science Fiction", "Thriller"]);
    expect(movies[0].id).toBe(1);
    expect(movies[0].title).toBe("Blade Runner");
  });

  it("should handle unknown genre IDs", async () => {
    movieService.fetchMoviesByGenreId.mockResolvedValue([
      { id: 2, title: "Mystery Movie", genreIds: [878, 9999] } // 9999 doesn't exist
    ]);
    
    movieService.fetchGenres.mockResolvedValue([
      { id: 878, name: "Science Fiction" }
    ]);

    const movies = await fetchMoviesWithGenres([878], 1);
    
    expect(movies[0].genreNames).toEqual(["Science Fiction", "Unknown"]);
  });
});
