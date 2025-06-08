/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         username:
 *           type: string
 *           description: Username of the user.
 *         firstName:
 *           type: string
 *           description: First name of the user.
 *         lastName:
 *           type: string
 *           description: Last name of the user.
 *         email:
 *           type: string
 *           description: Email of the user.
 *         role:
 *           type: string
 *           enum:
 *             - admin
 *             - user
 */

import express, { Request, Response, NextFunction } from 'express';
import userService from '../service/userService';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error: unknown) {
        res.status(400).json({
            status: 'error',
            errorMessage: error instanceof Error ? error.message : 'Unknown error occurred',
        });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *           required: true
 *           description: The user ID.
 *     responses:
 *       200:
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));
        if (!user) {
            return res.status(404).json({ status: 'error', errorMessage: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error: unknown) {
        res.status(400).json({
            status: 'error',
            errorMessage: error instanceof Error ? error.message : 'Unknown error occurred',
        });
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *      summary: Login using username/password
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *         200:
 *            description: Authentication successful
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    token:
 *                      type: string
 *                    username:
 *                      type: string
 *                    role:
 *                      type: string
 */
userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const response = await userService.authenticate(username, password);
        res.status(200).json(response);
    } catch (error) {
        res.status(401).json({ error: 'Invalid username or password' });
    }
});

/**
 * @swagger
 * /users/signup:
 *   post:
 *      summary: Create a user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *                role:
 *                  type: string
 *      responses:
 *         201:
 *            description: User created successfully
 */
userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

export { userRouter };
