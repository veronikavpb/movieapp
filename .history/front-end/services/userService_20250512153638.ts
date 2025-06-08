import { getAuthHeaders } from './auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const login = async (username: string, password: string) => {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const error = await response.text(); // show backend error
        console.error('Login failed:', error);
        throw new Error('Login failed');
    }

    const user = await response.json();
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    sessionStorage.setItem('token', user.token);
    return user;
};

const signup = async (username: string, password: string, role: string) => {
    const response = await fetch(`${BASE_URL}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
    });

    if (!response.ok) {
        throw new Error('Signup failed. Try again.');
    }

    return await response.json();
};

const logout = () => {
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('token');
};

const getCurrentUser = () => {
    const user = sessionStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
};

const getAllUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
};

export default { login, signup, logout, getCurrentUser, getAllUsers };
