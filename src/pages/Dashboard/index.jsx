import React from 'react';

const Dashboard = () => {
    return (
        <div className="tw__dashboard-page">
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