import SignupForm from 'components/UserSignupForm';
import Header from '../components/Header';

const SignupPage: React.FC = () => (
    <>
        <Header />
        <main className="container mt-5">
            <SignupForm />
        </main>
    </>
);

export default SignupPage;
