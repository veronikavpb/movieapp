type Role = 'admin' | 'user';

type UserDTO = {
    id?: number;
    username: string;
    password: string;
    /* firstName: string;
    lastName: string;
    email: string; */
    role: Role;
};

type MovieDTO = {
    id?: number;
    title: string;
    genre: string;
    decade: number;
    mood: string;
    description: string;
    posterUrl: string;
    rating: number;
};

type WatchListDTO = {
    id?: number;
    user: UserDTO;
    movies: MovieDTO[];
};

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: Role;
};

export { Role, UserDTO, MovieDTO, WatchListDTO, AuthenticationResponse };
