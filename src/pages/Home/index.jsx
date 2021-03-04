import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();
    const { register, handleSubmit } = useForm();

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
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter username"
                                        ref={register({ required: true })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        ref={register({ required: true })}
                                    />
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