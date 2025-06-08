import { Movie as PrismaMovie } from '@prisma/client';

export class Movie {
    readonly id: number;
    readonly title: string;
    readonly genre: string;
    readonly decade: number;
    readonly mood: string;
    readonly description: string;
    readonly posterUrl: string;
    readonly rating: number;

    constructor(movie: {
        id: number;
        title: string;
        genre: string;
        decade: number;
        mood: string;
        description: string;
        posterUrl: string;
        rating: number;
    }) {
        this.validate(movie);

        this.id = movie.id;
        this.title = movie.title;
        this.genre = movie.genre;
        this.decade = movie.decade;
        this.mood = movie.mood;
        this.description = movie.description;
        this.posterUrl = movie.posterUrl;
        this.rating = movie.rating;
    }

    private validate(movie: { title: string; genre: string; decade: number; rating: number }) {
        if (!movie.title?.trim()) {
            throw new Error('Title is required');
        }
        if (!movie.genre?.trim()) {
            throw new Error('Genre is required');
        }
        if (!movie.decade || movie.decade < 1900 || movie.decade > new Date().getFullYear()) {
            throw new Error('Decade must be a valid year');
        }
        if (movie.rating < 0 || movie.rating > 10) {
            throw new Error('Rating must be between 0 and 10');
        }
    }

    equals({ id, title, genre, decade, mood, description, posterUrl, rating }: Movie): boolean {
        return (
            this.id === id &&
            this.title === title &&
            this.genre === genre &&
            this.decade === decade &&
            this.mood === mood &&
            this.description === description &&
            this.posterUrl === posterUrl &&
            this.rating === rating
        );
    }

    /**
     * Converts a Prisma Movie object into a Domain Movie object.
     */
    static from({
        id,
        title,
        genre,
        decade,
        mood,
        description,
        posterUrl,
        rating,
    }: PrismaMovie): Movie {
        return new Movie({
            id,
            title,
            genre,
            decade,
            mood,
            description,
            posterUrl,
            rating,
        });
    }
}
