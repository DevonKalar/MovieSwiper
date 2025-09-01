import { useState } from "react";

const LikeList = () => {
    
    // WIP - Liked Movies will be an array of objects later 
    const likedMovies = ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"];

    return (
        <div className="container-sm">

            <h1>Your Liked Movies</h1>

            <div className="filter-bar">
                <form className="search-form ">
                    <input type="text" placeholder="Search..." className="full" />
                </form>
                <button className="button-icon">F</button>
            </div>

            <div className="grid gap-3">

                <div className="grid-cols-2 gap-2">
                    <div className="relative">
                        <img src="https://dummyimage.com/440x660/000/fff" alt="Movie 1" />
                        <button className="button-info pos-bottom-right m-1">i</button>
                    </div>
                    <div className="flex-col justify-between py-2">
                        <div>
                            <h3>Movie Title</h3>
                            <p>Director</p>
                            <p>Genre</p>
                        </div>
                        <div className="flex-col gap-1">
                            <button className="button-primary">Watch</button>
                            <button className="button-outline">Share</button>
                        </div>
                    </div>
                </div>

                <div className="grid-cols-2 gap-2">
                    <div className="relative">
                        <img src="https://dummyimage.com/440x660/000/fff" alt="Movie 1" />
                        <button className="button-info pos-bottom-right m-1">i</button>
                    </div>
                    <div className="flex-col justify-between py-2">
                        <div>
                            <h3>Movie Title</h3>
                            <p>Director</p>
                            <p>Genre</p>
                        </div>
                        <div className="flex-col gap-1">
                            <button className="button-primary">Watch</button>
                            <button className="button-outline">Share</button>
                        </div>
                    </div>
                </div>

                <div className="grid-cols-2 gap-2">
                    <div className="relative">
                        <img src="https://dummyimage.com/440x660/000/fff" alt="Movie 1" />
                        <button className="button-info pos-bottom-right m-1">i</button>
                    </div>
                    <div className="flex-col justify-between py-2">
                        <div>
                            <h3>Movie Title</h3>
                            <p>Director</p>
                            <p>Genre</p>
                        </div>
                        <div className="flex-col gap-1">
                            <button className="button-primary">Watch</button>
                            <button className="button-outline">Share</button>
                        </div>
                    </div>
                </div>

                <div className="grid-cols-2 gap-2">
                    <div className="relative">
                        <img src="https://dummyimage.com/440x660/000/fff" alt="Movie 1" />
                        <button className="button-info pos-bottom-right m-1">i</button>
                    </div>
                    <div className="flex-col justify-between py-2">
                        <div>
                            <h3>Movie Title</h3>
                            <p>Director</p>
                            <p>Genre</p>
                        </div>
                        <div className="flex-col gap-1">
                            <button className="button-primary">Watch</button>
                            <button className="button-outline">Share</button>
                        </div>
                    </div>
                </div>

                <div className="grid-cols-2 gap-2">
                    <div className="relative">
                        <img src="https://dummyimage.com/440x660/000/fff" alt="Movie 1" />
                        <button className="button-info pos-bottom-right m-1">i</button>
                    </div>
                    <div className="flex-col justify-between py-2">
                        <div>
                            <h3>Movie Title</h3>
                            <p>Director</p>
                            <p>Genre</p>
                        </div>
                        <div className="flex-col gap-1">
                            <button className="button-primary">Watch</button>
                            <button className="button-outline">Share</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default LikeList;