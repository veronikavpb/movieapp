/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         title:
 *           type: string
 *           description: Title of the movie.
 *         genre:
 *           type: string
 *           description: Genre of the movie.
 *         decade:
 *           type: integer
 *           description: Release decade.
 *         mood:
 *           type: string
 *           description: Mood of the movie.
 *         description:
 *           type: string
 *           description: Detailed description of the movie.
 *         posterUrl:
 *           type: string
 *           description: URL to the movie poster.
 *         rating:
 *           type: number
 *           format: float
 *           description: Movie rating (0-10).
 */

import express, { NextFunction, Request, Response } from 'express';
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
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
 *     responses:
 *       200:
 *         description: A movie object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
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
 * /movies/random:
 *   get:
 *     summary: Get a random movie from the database.
 *     responses:
 *       200:
 *         description: A random movie.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 * 404:
 *         description: No movies found.
 *       500:
 *         description: Internal Server Error.
 */
movieRouter.get('/random', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('Incoming request for random movie');

        const movie = await movieService.getRandomMovie();

        if (!movie) {
            return res.status(404).json({ message: 'No movies found in the database.' });
        }

        console.log('✅ Sending random movie:', movie);
        res.status(200).json(movie);
    } catch (error) {
        console.error('🔥 Error in /movies/random:', error);
        next(error);
    }
});

export { movieRouter };
