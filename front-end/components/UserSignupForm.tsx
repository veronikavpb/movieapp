import { useState } from 'react';
import { useRouter } from 'next/router';
import UserService from 'services/userService';
import { StatusMessage } from '@types';

const SignupForm: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMessages([]);

        try {
            await UserService.signup(username, password, 'user');
            setStatusMessages([{ message: 'Account created! Redirecting...', type: 'success' }]);
            setTimeout(() => router.push('/login'), 1500);
        } catch (error: any) {
            setStatusMessages([{ message: error.message || 'Signup failed.', type: 'error' }]);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <h2>Sign Up</h2>

            {statusMessages.map((msg, index) => (
                <div key={index} style={{ color: msg.type === 'error' ? 'red' : 'green' }}>
                    {msg.message}
                </div>
            ))}

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
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;
