export type Movie = {
    id: number;
    title: string;
    genre: string;
    decade: number;
    mood: string;
    description: string;
    posterUrl: string;
    rating: number;
};

export type User = {
    id: number;
    username: string;
    role: 'admin' | 'user';
};

export type StatusMessage = {
    message: string;
    type: 'success' | 'error';
};
