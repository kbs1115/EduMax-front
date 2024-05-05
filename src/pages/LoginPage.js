import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "react-query";

import AuthContext from "../context/AuthProvider";
import LoginInput from "../components/LoginInput";
import Typography from "../components/Typography";
import GoogleIcon from "../assets/googleicon.png"
import Kakaoicon from "../assets/kakaoicon.png"
import { fetchLogin } from "../apifetchers/fetcher";


const SocialLoginButton = ({ onClick, imagePath, margin, children }) => (
  <SocialLoginStyledButton onClick={onClick} margin={margin}>
    <SocialImage src={imagePath} alt="" />
    {children}
  </SocialLoginStyledButton>
);


const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation(fetchLogin);
  const { login, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await loginMutation.mutateAsync({ login_id: id, password });
      console.log('로그인 성공:', data);

      // 로그인 성공 후 필요한 작업 수행, 예를 들어 토큰 저장
      localStorage.setItem('access_token', data.token.access);
      localStorage.setItem('refresh_token', data.token.refresh);
      login();

      navigate("/");
    } catch (error) {
      console.error('로그인 실패:', error);
      logout();
      // 에러 처리
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
            <Link style={{ textDecoration: 'none' }}>
              <Typography
                color="navy" 
                size="body_content_small">
                  회원가입
              </Typography>
            </Link>
          </SignupTextWrapper>
          <InnerTextWrapper>
            <Link style={{ textDecoration: 'none' }}>
              <Typography
                color="navy" 
                size="body_content_small">
                  아이디 찾기
              </Typography>
            </Link>
            <Link style={{ textDecoration: 'none' }}>
              <Typography
                color="navy" 
                size="body_content_small">
                  비밀번호 찾기
              </Typography>
            </Link>
          </InnerTextWrapper>
        </LoginTextWrapper>
        <SocialLoginButton
          margin="0 0 10px 0"
          imagePath={GoogleIcon}>
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
  color: #4A5BAB;
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
  background-color: #4A5BAB;
  border: none; // 버튼의 기본 테두리를 제거합니다.
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
  width: 30px; // 너비 30px의 정사각형 이미지
  height: 30px; // 높이 30px
`;

// 버튼 스타일을 위한 styled-component 정의
const SocialLoginStyledButton = styled.button`
  width: 310px; // 가로 310px
  height: 55px; // 세로 55px
  border-radius: 20px; // 모서리 둥글기 20px
  border: 1px solid #A8AAAE; // 기본 테두리 스타일
  padding: 12px 10px 12px 25px; // padding 설정
  display: flex; // flexbox 레이아웃 사용
  align-items: center; // 가로축(center)을 기준으로 아이템 정렬
  gap: 15px; // 이미지와 텍스트 사이 간격 15px
  background-color: white; // 배경색
  margin: ${({ margin }) => margin || '0'}; // margin prop을 적용

  // 클릭(active) 상태에서의 스타일
  &:active {
    border: 2px solid #4A5BAB; // 클릭 시 테두리 스타일
  }

  &:hover {
    border: 2px solid #4A5BAB; // 클릭 시 테두리 스타일
    cursor: pointer;
  }
`;