import { useState } from 'react';
import { useRouter } from 'next/router';
import authService from '../services/authService';

const SignupPage: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role: user
    const [error, setError] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await authService.signup(username, password, role);
            router.push('/login'); // Redirect to login after signup
        } catch (error) {
            setError('Signup failed. Try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>🆕 Signup</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSignup}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="btn btn-primary">
                    Signup
                </button>
            </form>
        </div>
    );
};

export default SignupPage;
