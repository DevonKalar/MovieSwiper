import { useRef } from "react";
import DiscoverCard from "@components/discover/DiscoverCard";
import ScreenReaderAnnouncement from "@components/common/ScreenReaderAnnouncement";
import { useUser } from "@providers/UserContext";
import { useMovieDiscovery } from "@hooks/useMovieDiscovery.js";
import { useAnnouncement } from "@hooks/useAnnouncement.js";

const Discover = () => {
	const { likeMovie, rejectMovie, likedMovies, rejectedMovies } = useUser();
  const { announcement, announce } = useAnnouncement();
  const topCardRef = useRef(null);

  const {
    visibleMovies,
    currentMovie,
    isLoading,
    moveToNext,
  } = useMovieDiscovery(["Thriller", "Action"], likedMovies, rejectedMovies);

	// handle swipe
	const handleSwipe = (direction) => {
		if (direction === 'right') {
			likeMovie(currentMovie);
      announce(`${currentMovie.title} added to watchlist`);
		} else if (direction === 'left') {
			rejectMovie(currentMovie);
      announce(`Passed on ${currentMovie.title}`);
		}

    moveToNext();

    // Focus on the next top card after swipe animation
    setTimeout(() => {
      if (topCardRef.current) {
        topCardRef.current.focus();
      }
    }, 350); // Slightly longer than the 300ms swipe animation 
	};

  return (
    <>
      <ScreenReaderAnnouncement message={announcement} />
      <main 
        className="flex flex-column flex-1 overflow-x-hidden overflow-y-auto py-12 px-4"
        aria-label="Movie discovery area"
      >
        <div className="card-wrapper relative w-full max-w-md mx-auto aspect-2/3">
          {visibleMovies.map((movie, index) => (
            <DiscoverCard 
              key={movie.id} 
              movie={movie} 
              onSwipe={handleSwipe} 
              isLoading={isLoading} 
              style={{ zIndex: 3 - index }}
              isTopCard={index === 0}
              cardRef={index === 0 ? topCardRef : null}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Discover;
