import { CloseIcon, StarIcon } from '@icons';


const WatchListModal = ({ movie, closeModal }) => {
	return (
		<div className="modal-overlay w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black/50 backdrop-blur-xs">
			<div
				className="modal-content max-w-4xl mx-4 bg-primary-500/90 border-2 rounded-2xl shadow-lg relative"
				role="dialog"
				aria-modal="true"
				aria-labelledby="watchlist-modal-title"
				aria-describedby="watchlist-modal-desc"
			>
				<div className="flex flex-col md:flex-row gap-4">
					<img
						className="w-full md:w-1/2 rounded-xl absolute md:static md:rounded-r aspect-2/3"
						src={movie.poster}
						alt={`Poster for ${movie.title}`}
					/>
					<div className="flex flex-col md:w-1/2 inset-0 z-10 bg-gradient-to-t aspect-2/3 from-black via-black/90 to-transparent md:bg-none rounded-b-xl py-8 p-4 gap-2">
						<div className="border-2 gap-2 flex flex-row justify-start items-center border-primary-700 bg-primary-700 w-fit p-1 px-2 rounded-full">
							<StarIcon className="w-4 h-4 text-accent-500" />
							<p className="text-sm text-white">{movie.rating.toFixed(1)} </p>
						</div>
						<h2 id="watchlist-modal-title" className="text-5xl">{movie.title}</h2>
						<p className="text-sm text-white mb-2">{movie.genreNames.join(", ")}</p>
						<p id="watchlist-modal-desc">{movie.description}</p>
						<div className="flex flex-row flex-wrap justify-start items-start gap-2 mt-4">
							<button aria-label={`Watch ${movie.title} on Netflix`}>Watch On Netflix</button>
							<button aria-label={`Watch ${movie.title} on Amazon`}>Watch On Amazon</button>
							<button aria-label={`Watch ${movie.title} on Disney Plus`}>Watch On Disney+</button>
						</div>
					</div>
				</div>
				<button
					className="absolute top-4 right-4 h-6 w-6 p-0 rounded-full bg-secondary-500 text-white z-50"
					onClick={() => closeModal()}
					type="button"
					aria-label="Close modal"
				>
					<CloseIcon />
				</button>
			</div>
		</div>
	);
};

export default WatchListModal;
