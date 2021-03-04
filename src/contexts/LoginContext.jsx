
import React, { createContext, useEffect, useState } from 'react';
import { LOGGED_IN_USER } from 'actions/constants';

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();

    const auth = {
        username: 'demo',
        password: 'demo'
    };
    let timeout = null;

    /*eslint-disable */
    useEffect(() => {
        const loggedIn = sessionStorage.getItem(LOGGED_IN_USER);
        if (loggedIn) {
            setUser(loggedIn);
        }
    }, [])
    /*eslint-enable */

    const doLogin = (username, password, callback, errorCallback) => {
        setLoading(true);
        
        timeout = setTimeout(() => {
            if (username === auth.username
                && password === auth.password) {
                setUser(username);
                sessionStorage.setItem(LOGGED_IN_USER, username);

                if (callback) callback();
            } else {
                errorCallback("Username/password combination is incorrect!");
            }
            setLoading(false);
            clearTimeout(timeout);
        }, 2000);
    }

    const doLogout = callback => {
        setLoading(true);
        const loggedIn = sessionStorage.getItem(LOGGED_IN_USER);

        timeout = setTimeout(() => {
            if (loggedIn && user) {
                sessionStorage.removeItem(LOGGED_IN_USER);
                setUser(null);
                if (callback) callback();
            }
            setLoading(false);
            clearTimeout(timeout);
        }, 2000);
    }

    return (
        <LoginContext.Provider
            value={{
                loading,
                user,
                doLogin,
                doLogout
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};