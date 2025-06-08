import React from 'react';
import { Movie } from '@types';

type Props = {
    movies: Movie[];
    onRemove: (movieId: number) => void;
};

const WatchlistTable: React.FC<Props> = ({ movies, onRemove }) => {
    return (
        <table className="movie-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Rating</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie) => (
                    <tr key={movie.id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre}</td>
                        <td>⭐ {movie.rating}/10</td>
                        <td>
                            <button onClick={() => onRemove(movie.id)}>❌ Remove</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default WatchlistTable;
