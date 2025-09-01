import { useState, useRef } from "react";

const LikeList = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const sliderRef = useRef(null);
    
    // WIP - Liked Movies will be an array of objects later 
    const likedMovies = ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"];

    const handleMouseDown = (e) => {
        setIsDragging(true);
        
        setStartX(e.clientX);
        
        if (sliderRef.current) {
            sliderRef.current.style.cursor = 'grabbing';
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const currentX = e.clientX;
        const diff = currentX - startX;
        setTranslateX(diff);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        
        setIsDragging(false);
        
        if (sliderRef.current) {
            sliderRef.current.style.cursor = 'grab';
        }
        
        const threshold = 100;

        if (translateX > threshold && currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        } else if (translateX < -threshold && currentIndex < likedMovies.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }

        setTranslateX(0);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleMouseUp();
        }
    };

    return (
        <div className="like-list-box">
            <h1>Your Liked Movies</h1>
            { /* WIP - Render for no movies liked */ }
            <div ref={sliderRef} className="like-list" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave}>
                <div style={{ transform: `translateX(-${currentIndex * (100 / likedMovies.length)}%) translateX(${isDragging ? translateX : 0}px)`, transition: isDragging ? 'none' : 'transform 0.3s ease-out', display: 'flex' }}>
                    { /* in the future we will iterate over liked movies here */ }
                    <div key={1} className="like-list-item" >
                        <button className="info-button">i</button>
                        <img src="https://dummyimage.com/440x660/000/fff" alt="Movie Poster" />
                        <div className="button-wrapper">
                            <button className="button-primary" onClick={() => console.log('I AM WORKING')}>Watch</button>
                            <button className="button-outline" onClick={() => console.log('I AM WORKING')}>Share</button>
                        </div>
                    </div>
                    <div key={2} className="like-list-item" >
                        <button className="info-button">i</button>
                        <img src="https://dummyimage.com/440x660/000/fff" alt="Movie Poster" />
                        <div className="button-wrapper">
                            <button className="button-primary" onClick={() => console.log('I AM WORKING')}>Watch</button>
                            <button className="button-outline" onClick={() => console.log('I AM WORKING')}>Share</button>
                        </div>
                    </div>
                    <div key={3} className="like-list-item" >
                        <button className="info-button">i</button>
                        <img src="https://dummyimage.com/440x660/000/fff" alt="Movie Poster" />
                        <div className="button-wrapper">
                            <button className="button-primary" onClick={() => console.log('I AM WORKING')}>Watch</button>
                            <button className="button-outline" onClick={() => console.log('I AM WORKING')}>Share</button>
                        </div>
                    </div>
                    <div key={4} className="like-list-item" >
                        <button className="info-button">i</button>
                        <img src="https://dummyimage.com/440x660/000/fff" alt="Movie Poster" />
                        <div className="button-wrapper">
                            <button className="button-primary" onClick={() => console.log('I AM WORKING')}>Watch</button>
                            <button className="button-outline" onClick={() => console.log('I AM WORKING')}>Share</button>
                        </div>
                    </div>
                    <div key={5} className="like-list-item" >
                        <button className="info-button">i</button>
                        <img src="https://dummyimage.com/440x660/000/fff" alt="Movie Poster" />
                        <div className="button-wrapper">
                            <button className="button-primary" onClick={() => console.log('I AM WORKING')}>Watch</button>
                            <button className="button-outline" onClick={() => console.log('I AM WORKING')}>Share</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default LikeList;