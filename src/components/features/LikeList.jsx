const LikeList = () => {

    return (
        <div className="like-list-box">
            <h1>Liked Movies</h1>
            <div className="like-list">
                { /* in the future we will iterate over liked movies here, and have a condition for no liked movies */ }
                <div className="like-item">
                    <img src="https://dummyimage.com/800x1000/000/fff" alt="Movie Poster" />
                    <div className="like-item-info">
                        <h2>Movie Title</h2>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LikeList;