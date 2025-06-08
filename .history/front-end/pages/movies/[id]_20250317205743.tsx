import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MovieService from '../../services/movieService';
import { Movie } from '@types';

const MovieDetailPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [movie, setMovie] = useState<Movie | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchMovie = async () => {
                try {
                    const data = await MovieService.getMovieById(Number(id));
                    setMovie(data);
                } catch (error) {
                    console.error(error);
                    setError('Failed to fetch movie.');
                }
            };
            fetchMovie();
        }
    }, [id]);

    if (error) return <p className="text-danger">{error}</p>;
    if (!movie) return <p>Loading...</p>;

    return (
        <div className="container mt-5">
            <h1>{movie.title}</h1>
            <p>{movie.description}</p>
            <p>🎭 Genre: {movie.genre}</p>
            <p>📆 Released: {movie.decade}</p>
            <img src={movie.posterUrl} alt={movie.title} className="img-fluid" />
        </div>
    );
};

export default MovieDetailPage;
