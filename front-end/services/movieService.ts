import { getAuthHeaders } from './auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log('API Base URL:', BASE_URL);

const getAllMovies = async () => {
    const response = await fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch movies');
    return response.json();
};

const getMovieById = async (id: number) => {
    const response = await fetch(`${BASE_URL}/movies/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch movie');
    return response.json();
};

const deleteMovie = async (id: number) => {
    const response = await fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete movie');
};

const createMovie = async (movieData: any) => {
    const response = await fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(movieData),
    });
    if (!response.ok) throw new Error('Failed to create movie');
    return response.json();
};

const updateMovie = async (id: number, movieData: any) => {
    const response = await fetch(`${BASE_URL}/movies/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(movieData),
    });
    if (!response.ok) throw new Error('Failed to update movie');
    return response.json();
};

const MovieService = {
    getAllMovies,
    getMovieById,
    deleteMovie,
    createMovie,
    updateMovie,
};

export default MovieService;
