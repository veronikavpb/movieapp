import React, { useState } from 'react';
import MovieDetails from '../../components/MovieDetails';
import MovieService from '../../services/movieService';
import WatchlistService from '../../services/watchlistService';
import '../styles/globals.css';

const IndexPage: React.FC = () => {
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedMood, setSelectedMood] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [randomMovie, setRandomMovie] = useState<any>(null);

    const handleFindMovie = async () => {
        try {
            const movie = await MovieService.getRandomMovie(
                selectedGenre,
                selectedMood,
                selectedDate
            );
            setRandomMovie(movie);
        } catch (error) {
            console.error(error);
            alert('No movies found matching the criteria.');
        }
    };

    const handleAddToWatchlist = async () => {
        if (randomMovie) {
            await WatchlistService.addToWatchlist(1, randomMovie.id);
            alert('Movie added to watchlist!');
        }
    };

    return (
        <div className="container">
            <h1>🎥 Random Movie Generator</h1>
            <div className="filters">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Mood"
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                />
            </div>
            {randomMovie && <MovieDetails movie={randomMovie} />}
            {randomMovie && <button onClick={handleAddToWatchlist}>➕ Add to Watchlist</button>}
        </div>
    );
};

export default IndexPage;
