
import React, { createContext, useEffect, useState } from 'react';
import { LOGGED_IN_USER } from 'actions/constants';

export const LoginContext = createContext();

export const LoginContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();

    let timeout = null;

    useEffect(() => {
        const loggedIn = sessionStorage.getItem(LOGGED_IN_USER);
        if (loggedIn) {
            setUser(loggedIn);
        }
    }, [])

    const doLogin = (username, password) => {
        setLoading(true);
        
        timeout = setTimeout(() => {
            if (username === process.env.REACT_APP_USERNAME 
                && password === process.env.REACT_APP_PASSWORD) {
                setUser(username);
                sessionStorage.setItem(LOGGED_IN_USER, username);
            }
            setLoading(false);
            clearTimeout(timeout);
        })
    }

    const doLogout = () => {
        const loggedIn = sessionStorage.getItem(LOGGED_IN_USER);

        if (loggedIn && user) {
            sessionStorage.removeItem(LOGGED_IN_USER);
            setUser(null);
        }
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