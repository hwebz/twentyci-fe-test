import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { LOGIN_URL } from 'actions/constants';
import { LoginContext } from 'contexts/LoginContext';

const Dashboard = () => {
    const history = useHistory();
    const { loading, user, doLogout } = useContext(LoginContext);

    /*eslint-disable */
    useEffect(() => {
        if (!user) history.push(LOGIN_URL);
    }, [])
    /*eslint-enable */

    const handleLogout = () => {
        doLogout(() => {
            history.push(LOGIN_URL);
        });
    }

    return (
        <div className="tw__dashboard-page">
            <header>
                <div class="navbar navbar-dark bg-dark shadow-sm">
                    <div class="container d-flex justify-content-between">
                        <Link href={LOGIN_URL} class="navbar-brand d-flex align-items-center">
                            <strong>TwentyCI FE Test</strong>
                        </Link>
                        <div className="pull-right">
                            <button
                                className={`btn btn-secondary ${loading ? 'disabled' : ''}`}
                                onClick={handleLogout}
                            >
                                {loading ? 'Signing Out...' : 'Sign Out'}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <h1 className="mb-4 text-center mt-4">Posts Management</h1>
                <div className="btns text-right mb-3">
                    <button className="btn btn-success">Add New Post</button>
                </div>
                <div className="card p-3">
                <table class="table caption-top">
                    <caption>Showing 10 posts</caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Slug</th>
                            <th>Content</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>Otto</td>
                            <td>asd</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;