import { CloseIcon } from '@icons';

const WatchListGrid = ({movies, removeLikedMovie}) => {

  if (!movies || movies.length === 0) {
    return <p>No movies found matching your criteria.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-2" >
      {movies.map((movie) => (
        <div className="grid-cols-2 gap-2" key={movie.id || movie.title}>
          <div className="relative">
            <img className="rounded-2xl aspect-2/3 object-cover" src={movie.poster} alt={movie.title} />
            <div className="flex flex-col absolute top-0 left-0 w-full h-full p-4 justify-between opacity-0 hover:opacity-100 bg-blur text-white rounded-2xl border-1 border-primary-300">
            <div className="flex flex-row justify-between items-start gap-4">
              <div>
              <h3>{movie.title}</h3>
              <p>{movie.genreNames.join(", ")}</p>
              </div>
              <button className="h-6 w-6 p-0 rounded-full bg-transparent text-error-500" onClick={() => removeLikedMovie(movie)} type="button"><CloseIcon /></button>
            </div>
            <div className="flex flex-col gap-2">
                <button className="border-2 border-secondary-500 w-full" type="button">Watch</button>
                <button className="border-2 border-white bg-transparent w-full" type="button">Explore</button>
            </div>
            </div>
          </div>
        </div>
    ))}
    </div>
  );
};

export default  WatchListGrid;