import React, { createContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [isStaff, setIsStaff] = useState(localStorage.getItem('is_staff') === 'true');

    const login = useCallback((access, refresh, nickname, is_staff) => {
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', nickname);
        localStorage. setItem('is_staff', String(is_staff)); // 명시적으로 문자열로 변환하여 저장
    
        setIsAuthenticated(true);
        setUsername(nickname);
        setIsStaff(is_staff);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
        localStorage.removeItem('is_staff'); // isStaff 정보를 localStorage에서 제거

        setIsAuthenticated(false);
        setUsername(null);
        setIsStaff(false); // isStaff 상태를 초기화
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, isStaff, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;