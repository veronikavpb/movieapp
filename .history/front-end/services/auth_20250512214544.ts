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

export const getLoggedInUser = () => {
    const user = sessionStorage.getItem('loggedInUser');
    window.dispatchEvent(new Event('storage-update'));
    return user ? JSON.parse(user) : null;
};
