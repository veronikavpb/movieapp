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
};

export const getLoggedInUser = () => {
    const user = sessionStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
};
