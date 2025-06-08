const fetch = require('node-fetch');
const fs = require('fs');

const API_KEY = 'YOUR_TMDB_API_KEY_HERE'; // replace me
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=`;

const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Fantasy', 'Animation'];
const moods = [
    'Exciting',
    'Relaxing',
    'Thought-Provoking',
    'Scary',
    'Heartwarming',
    'Funny',
    'Dark',
];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

(async () => {
    let allMovies = [];

    for (let i = 1; i <= 3; i++) {
        // 3 pages × ~20 movies = ~60
        const res = await fetch(`${URL}${i}`);
        const data = await res.json();
        allMovies.push(...data.results);
    }

    const seedLines = allMovies.slice(0, 50).map((movie) => {
        const title = movie.title?.replace(/"/g, "'") ?? 'Untitled';
        const description = (movie.overview || 'No description').replace(/"/g, "'");
        const decade = parseInt(movie.release_date?.slice(0, 4)) || 2000;
        const rating = Math.min(10, Math.max(0, movie.vote_average || 6));
        const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '';

        return `
    await prisma.movie.create({
        data: {
            title: "${title}",
            genre: "${getRandom(genres)}",
            decade: ${decade},
            mood: "${getRandom(moods)}",
            description: "${description}",
            posterUrl: "${posterUrl}",
            rating: ${rating.toFixed(1)}
        }
    });`;
    });

    fs.writeFileSync('./seededMovies.ts', seedLines.join('\n'), 'utf8');
    console.log('✅ Seeded movie data saved to seededMovies.ts');
})();
