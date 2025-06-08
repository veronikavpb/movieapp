import React from 'react';
import { Movie } from '@types';

type Props = {
    movie: Movie;
    onDelete?: () => void;
    onEdit?: () => void;
};

const MovieDetails: React.FC<Props> = ({ movie, onDelete, onEdit }) => {
    return (
        <div className="movie-details">
            <img src={movie.posterUrl} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>
                <strong>Genre:</strong> {movie.genre}
            </p>
            <p>
                <strong>Decade:</strong> {movie.decade}
            </p>
            <p>
                <strong>Mood:</strong> {movie.mood}
            </p>
            <p>
                <strong>Description:</strong> {movie.description}
            </p>
            <p>
                <strong>Rating:</strong> ⭐ {movie.rating}/10
            </p>
            {onEdit && <button onClick={onEdit}>✏ Edit</button>}
            {onDelete && <button onClick={onDelete}>🗑 Delete</button>}
        </div>
    );
};

export default MovieDetails;
