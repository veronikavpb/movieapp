import { Movie } from '../../../domain/model/Movie';

describe('Movie Class', () => {
    let validMovie: Movie;

    beforeEach(() => {
        validMovie = new Movie({
            movieId: 1,
            title: 'Inception',
            genre: 'Sci-Fi',
            decade: 2010,
            mood: 'Mind-bending',
            description: 'A sci-fi thriller about dreams within dreams.',
            posterUrl: 'https://example.com/inception.jpg',
            rating: 9,
        });
    });

    it('should create a valid movie', () => {
        expect(validMovie.getMovieId()).toBe(1);
        expect(validMovie.getTitle()).toBe('Inception');
        expect(validMovie.getGenre()).toBe('Sci-Fi');
        expect(validMovie.getDecade()).toBe(2010);
        expect(validMovie.getMood()).toBe('Mind-bending');
        expect(validMovie.getDescription()).toBe('A sci-fi thriller about dreams within dreams.');
        expect(validMovie.getPosterUrl()).toBe('https://example.com/inception.jpg');
        expect(validMovie.getRating()).toBe(9);
    });

    it('should throw an error if the title is missing', () => {
        expect(() => {
            new Movie({
                movieId: 2,
                title: '',
                genre: 'Action',
                decade: 2020,
                mood: 'Exciting',
                description: 'A thrilling action movie.',
                posterUrl: 'https://example.com/action.jpg',
                rating: 8,
            });
        }).toThrow('Title cannot be empty');
    });

    it('should throw an error if the rating is out of bounds', () => {
        expect(() => {
            new Movie({
                movieId: 3,
                title: 'Bad Movie',
                genre: 'Comedy',
                decade: 2005,
                mood: 'Funny',
                description: "A comedy that isn't funny.",
                posterUrl: 'https://example.com/badmovie.jpg',
                rating: 11, // Invalid rating
            });
        }).toThrow('Rating must be between 0 and 10');
    });

    it('should throw an error if the decade is not a number', () => {
        expect(() => {
            new Movie({
                movieId: 4,
                title: 'Invalid Decade',
                genre: 'Drama',
                decade: 'Invalid' as unknown as number, // Force invalid input
                mood: 'Sad',
                description: 'A drama with an invalid decade.',
                posterUrl: 'https://example.com/drama.jpg',
                rating: 7,
            });
        }).toThrow('Decade must be a valid number');
    });

    it('should correctly compare two equal movies using equals()', () => {
        const anotherMovie = new Movie({
            movieId: 1,
            title: 'Inception',
            genre: 'Sci-Fi',
            decade: 2010,
            mood: 'Mind-bending',
            description: 'A sci-fi thriller about dreams within dreams.',
            posterUrl: 'https://example.com/inception.jpg',
            rating: 9,
        });

        expect(validMovie.equals(anotherMovie)).toBe(true);
    });

    it('should correctly identify two different movies using equals()', () => {
        const differentMovie = new Movie({
            movieId: 2,
            title: 'The Godfather',
            genre: 'Crime',
            decade: 1972,
            mood: 'Intense',
            description: 'A classic crime drama.',
            posterUrl: 'https://example.com/godfather.jpg',
            rating: 9.2,
        });

        expect(validMovie.equals(differentMovie)).toBe(false);
    });
});
