import React, { createContext, useEffect, useState } from 'react';

import { POSTS } from 'actions/constants';
export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const [postLoading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState();

    let timeout = null;

    /*eslint-disable */
    useEffect(() => {
        const posts = localStorage.getItem(POSTS);
        if (posts) {
            const jsonPosts = JSON.parse(posts);
            setPosts(jsonPosts);
        }
    }, [])
    /*eslint-enable */

    const doAddPost = (post, callback) => {
        setLoading(true);

        timeout = setTimeout(() => {
            const newPosts = [...posts, {
                id: (new Date().getTime()).toString(),
                ...post
            }];
            setPosts(newPosts);
            localStorage.setItem(POSTS, JSON.stringify(newPosts));

            if (callback) callback();

            setLoading(false);
            clearTimeout(timeout);
        }, 1000);
    }

    const doUpdatePost = (post, callback, errorCallback) => {
        setLoading(true);
        
        timeout = setTimeout(() => {
            const selectedPost = posts.find(p => p.id === post.id);
            if (!selectedPost) errorCallback(`Can't find the post with id ${post.id}`);

            const newPosts = posts.map(p => {
                if (p.id === selectedPost.id) return post;
                return p;
            });

            setPosts(newPosts);
            localStorage.setItem(POSTS, JSON.stringify(newPosts));

            if (callback) callback(post);

            setLoading(false);
            clearTimeout(timeout);
        }, 1000);
    }

    const doDeletePost = (postId, callback) => {
        const filteredPosts = posts.filter(p => p.id !== postId);
        setPosts(filteredPosts);
        localStorage.setItem(POSTS, JSON.stringify(filteredPosts));
        
        if (callback) callback();
    }

    return (
        <PostContext.Provider
            value={{
                postLoading,
                posts,
                post,
                setPost,
                doAddPost,
                doUpdatePost,
                doDeletePost
            }}
        >
            {children}
        </PostContext.Provider>
    );
};