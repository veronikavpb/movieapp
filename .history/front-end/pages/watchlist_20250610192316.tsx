import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import WatchlistService from '../services/watchlistService';
import MovieCard from '../components/MovieCard';
import { Movie } from '@types';
import { getLoggedInUser } from '../services/auth';

const WatchlistPage: React.FC = () => {
    const router = useRouter();
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const user = getLoggedInUser();

        if (!user || !user.id) {
            console.warn('No valid user found, redirecting to login.');
            router.push('/login');
            return;
        }

        if (user.role !== 'USER') {
            alert('Unauthorized: Users only');
            router.push('/');
            return;
        }

        const fetchWatchlist = async () => {
            try {
                const data = await WatchlistService.getWatchlist(user.id);
                setMovies(data);
            } catch (error) {
                console.error('Failed to fetch watchlist:', error);
            }
        };
        fetchWatchlist();
    }, [router]);

    const handleRemoveMovie = async (movieId: number) => {
        const user = getLoggedInUser();
        try {
            await WatchlistService.removeFromWatchlist(user.id, movieId);
            setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
        } catch (error) {
            console.error('Failed to remove movie:', error);
        }
    };

    return (
        <div className="container text-center mt-4">
            <h1>🎥 My Watchlist</h1>
            <div className="row">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} className="col-md-4">
                            <MovieCard movie={movie} onDelete={handleRemoveMovie} />
                        </div>
                    ))
                ) : (
                    <p>No movies in watchlist.</p>
                )}
            </div>
        </div>
    );
};

export default WatchlistPage;
