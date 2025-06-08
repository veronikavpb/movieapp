import { useState } from 'react';
import { useRouter } from 'next/router';

const SignupPage: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, role: 'user' }),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            alert('Account created! Please log in.');
            router.push('/login');
        } catch (error) {
            setError('Signup failed. Try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>📝 Sign Up</h2>
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
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignupPage;
