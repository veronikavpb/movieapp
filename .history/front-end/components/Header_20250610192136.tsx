import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { logout } from '../services/auth';

const Header: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const updateUserFromSession = () => {
            const stored = sessionStorage.getItem('loggedInUser');
            if (stored) {
                const user = JSON.parse(stored);
                setUsername(user?.username || null);
                setRole(user?.role || null);
            } else {
                setUsername(null);
                setRole(null);
            }
        };

        updateUserFromSession(); // Initial load

        window.addEventListener('storage-update', updateUserFromSession);
        return () => window.removeEventListener('storage-update', updateUserFromSession);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <nav className="navbar navbar-light bg-light px-3">
            <Link className="navbar-brand" href="/">
                🎥 Movie App
            </Link>
            <div>
                {role === 'ADMIN' && (
                    <Link className="btn btn-outline-primary mx-2" href="/movies">
                        Manage Movies
                    </Link>
                )}
                {role === 'USER' && (
                    <Link className="btn btn-outline-primary mx-2" href="/watchlist">
                        Watchlist
                    </Link>
                )}
                {username && (
                    <span className="mx-2">
                        Logged in as: <strong>{username}</strong> ({role?.toLowerCase()})
                    </span>
                )}
                {(role === 'USER' || role === 'ADMIN') && (
                    <button className="btn btn-danger" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Header;
