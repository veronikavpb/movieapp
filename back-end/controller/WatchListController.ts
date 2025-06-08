/**
 * @swagger
 * components:
 *   schemas:
 *     WatchList:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         userId:
 *           type: number
 *           description: ID of the user who owns this watchlist.
 *         movieId:
 *           type: number
 *           description: ID of the movie added to the watchlist.
 */

import express, { NextFunction, Request, Response } from 'express';
import watchlistService from '../service/watchListService';

const watchlistRouter = express.Router();

/**
 * @swagger
 * /watchlist:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all movies in the user's watchlist.
 *     responses:
 *       200:
 *         description: A list of movies in the watchlist.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
watchlistRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = Number(req.query.userId); // Replace this with JWT authentication
        const watchlist = await watchlistService.getWatchlist(userId);
        res.status(200).json(watchlist);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /watchlist:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add a movie to the user's watchlist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               movieId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Movie added to watchlist.
 */
watchlistRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, movieId } = req.body;
        const watchlistEntry = await watchlistService.addToWatchlist(userId, movieId);
        res.status(201).json(watchlistEntry);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /watchlist:
 *   delete:
 *     summary: Remove a movie from a user's watchlist.
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *       - in: query
 *         name: movieId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Movie removed from watchlist.
 */
watchlistRouter.delete('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await watchlistService.removeFromWatchList(
            Number(req.query.userId),
            Number(req.query.movieId)
        );
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

export { watchlistRouter };
