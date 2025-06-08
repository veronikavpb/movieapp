import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MovieService from '../services/movieService';
import MovieCard from '../components/MovieCard';
import { Movie } from '@types';
import { getLoggedInUser } from '../services/auth';

const IndexPage: React.FC = () => {
    const router = useRouter();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const user = getLoggedInUser();
        if (!user) {
            router.push('/login');
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
    return (
        <div className="container text-center mt-4">
            <h1>Movie List</h1>
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
                {movies.map((movie) => (
                    <div key={movie.id} className="col-md-4">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IndexPage;
