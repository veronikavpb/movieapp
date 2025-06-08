import express, { Request, Response, NextFunction } from 'express';
import movieService from '../service/movieService';

const movieRouter = express.Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies.
 *     responses:
 *       200:
 *         description: A list of movies.
 */
movieRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await movieService.getAllMovies();
        res.status(200).json(movies);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The movie ID.
 */
movieRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movie = await movieService.getMovieById(Number(req.params.id));
        if (!movie) {
            return res.status(404).json({ status: 'error', message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie.
 */
movieRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newMovie = await movieService.createMovie(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie by ID.
 */
movieRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedMovie = await movieService.updateMovie(Number(req.params.id), req.body);
        res.status(200).json(updatedMovie);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie by ID.
 */
movieRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await movieService.deleteMovie(Number(req.params.id));
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export { movieRouter };
