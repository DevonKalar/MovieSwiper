import { useState, useEffect, useRef } from "react";
import { useUser } from "@providers/UserProvider.jsx";
import { DownArrowIcon, CloseIcon } from '@icons';

const WatchListGrid = (movies) => {
  
  if (!movies) {
    return <p>No movies found matching your criteria.</p>;
  }

  return (
    <div ref={topRef} className="w-full max-w-7xl relative mx-auto px-4 md:px-8 xl:px-0 ">

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-2" >
    {paginatedMovies.length === 0 ? (
        <p>No movies found matching your criteria.</p>
    ) : paginatedMovies.map((movie) => (
        <div className="grid-cols-2 gap-2" key={movie.id || movie.title}>
        <div className="relative">
            <img className="rounded-2xl" src={movie.poster} alt={movie.title} />
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

    {filteredMovies.length > itemsPerPage && (
    <div className="flex flex-row justify-center items-center gap-4 p-3 my-4">
        <button onClick={prevPage} disabled={currentPage === 1} type="button">Previous</button>
        <div className="flex flex-row gap-2">
        {pageNumbers.map(number => (
            <button
            key={number}
            className={`bg-transparent w-9 h-9 ${currentPage === number ? 'border-2' : 'opacity-75'}`}
            onClick={() => goToPage(number)}
            type="button"
            >
            {number}
            </button>
        ))}
        </div>
        <button onClick={nextPage} disabled={currentPage === totalPages} type="button">Next</button>
    </div>
    )}

    </div>
  );
};

export default  WatchListGrid;