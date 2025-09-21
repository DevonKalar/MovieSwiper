import { useState, useEffect, useMemo } from "react";
import { useUser } from "@providers/UserProvider.jsx";
import { DownArrowIcon } from '@icons';
import Slider from "@components/common/Slider.jsx";

const WatchListFilter = ({ activeFilters, setActiveFilters, searchTerm, setSearchTerm }) => {
	const [popovers, setPopovers] = useState({});
	const { likedMovies } = useUser();

  // Filter options
  const filters = useMemo(() => ([
		{
			dataProp: 'genreNames',
			categoryName: 'Genre',
			dataOptions: [...new Set(likedMovies.flatMap(movie => movie.genreNames))],
			type: 'tag',
		},
		{
			dataProp: 'releaseDate',
			categoryName: 'Release Date',
			dataOptions: [...new Set(likedMovies.map(movie => movie.releaseDate.split("-")[0]).sort((a, b) => b - a))],
			type: 'date',
		},
		{
			dataProp: 'rating',
			categoryName: 'Rating',
			dataOptions: [...new Set(likedMovies.map(movie => movie.rating))],
			type: 'range',
		},
  ]), [likedMovies]);

	  // Add/remove filter
	const toggleFilter = (category, value, type, dataProp) => {
		const exists = activeFilters.some(filter => filter.category === category && filter.value === value);
		if (exists) {
			setActiveFilters(prev => prev.filter(filter => !(filter.category === category && filter.value === value)));
		} else {
			setActiveFilters(prev => [...prev, { category, value, type, dataProp }]);
		}
	};

  const removeFilter = (category, value) => {
    setActiveFilters(prev => prev.filter(filter => filter.category !== category || filter.value !== value));
  };

	const updateFilter = (category, value, type, dataProp) => {
		setActiveFilters(prev => {
			const exists = prev.some(filter => filter.category === category);
			if (exists) {
				return prev.map(filter => filter.category === category ? { ...filter, value } : filter);
			} else {
				return [...prev, { category, value, type, dataProp }];
			}
		});
	};

  // Popover logic
	useEffect(() => {
		if (Object.keys(popovers).length === 0) return;
		const handleClick = (e) => {
			if (e.target.closest('.filter-popover') || e.target.closest('.popover-button')) return;
			setPopovers({});
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [popovers]);

	const togglePopover = (category) => {
		setPopovers(prev => prev[category] ? {} : { [category]: true });
	};
	
	return (
		<>
			<div className="grid md:grid-cols-4 gap-4 my-4 mt-8">
				<form role="search" aria-label="Filter movies by title">
					<label htmlFor="filter-title" className="sr-only">Filter By Title</label>
					<input
						id="filter-title"
						type="text"
						placeholder="Filter By Title"
						className="border-2 p-2 px-4 transparent w-full"
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
					/>
				</form>
				{filters.map((filter) => (
					<div key={filter.categoryName} className="flex flex-col justify-center relative">
						<div className="flex flex-row justify-between items-center">
							<h4 className="m-0" id={`filter-label-${filter.categoryName}`}>{filter.categoryName}</h4>
							<button
								className="popover-button bg-transparent border-2 border-white rounded-full p-2 w-8 h-8"
								onClick={() => togglePopover(filter.categoryName)}
								type="button"
								aria-haspopup="listbox"
								aria-expanded={!!popovers[filter.categoryName]}
								aria-controls={`popover-${filter.categoryName}`}
								aria-label={`Show options for ${filter.categoryName}`}
							>
								<DownArrowIcon className="w-4 h-4" />
							</button>
						</div>
            {popovers[filter.categoryName] && (
              <div
                id={`popover-${filter.categoryName}`}
                className="filter-popover w-full flex flex-row flex-wrap absolute top-full bg-primary-500 border-2 rounded-2xl p-4 my-2 gap-2 overflow-y-auto z-10"
                role="listbox"
                aria-labelledby={`filter-label-${filter.categoryName}`}
              >
                {(() => {
                  switch (filter.type) {
                    case 'range':
                      return (
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          onChange={newRange => updateFilter(filter.categoryName, newRange, filter.type, filter.dataProp)}
                          label={`Select ${filter.categoryName} range`}
                        />
                      );
                    default:
                      return filter.dataOptions.map(option => (
                        <button
                          className={`flex h-8 p-2 px-4 text-sm outline border-1 ${activeFilters.some(f => f.category === filter.categoryName && f.value === option) ? 'bg-secondary-500' : ''}`}
                          key={option}
                          onClick={() => toggleFilter(filter.categoryName, option, filter.type, filter.dataProp)}
                          type="button"
                          role="option"
                          aria-label={`Add filter: ${option} in ${filter.categoryName}`}
                        >
                          {option}
                        </button>
                      ));
                  }
                })()}
										</div>
									)}
					</div>
				))}
			</div>

			{activeFilters.length > 0 && (
				<div className="flex flex-row align-center gap-2 py-2" aria-label="Active filters">
							{activeFilters.map((filter, index) => (
								<div
									key={`${filter.category}-${filter.value}-${index}`}
									className="flex flex-row items-center text-sm gap-1 outline border-1 px-4 rounded-4xl"
								>
									<span>
										{filter.type === 'range'
											? `${filter.value.min} - ${filter.value.max} (${filter.category})`
											: `${filter.value} (${filter.category})`}
									</span>
									<button
										className="bg-transparent px-2 h-8"
										onClick={() => removeFilter(filter.category, filter.value)}
										type="button"
										aria-label={`Remove filter: ${filter.value} in ${filter.category}`}
									>
										x
									</button>
								</div>
							))}
				</div>
			)}
		</>
	);
};

export default WatchListFilter;