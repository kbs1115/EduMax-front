import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginInput from "../components/LoginInput";
import Typography from "../components/Typography";
import PostListButton from "../components/buttons/PostListButton";

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

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Wrapper>
      <LogoWrapper>
        EduMax
      </LogoWrapper>
      <BodyWrapper>
        <IdInput placeholder="아이디" input={id} setInput={setId}/>
        <PwInput 
          placeholder="비밀번호" 
          isPassword={true}
          input={password}
          setInput={setPassword}
        />
        <LoginButton>로그인</LoginButton>
      </BodyWrapper>
    </Wrapper>
  )
}

export default LoginPage;