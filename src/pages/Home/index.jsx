import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { LoginContext } from 'contexts/LoginContext';
import { DASHBOARD_URL } from 'actions/constants';

const Home = () => {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm();
    const { doLogin, user } = useContext(LoginContext);

    /*eslint-disable */
    useEffect(() => {
        if (user) history.push(DASHBOARD_URL);
    }, [])
    /*eslint-enable */

    const handleLogin = data => {
        const {
            username,
            password
        } = data;

        doLogin(username, password, () => {
            history.push(DASHBOARD_URL);
        }, message => {
            alert(message);
        });
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
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        placeholder="Enter username"
                                        ref={register({ required: true, minLength: 3 })}
                                    />
                                    {errors.username && <div class="invalid-feedback">Username is required and at least 3 characters</div>}
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        placeholder="Password"
                                        ref={register({ required: true, minLength: 3, maxLength: 16 })}
                                    />
                                    {errors.password && <div class="invalid-feedback">Password is required and at least 3 characters, maximum is 16 characters</div>}
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