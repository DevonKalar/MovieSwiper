
import { useState, useEffect } from "react";
import { DownArrowIcon } from '@icons';

const WatchListFilter = ({ activeFilters, setActiveFilters, filters, searchTerm, setSearchTerm }) => {
	const [popovers, setPopovers] = useState({});


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

	  // Add/remove filter
  const addFilter = (category, value) => {
    if (!activeFilters.some(filter => filter.category === category && filter.value === value)) {
      setActiveFilters(prev => [...prev, { category, value }]);
    }
  };
  const removeFilter = (category, value) => {
    setActiveFilters(prev => prev.filter(filter => filter.category !== category || filter.value !== value));
  };
	
	return (
		<>
			<div className="grid md:grid-cols-4 gap-4 my-4 mt-8">
				<form>
					<input
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
							<h4 className="m-0">{filter.categoryName}</h4>
							<button
									className="popover-button bg-transparent border-2 border-white rounded-full p-2 w-8 h-8"
									onClick={() => togglePopover(filter.categoryName)}
									type="button"
							>
									<DownArrowIcon className="w-4 h-4" />
							</button>
						</div>
							{popovers[filter.categoryName] && (
								<div className="filter-popover flex flex-row flex-wrap absolute top-full bg-primary-500 border-2 rounded-2xl p-4 my-2 gap-2 overflow-y-auto z-10">
									{filter.dataOptions.map(option => (
										<button
											className="flex h-8 p-2 px-4 text-sm outline border-1"
											key={option}
											onClick={() => addFilter(filter.dataName, option)}
											type="button"
										>
											{option}
										</button>
									))}
								</div>
							)}
					</div>
				))}
			</div>

			{activeFilters.length > 0 && (
				<div className="flex flex-row align-center gap-2 py-2">
					{activeFilters.map((filter, index) => (
						<div key={`${filter.category}-${filter.value}-${index}`} className="flex flex-row items-center text-sm gap-1 outline border-1 px-4 rounded-4xl">
							<span>{filter.value} ({filter.category})</span>
							<button className="bg-transparent px-2 h-8" onClick={() => removeFilter(filter.category, filter.value)} type="button">x</button>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default WatchListFilter;