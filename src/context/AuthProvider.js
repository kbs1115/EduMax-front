import React, { createContext, useState, useCallback } from 'react';

import { api } from '../apifetchers/fetcher';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    );
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [isStaff, setIsStaff] = useState(localStorage.getItem('is_staff') === 'true');
    const [refreshTime, setRefreshTime] = useState(0);

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

    api.interceptors.response.use(
        response => response, // 정상 응답은 그대로 반환
        async error => {
          const originalRequest = error.config;
          // 토큰 만료 에러 코드 확인 (예: 401)
          if (error.response.status === 401) {
            console.log('401 Unauthorized detected');
            const refreshToken = localStorage.getItem('refresh_token'); // 리프레시 토큰 가져오기
            if (refreshToken) {
              try {
                console.log('Refresh token found:', refreshToken);
                const response = await axios.post('http://127.0.0.1:8000/auth/token/refresh/', {
                  refresh: refreshToken
                });
                const { access } = response.data;
                localStorage.setItem('access_token', access); // 새 액세스 토큰 저장
                originalRequest.headers['Authorization'] = `Bearer ${access}`; // 새 토큰으로 요청 헤더 설정
                
                return api(originalRequest); // 원래 요청 재시도
              } catch (refreshError) {
                logout();
                window.location.reload();
                alert("로그인이 만료되었습니다. 다시 로그인해 주세요.")
                return Promise.reject(refreshError);
              }
            } else {
              console.log('No refresh token found');
            }
          }
          return Promise.reject(error);
        }
      );

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, isStaff, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;