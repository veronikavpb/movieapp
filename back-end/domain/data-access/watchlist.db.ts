import database from '../../util/database';
import { WatchList } from '../model/WatchList';

const getWatchListByUserId = async (userId: number): Promise<WatchList[]> => {
    try {
        const watchListsPrisma = await database.watchlist.findMany({
            where: { userId },
        });
        return watchListsPrisma.map((watchListPrisma) => WatchList.from(watchListPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addToWatchList = async (userId: number, movieId: number): Promise<WatchList> => {
    try {
        const existingEntry = await database.watchlist.findFirst({
            where: { userId, movieId },
        });

        if (existingEntry) {
            throw new Error('Movie is already in the watchlist for this user.');
        }

        const watchListPrisma = await database.watchlist.create({
            data: { userId, movieId },
        });

        return WatchList.from(watchListPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const removeFromWatchList = async (userId: number, movieId: number): Promise<void> => {
    try {
        const existingEntry = await database.watchlist.findFirst({
            where: { userId, movieId },
        });

        if (!existingEntry) {
            throw new Error('Movie not found in the watchlist for this user.');
        }

        await database.watchlist.delete({
            where: { id: existingEntry.id },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getWatchListByUserId, addToWatchList, removeFromWatchList };
