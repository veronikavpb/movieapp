import database from '../../util/database';
import { Movie } from '../model/Movie';

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
        const moviePrisma = await database.movie.findUnique({ where: { id } });
        return moviePrisma ? Movie.from(moviePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addMovie = async (movie: Movie): Promise<Movie> => {
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
        return moviePrisma ? Movie.from(moviePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteMovie = async (id: number): Promise<boolean> => {
    try {
        await database.movie.delete({ where: { id } });
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export default { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie };
