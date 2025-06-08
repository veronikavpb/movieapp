import { getAuthHeaders } from './auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getWatchlist = async (userId: number) => {
    const response = await fetch(`${BASE_URL}/watchlist?userId=${userId}`, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch watchlist');
    return response.json();
};

const addToWatchlist = async (userId: number, movieId: number) => {
    const response = await fetch(`${BASE_URL}/watchlist`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ userId, movieId }),
    });
    if (!response.ok) throw new Error('Failed to add to watchlist');
};

const removeFromWatchlist = async (userId: number, movieId: number) => {
    const response = await fetch(`${BASE_URL}/watchlist/${userId}/${movieId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to remove from watchlist');
};

export default { getWatchlist, addToWatchlist, removeFromWatchlist };
