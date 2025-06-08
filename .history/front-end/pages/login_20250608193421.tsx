import React from 'react';
import UserLoginForm from '../components/UserLoginForm';
import Header from '../components/Header';

const LoginPage: React.FC = () => {
    return (
        <>
            <Header />
            <main className="container text-center mt-5">
                <div className="row justify-content-center mb-4">
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body">
                                <UserLoginForm />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h3 className="mb-3">Test Users</h3>
                        <table className="table table-bordered table-striped table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>admin</td>
                                    <td>admin123</td>
                                    <td>Admin</td>
                                </tr>
                                <tr>
                                    <td>user</td>
                                    <td>user123</td>
                                    <td>User</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
};

export default LoginPage;
