import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "react-query";

import AuthContext from "../context/AuthProvider";
import { fetchSocialLogin } from "../apifetchers/fetcher";

const GoogleLoginPage = () => {
    const navigate = useNavigate();
    const { login, logout } = useContext(AuthContext);
    const googleLoginMutation = useMutation(fetchSocialLogin);
    const location = useLocation();

    const handleGoogleLogin = async (code) => {
        try {
          const data = await googleLoginMutation.mutateAsync(code);
          login(data.token.access, data.token.refresh, data.user.nickname, data.user.is_staff);
          window.location.href = "http://localhost:3000"
        } catch (error) {
          console.error('로그인 실패:', error);
          alert("로그인에 실패하였습니다.")
          logout();
          // 에러 처리
        }
      };

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get('code');
        if (code) {
            handleGoogleLogin(code);
        }
    }, [location, navigate]);
    
    return (<div>로그인 중...</div>);
}

export default GoogleLoginPage;
