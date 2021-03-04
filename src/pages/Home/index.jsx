import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    const handleLogin = () => {
        history.push('/dashboard');
    }

    return (
        <div className="tw__home-page">
            <div className="container">
                <div className="row">
                    <div className="col-6 offset-3">
                        <h1 className="mb-4 text-center mt-4">Login</h1>
                        <div className="card p-3">
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="username" className="form-control" placeholder="Enter username" />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Password" />
                                </div>
                                <button type="submit" className="btn btn-primary d-block w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;