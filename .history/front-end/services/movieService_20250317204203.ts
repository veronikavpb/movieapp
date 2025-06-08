const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log('API Base URL:', BASE_URL);

const getAllMovies = () => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => response.json());
};

const getMovieById = async (id: number) => {
    const response = await fetch(`${BASE_URL}/movies/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch movie');
    }
    return response.json();
};

const deleteMovie = async (id: number) => {
    const response = await fetch(`${BASE_URL}/movies/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete movie');
    }
};

const MovieService = {
    getAllMovies,
    getMovieById,
    deleteMovie,
};

export default MovieService;
