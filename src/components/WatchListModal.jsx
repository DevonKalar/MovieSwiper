import { CloseIcon, StarIcon } from '@icons';

const WatchListModal = ({ movie, closeModal }) => {
	return (
		<div className="modal-overlay w-full h-full fixed top-0 left-0 flex items-center justify-center bg-black/50 backdrop-blur-xs">
			<div className="modal-content max-w-4xl bg-primary-500/90 border-2 rounded-2xl shadow-lg relative">
				<div className="flex flex-row gap-4">
					<img className="w-full md:w-1/2 rounded-xl aspect-2/3" src={movie.poster} alt={movie.title} />
					<div className="flex flex-col md:w-1/2 py-8 pr-8 gap-2">
						<div className="border-2 gap-2 flex flex-row justify-start items-center border-primary-700 bg-primary-700 w-fit p-1 px-2 rounded-full">
							<StarIcon className="w-4 h-4 text-accent-500" /> 
							<p className="text-sm text-white">{Math.round(movie.rating * 100 ) / 100}</p>
						</div>
						<h2 className="text-5xl">{movie.title}</h2>
						<p className="text-sm text-white mb-2">{movie.genreNames.join(", ")}</p>
						<p className="mb-4">{movie.description}</p>
						<div className="flex flex-row flex-wrap justify-start items-start gap-2">
							<button>Watch On Netflix</button>
							<button>Watch On Amazon</button>
							<button>Watch On Disney+</button>
						</div>
					</div>
				</div>

				<button className="absolute top-4 right-4 h-6 w-6 p-0 rounded-full bg-transparent text-white" onClick={() => closeModal()} type="button"><CloseIcon /></button>
			</div>
		</div>
	);
};

export default WatchListModal;
