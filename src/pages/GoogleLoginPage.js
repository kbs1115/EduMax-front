import React, { useEffect, useContext } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthProvider";

const GoogleLoginPage = () => {
    const navigate = useNavigate();
    const { login, logout } = useContext(AuthContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            const access_token = Cookies.get("accessToken");
            const refresh_token = Cookies.get("refreshToken");
            const user_data = Cookies.get("user");

            if (access_token && refresh_token && user_data) {
                try {
                    const parsedUserData = JSON.parse(user_data);
                    login(access_token, refresh_token, parsedUserData.nickname, parsedUserData.is_staff);
                    navigate("/");
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    alert("로그인 처리 중 오류가 발생했습니다.");
                    logout();
                }
            } else {
                console.error('쿠키에서 필요한 정보를 가져오지 못했습니다.');
                alert("쿠키에서 필요한 정보를 가져오지 못했습니다.");
                logout();
            }
        }, 3000);

        // Cleanup function to clear the timer if the component unmounts before the timer finishes
        return () => clearTimeout(timer);
    }, [login, logout, navigate]);
    
    return (<div>로그인 중...</div>);
}

export default GoogleLoginPage;
