import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import { movieRouter } from './controller/movieController';
import { userRouter } from './controller/userController';
import { watchlistRouter } from './controller/WatchListController';
import { setupSwagger } from './swagger';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';

dotenv.config();
console.log('✅ JWT_SECRET loaded:', process.env.JWT_SECRET);
console.log('✅ JWT_EXPIRES_IN:', process.env.JWT_EXPIRES_IN);
console.log('✅ DB:', process.env.DATABASE_URL);
console.log('✅ All ENV:', process.env);

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            // Allow connections to own server and the external API
            connectSrc: ["'self'", 'https://api.example.com'],
        },
    })
);
app.use(cors());
app.use(bodyParser.json());

app.use(
    expressjwt({
        secret: process.env.JWT_SECRET || 'secret',
        algorithms: ['HS256'],
    }).unless({
        path: ['/api-docs', /^\/api-docs\/.*/, '/users/login', '/users/signup', '/status'],
    })
);

app.use('/movies', movieRouter);
app.use('/users', userRouter);
app.use('/watchlist', watchlistRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

setupSwagger(app);
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie API',
            version: '1.0.0',
            description: 'API for managing movies',
        },
    },
    apis: ['./controllers/*.ts'], // Path to your controllers
};

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
