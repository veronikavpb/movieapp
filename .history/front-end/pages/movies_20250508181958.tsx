import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MovieService from '../services/movieService';
import MovieCard from '../components/MovieCard';
import MovieForm from '../components/MovieForm';
import { Movie } from '@types';
import { getLoggedInUser } from '../services/auth';

const MoviesPage: React.FC = () => {
    const router = useRouter();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const user = getLoggedInUser();
        if (!user) {
            router.push('/login');
            return;
        }

        if (user.role !== 'admin') {
            alert('Unauthorized: Admins only');
            router.push('/');
            return;
        }

        const fetchMovies = async () => {
            try {
                const data = await MovieService.getAllMovies();
                setMovies(data);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch movies.');
            }
        };
        fetchMovies();
    }, [router]);

    const handleDeleteMovie = async (id: number) => {
        try {
            await MovieService.deleteMovie(id);
            setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
        } catch (error) {
            console.error(error);
            setError('Failed to delete movie.');
        }
    };

    return (
        <div className="container text-center mt-4">
            <h1>Manage Movies (Admin)</h1>
            {error && <p className="text-danger">{error}</p>}

            <MovieForm
                movie={editingMovie}
                setMovies={setMovies}
                setEditingMovie={setEditingMovie}
            />

            <div className="row">
                {movies.map((movie) => (
                    <div key={movie.id} className="col-md-4">
                        <MovieCard movie={movie} onDelete={handleDeleteMovie} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoviesPage;
