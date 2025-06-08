import database from '../util/database';
import { Movie } from '../domain/model/Movie';

const getAllMovies = async (): Promise<Movie[]> => {
    try {
        const moviesPrisma = await database.movie.findMany();
        return moviesPrisma.map((moviePrisma) => Movie.from(moviePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getMovieById = async (id: number): Promise<Movie | null> => {
    try {
        console.log('Received movie ID:', id);

        if (!id) {
            throw new Error('Movie ID is required');
        }
        const moviePrisma = await database.movie.findUnique({
            where: { id: id },
        });
        if (!moviePrisma) {
            throw new Error('Movie not found');
        }
        return moviePrisma ? Movie.from(moviePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createMovie = async (movie: Movie): Promise<Movie> => {
    try {
        const moviePrisma = await database.movie.create({
            data: {
                title: movie.title,
                genre: movie.genre,
                decade: movie.decade,
                mood: movie.mood,
                description: movie.description,
                posterUrl: movie.posterUrl,
                rating: movie.rating,
            },
        });
        return Movie.from(moviePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateMovie = async (id: number, updates: Partial<Movie>): Promise<Movie | null> => {
    try {
        const moviePrisma = await database.movie.update({
            where: { id },
            data: updates,
        });
        return Movie.from(moviePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteMovie = async (id: number): Promise<void> => {
    try {
        if (isNaN(id)) {
            throw new Error('Invalid movie ID');
        }

        await database.watchlist.deleteMany({ where: { movieId: id } });

        await database.movie.delete({
            where: { id },
        });
    } catch (error) {
        console.error('Failed to delete movie:', error);
        throw new Error('Database error. See server log for details.');
    }
};

/* const getRandomMovie = async (): Promise<Movie | null> => {
    try {
        console.log('Fetching all movies...');
        const moviesPrisma = await database.movie.findMany();

        console.log(✅ Retrieved ${moviesPrisma.length} movies from database);

        if (moviesPrisma.length === 0) {
            console.error('No movies found!');
            throw new Error('No movies available.');
        }
        const randomIndex = Math.floor(Math.random() * moviesPrisma.length);
        console.log(🎲 Random Index Selected: ${randomIndex});
        return Movie.from(moviesPrisma[randomIndex]);
    } catch (error) {
        console.error('🔥 Error in getRandomMovie():', error);
        throw new Error('Database error. See server log for details.');
    }
}; */

export default {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};
