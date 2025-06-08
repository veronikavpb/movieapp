import { Watchlist as PrismaWatchList } from '@prisma/client';

export class WatchList {
    readonly id?: number;
    readonly userId: number;
    readonly movieId: number;

    constructor(watchList: { id?: number; userId: number; movieId: number }) {
        this.validate(watchList);

        this.id = watchList.id;
        this.userId = watchList.userId;
        this.movieId = watchList.movieId;
    }

    private validate(watchList: { userId: number; movieId: number }) {
        if (!watchList.userId || watchList.userId <= 0) {
            throw new Error('User ID must be a positive integer');
        }
        if (!watchList.movieId || watchList.movieId <= 0) {
            throw new Error('Movie ID must be a positive integer');
        }
    }

    equals({ id, userId, movieId }: WatchList): boolean {
        return this.id === id && this.userId === userId && this.movieId === movieId;
    }

    /**
     * Converts a Prisma WatchList object into a Domain WatchList object.
     */
    static from({ id, userId, movieId }: PrismaWatchList): WatchList {
        return new WatchList({ id, userId, movieId });
    }
}
