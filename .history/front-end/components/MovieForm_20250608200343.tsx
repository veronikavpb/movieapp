import React, { useState, useEffect } from 'react';
import MovieService from '../services/movieService';
import { Movie } from '../types';

type Props = {
    movie?: Movie | null;
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    setEditingMovie?: React.Dispatch<React.SetStateAction<Movie | null>>;
};

const MovieForm: React.FC<Props> = ({ movie, setMovies, setEditingMovie }) => {
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        decade: '',
        rating: '',
        posterUrl: '',
        mood: '',
        description: '',
    });

    useEffect(() => {
        if (movie) {
            setFormData({
                title: movie.title,
                genre: movie.genre,
                decade: movie.decade.toString(),
                rating: movie.rating.toString(),
                posterUrl: movie.posterUrl,
                mood: movie.mood.toString(),
                description: movie.description.toString(),
            });
        }
    }, [movie]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            decade: Number(formData.decade),
            rating: Number(formData.rating),
        };

        try {
            if (movie) {
                const updated = await MovieService.updateMovie(movie.id, payload);
                setMovies((prev) => prev.map((m) => (m.id === movie.id ? updated : m)));
                if (setEditingMovie) setEditingMovie(null); // clear form after update
            } else {
                const created = await MovieService.createMovie(payload);
                setMovies((prev) => [...prev, created]);
                setFormData({ title: '', genre: '', decade: '', rating: '', posterUrl: '' }); // reset form
            }
        } catch (error) {
            console.error('❌ Error submitting movie:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Title"
            />
            <input
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
                placeholder="Genre"
            />
            <input
                type="number"
                name="decade"
                value={formData.decade}
                onChange={handleChange}
                required
                placeholder="Decade"
            />
            <input
                type="number"
                name="rating"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                required
                placeholder="Rating"
            />
            <input
                name="posterUrl"
                value={formData.posterUrl}
                onChange={handleChange}
                required
                placeholder="Poster URL"
            />
            <button type="submit" className="btn btn-success">
                {movie ? 'Update' : 'Add'} Movie
            </button>
        </form>
    );
};

export default MovieForm;
