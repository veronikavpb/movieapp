import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { logout } from '../services/auth';

const Header: React.FC = () => {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem('loggedInUser');
        if (stored) {
            const user = JSON.parse(stored);
            setRole(user?.role || null);
        }
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
                {role === 'admin' && (
                    <Link className="btn btn-outline-primary mx-2" href="/movies">
                        Manage Movies
                    </Link>
                )}
                {role === 'user' && (
                    <Link className="btn btn-outline-primary mx-2" href="/watchlist">
                        Watchlist
                    </Link>
                )}
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Header;
