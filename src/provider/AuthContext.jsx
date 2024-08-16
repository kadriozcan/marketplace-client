import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedAuthStatus = localStorage.getItem('isAuthenticated');
        return storedAuthStatus === 'true';
    });

    const [userId, setUserId] = useState(() => {
        return localStorage.getItem('userId');
    });

    const [roles, setRoles] = useState(() => {
        return JSON.parse(localStorage.getItem('roles')) || []
    })

    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated);
    }, [isAuthenticated]);

    useEffect(() => {
        localStorage.setItem('userId', userId);
    }, [userId]);

    useEffect(() => {
        localStorage.setItem('roles', JSON.stringify(roles));
    }, [roles]);


    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userId, setUserId, roles, setRoles }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
