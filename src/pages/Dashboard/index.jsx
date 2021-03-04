import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import { LOGIN_URL } from 'actions/constants';
import { LoginContext } from 'contexts/LoginContext';
import { PostContext } from 'contexts/PostContext';
import { DATE_FORMAT } from 'actions/constants';

const Dashboard = () => {
    const history = useHistory();
    const { register, handleSubmit, errors, reset } = useForm();
    const { loading, user, doLogout } = useContext(LoginContext);
    const { postLoading, posts, post, setPost, doAddPost, doUpdatePost, doDeletePost } = useContext(PostContext);
    
    const modalSelector = '#postModal';

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

    const closeModalAndResetForm = () => {
        const $ = window.jQuery;
        if ($) {
            $(".btn-close").trigger('click');
            reset();
            setPost(null);
        }
    }

    const handleAdd = data => {
        const {
            title,
            content
        } = data;
        const now = new Date().getTime();

        doAddPost({
            title,
            content,
            createdAt: now,
            modifiedAt: now
        }, () => {
            alert(`Post has been added!`);
            closeModalAndResetForm();
        });
    }

    const handleUpdate = data => {
        const {
            title,
            content
        } = data;
        const now = new Date().getTime();

        doUpdatePost({
            id: post.id,
            title,
            content,
            createdAt: post.createdAt,
            modifiedAt: now
        }, () => {
            alert(`Post '${post.id}' has been updated!`);
            closeModalAndResetForm();
        }, error => {
            alert(error);
        });
    }

    const handleDelete = postId => {
        if (window.confirm(`Are you sure you want to delete post ${postId}?`)) {
            doDeletePost(postId, () => {
                alert(`Post '${postId}' has been deleted!`);
            });
        }
    }

    const onSubmit = data => {
        if (post) handleUpdate(data);
        else handleAdd(data)
    }

    return (
        <div className="tw__dashboard-page">
            {/* Dashboard header */}
            <header>
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container d-flex justify-content-between">
                        <Link to={LOGIN_URL} className="navbar-brand d-flex align-items-center">
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

            {/* Post table */}
            <div className="container">
                <h1 className="mb-4 text-center mt-4">Posts Management</h1>
                <div className="btns text-right mb-3">
                    <button
                        className="btn btn-success"
                        data-toggle="modal"
                        data-target={modalSelector}
                    >Add New Post</button>
                </div>
                <div className="card p-3">
                <table className="table caption-top">
                    <caption>{posts.length > 0 ? `Showing ${posts.length} posts` : 'No post found'}</caption>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Created At</th>
                            <th>Modified At</th>
                            <th width="15%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts && posts.length > 0 && posts.sort((a, b) => b.createdAt - a.createdAt).map(p => (
                            <tr key={p.id}>
                                <th>{p.id}</th>
                                <td>{p.title}</td>
                                <td>{p.content}</td>
                                <td>{moment(p.createdAt).format(DATE_FORMAT)}</td>
                                <td>{moment(p.modifiedAt).format(DATE_FORMAT)}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm mr-2"
                                        data-toggle="modal"
                                        data-target={modalSelector}
                                        onClick={() => setPost(p)}
                                    >Edit</button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(p.id)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>

            {/* Add Post Modal */}
            <div className="modal fade" id="postModal">
                <div className="modal-dialog modal-md">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{post ? `Update Post ${post.id}` : 'Add New Post'}</h5>
                                <button type="button" className="btn btn-default btn-sm btn-close" data-dismiss="modal" aria-label="Close">X</button>
                            </div>
                            <div className="modal-body">
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                            placeholder="Enter post title"
                                            ref={register({ required: true, minLength: 3 })}
                                            defaultValue={post ? post.title : ''}
                                        />
                                        {errors.title && <div className="invalid-feedback">Title is required and at least 3 characters</div>}
                                    </div>
                                    <div className="form-group">
                                        <label>Content</label>
                                        <textarea
                                            name="content"
                                            className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                                            placeholder="Enter post content"
                                            ref={register({ required: true, minLength: 3 })}
                                            defaultValue={post ? post.content : ''}
                                        ></textarea>
                                        {errors.content && <div className="invalid-feedback">Content is required and at least 3 characters</div>}
                                    </div>
                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button className={`btn btn-primary ${postLoading ? 'disabled' : ''}`}>{postLoading ? (post ? 'Updating post...' : 'Adding post...') : (post ? 'Update' : 'Add')}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;