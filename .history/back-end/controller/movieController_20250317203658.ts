import { Request, Response } from 'express';
import { MovieService } from '../services/movieService';

const movieService = new MovieService();

export class MovieController {
    async getAllMovies(req: Request, res: Response) {
        try {
            const movies = await movieService.getAllMovies();
            res.json(movies);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving movies', error });
        }
    }

    async getMovieById(req: Request, res: Response) {
        try {
            const movieId = parseInt(req.params.id);
            if (isNaN(movieId)) {
                return res.status(400).json({ message: 'Invalid movie ID' });
            }
            const movie = await movieService.getMovieById(movieId);
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.json(movie);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving movie', error });
        }
    }

    async addMovie(req: Request, res: Response) {
        try {
            const movieData = req.body;
            const newMovie = await movieService.addMovie(movieData);
            res.status(201).json(newMovie);
        } catch (error) {
            res.status(500).json({ message: 'Error adding movie', error });
        }
    }

    async updateMovie(req: Request, res: Response) {
        try {
            const movieId = parseInt(req.params.id);
            const updateData = req.body;
            if (isNaN(movieId)) {
                return res.status(400).json({ message: 'Invalid movie ID' });
            }
            const updatedMovie = await movieService.updateMovie(movieId, updateData);
            if (!updatedMovie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.json(updatedMovie);
        } catch (error) {
            res.status(500).json({ message: 'Error updating movie', error });
        }
    }

    async deleteMovie(req: Request, res: Response) {
        try {
            const movieId = parseInt(req.params.id);
            if (isNaN(movieId)) {
                return res.status(400).json({ message: 'Invalid movie ID' });
            }
            const deleted = await movieService.deleteMovie(movieId);
            if (!deleted) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.json({ message: 'Movie deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting movie', error });
        }
    }
}
