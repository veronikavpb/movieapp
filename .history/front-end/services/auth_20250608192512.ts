export const getAuthHeaders = () => {
    const token = sessionStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
    };
};

export const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loggedInUser');
    window.dispatchEvent(new Event('storage-update'));
};

export const login = (token: string, user: any) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    window.dispatchEvent(new Event('storage-update'));
};

export const getLoggedInUser = () => {
    try {
        const user = sessionStorage.getItem('loggedInUser');
        return user ? JSON.parse(user) : null;
    } catch (e) {
        console.error('Failed to parse session user:', e);
        return null;
    }
};
