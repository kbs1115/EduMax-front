import React, { createContext, useState, useCallback } from 'react';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true' // 초기 상태를 localStorage에서 가져오기
    );
    const [username, setUser] = useState(localStorage.getItem('username'));

    const login = useCallback((access, refresh, nickname) => {
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', nickname);
        setIsAuthenticated(true);
        setUser({ nickname });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;