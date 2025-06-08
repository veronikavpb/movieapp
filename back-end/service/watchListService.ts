import database from '../util/database';
import { WatchList } from '../domain/model/WatchList';

const getWatchlist = async (userId: number): Promise<WatchList[]> => {
    try {
        const watchListPrisma = await database.watchlist.findMany({
            where: { userId },
            include: { movie: true },
        });
        return watchListPrisma.map((entry) => WatchList.from(entry));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addToWatchlist = async (userId: number, movieId: number): Promise<WatchList> => {
    try {
        const existingEntry = await database.watchlist.findFirst({
            where: { userId, movieId },
        });

        if (existingEntry) {
            throw new Error('Movie is already in the watchlist for this user.');
        }

        const watchListPrisma = await database.watchlist.create({
            data: { userId, movieId },
            include: { movie: true },
        });
        return WatchList.from(watchListPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const removeFromWatchList = async (userId: number, movieId: number): Promise<void> => {
    try {
        await database.watchlist.deleteMany({
            where: { userId, movieId },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getWatchlist,
    addToWatchlist,
    removeFromWatchList,
};
