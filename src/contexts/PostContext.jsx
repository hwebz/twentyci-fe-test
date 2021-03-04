
import { POSTS } from 'actions/constants';
import React, { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState();

    let timeout = null;

    const doAddPost = (post, callback) => {
        setLoading(true);

        timeout = setTimeout(() => {
            setPosts(oldPosts => [...oldPosts, {
                id: (new Date().getTime()).toString(),
                ...post
            }]);
            localStorage.setItem(POSTS, JSON.stringify(posts));

            setLoading(false);
            clearTimeout(timeout);
        }, 2000);
    }

    const doUpdatePost = (postId, callback, errorCallback) => {
        setLoading(true);
        
        timeout = setTimeout(() => {
            const selectedPost = posts.find(p => p.Id === postId);
            if (selectedPost) errorCallback(`Can't find the post with id ${postId}`);
            
            const newPosts = posts.map(p => {
                if (p.id === selectedPost.id) return selectedPost;
                return p;
            });
            setPosts(newPosts);
            localStorage.setItem(POSTS, JSON.stringify(newPosts));

            setLoading(false);
            clearTimeout(timeout);
        }, 2000);
    }

    const doDeletePost = (postId, callback) => {
        setLoading(true);
        
        timeout = setTimeout(() => {
            const filteredPosts = posts.filter(p => p.id !== postId);
            setPosts(filteredPosts);
            localStorage.setItem(POSTS, JSON.stringify(filteredPosts));

            setLoading(false);
            clearTimeout(timeout);
        }, 2000);
    }

    return (
        <PostContext.Provider
            value={{
                loading,
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