import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "react-query";
import AuthContext from "../context/AuthProvider";
import LoginInput from "../components/LoginInput";
import Typography from "../components/Typography";
import GoogleIcon from "../assets/googleicon.png"
import Kakaoicon from "../assets/kakaoicon.png"
import { fetchLogin, fetchSocialLogin, fetchSocialLoginRedirect } from "../apifetchers/fetcher";
import FindModal from "../components/modals/FindModal"; // Import FindModal


const SocialLoginButton = ({ onClick, imagePath, margin, children }) => (
  <SocialLoginStyledButton onClick={onClick} margin={margin}>
    <SocialImage src={imagePath} alt="" />
    {children}
  </SocialLoginStyledButton>
);

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailModal, setIsEmailModal] = useState(false); // Modal state for ID
  const [isPwModal, setIsPwModal] = useState(false); // Modal state for Password

  const loginMutation = useMutation(fetchLogin);
  const googleLoginMutation = useMutation(fetchSocialLoginRedirect);
  const { login, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginMutation.mutateAsync({ login_id: id, password });
      login(data.token.access, data.token.refresh, data.user.nickname, data.user.is_staff);
      navigate("/");
    } catch (error) {
      console.error('로그인 실패:', error);
      alert("로그인에 실패하였습니다.")
      logout();
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const data = await googleLoginMutation.mutateAsync();
    } catch (error) {
      console.error('로그인 실패:', error);
      alert("로그인에 실패하였습니다.")
      logout();
    }
  };

  return (
    <Wrapper>
      <Link to="/" style={{ textDecoration: "none" }}>
        <LogoWrapper>
          EduMax
        </LogoWrapper>
      </Link>
      <BodyWrapper>
        <IdInput placeholder="아이디" input={id} setInput={setId}/>
        <PwInput 
          placeholder="비밀번호" 
          isPassword={true}
          input={password}
          setInput={setPassword}
        />
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
        <LoginTextWrapper>
          <SignupTextWrapper>
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <Typography
                color="navy" 
                size="body_content_small">
                  회원가입
              </Typography>
            </Link>
          </SignupTextWrapper>
          <InnerTextWrapper>
            <Typography
              color="navy" 
              size="body_content_small"
              onClick={() => setIsEmailModal(true)} // Open modal for finding ID
              style={{ cursor: 'pointer' }}>
                아이디 찾기
            </Typography>
            <Typography
              color="navy" 
              size="body_content_small"
              onClick={() => setIsPwModal(true)} // Open modal for finding Password
              style={{ cursor: 'pointer' }}>
                비밀번호 찾기
            </Typography>
          </InnerTextWrapper>
        </LoginTextWrapper>
        <SocialLoginButton
          margin="0 0 10px 0"
          imagePath={GoogleIcon}
          onClick={handleGoogleLogin}>
          <Typography
            size="body_content_medium">
              Google 계정으로 로그인
          </Typography>
        </SocialLoginButton>
        <SocialLoginButton
          imagePath={Kakaoicon}>
          <Typography
            size="body_content_medium">
              Kakao 계정으로 로그인
          </Typography>
        </SocialLoginButton>
      </BodyWrapper>
      <FindModal isOpen={isEmailModal} isPassword={false} onClose={() => setIsEmailModal(false)} /> {/* Render FindModal for ID */}
      <FindModal isOpen={isPwModal} isPassword={true} onClose={() => setIsPwModal(false)} /> {/* Render FindModal for Password */}
    </Wrapper>
  )
}

export default LoginPage;

const Wrapper = styled.div`
  display: flex; // 추가
  justify-content: center; // 추가
  align-items: center; // 추가
  flex-direction: column; // 추가, 자식 요소를 세로 방향으로 정렬
  height: 620px; // 추가, 전체 화면 높이 사용
  width: 365px;
  margin: 100px auto; // 가로 방향에서 중앙 정렬을 위해 추가
`;

const LogoWrapper = styled.div`
  display: flex; // 추가
  justify-content: center; // 추가
  align-items: center; // 추가
  width: 210px;
  height: 100px;
  color: #4C6BFF;
  font-family: "Noto Sans Symbols";
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center; // 추가
  margin-bottom: 30px; // 추가, BodyWrapper와의 간격 조정
  letter-spacing: 2.5px;
`;

const BodyWrapper = styled.div`
  box-sizing: border-box;
  padding-top: 40px;
  width: 100%;
  height: 480px;
  border: 2px solid #DFE5EE;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IdInput = styled(LoginInput)`
  margin-bottom: 10px;
`;

const PwInput = styled(LoginInput)`
  margin-bottom: 30px;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 310px;
  border-radius: 20px;
  background-color: #4C6BFF;
  border: none;
  color: #FFF;
  font-family: "Noto Sans Symbols";
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-align: center;
  cursor: pointer;
`;

const LoginTextWrapper = styled.div`
  display: flex;
  width: 310px;
  height: 25px;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 40px;
`;

const SignupTextWrapper = styled.div`
  display: flex;
  width: 70px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const InnerTextWrapper = styled.div`
  display: flex;
  width: 145px;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  gap: 15px;
`;

const SocialImage = styled.img`
  width: 30px;
  height: 30px;
`;

const SocialLoginStyledButton = styled.button`
  width: 310px;
  height: 55px;
  border-radius: 20px;
  border: 1px solid #B6C0D5;
  padding: 12px 10px 12px 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: white;
  margin: ${({ margin }) => margin || '0'};

  &:active {
    border: 2px solid #4C6BFF;
  }

  &:hover {
    border: 2px solid #4C6BFF;
    cursor: pointer;
  }
`;
