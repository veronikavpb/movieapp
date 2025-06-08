import React, { useEffect, useState } from 'react';
import { Movie } from '@types';
import WatchlistService from '../services/watchlistService';
import { getLoggedInUser } from '../services/auth';

type Props = {
    movie: Movie;
    onSelect?: () => void;
    onDelete?: (movieId: number) => void;
    onEdit?: (movie: Movie) => void;
};

const MovieCard: React.FC<Props> = ({ movie, onSelect, onDelete, onEdit }) => {
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [user, setUser] = useState<{ id: number; role: string } | null>(null);

    useEffect(() => {
        const currentUser = getLoggedInUser();
        setUser(currentUser);

        if (currentUser?.role === 'USER') {
            WatchlistService.getWatchlist(currentUser.id)
                .then((watchlist) => {
                    const exists = watchlist.some((item: any) => item.movieId === movie.id);
                    setIsInWatchlist(exists);
                })
                .catch((err) => console.error('Error fetching watchlist:', err));
        }
    }, [movie.id]);

    const toggleWatchlist = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering onSelect
        if (!user) return;

        try {
            if (isInWatchlist) {
                await WatchlistService.removeFromWatchlist(user.id, movie.id);
                setIsInWatchlist(false);
            } else {
                await WatchlistService.addToWatchlist(user.id, movie.id);
                setIsInWatchlist(true);
            }
        } catch (err) {
            console.error('Watchlist error:', err);
        }
    };

    return (
        <div className="card h-100 shadow-sm" onClick={onSelect}>
            <img src={movie.posterUrl} className="card-img-top" alt={movie.title} />
            <div className="card-body">
                <h5 className="card-title d-flex justify-content-between align-items-center">
                    {movie.title}
                    {user?.role === 'USER' && (
                        <span style={{ cursor: 'pointer' }} onClick={toggleWatchlist}>
                            {isInWatchlist ? '❤️' : '🤍'}
                        </span>
                    )}
                </h5>
                <p className="card-text">
                    {movie.genre} | {movie.decade} | {movie.mood}
                </p>
                <p className="card-text">⭐ {movie.rating}/10</p>

                {onEdit && (
                    <button className="btn btn-warning mx-1" onClick={() => onEdit(movie)}>
                        ✏️ Edit
                    </button>
                )}

                {onDelete && (
                    <button
                        className="btn btn-danger"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(movie.id);
                        }}
                    >
                        🗑 Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieCard;
