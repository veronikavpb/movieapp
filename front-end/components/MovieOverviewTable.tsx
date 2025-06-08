import React from 'react';
import { Movie } from '@types';
import MovieCard from './MovieCard';

type Props = {
    movies: Movie[];
    onDelete?: (movieId: number) => void;
};

const MovieOverviewTable: React.FC<Props> = ({ movies, onDelete }) => {
    return (
        <div className="container mt-4">
            <div className="row">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <MovieCard movie={movie} onDelete={onDelete} />
                        </div>
                    ))
                ) : (
                    <p className="text-center">No movies available.</p>
                )}
            </div>
        </div>
    );
};

export default MovieOverviewTable;
