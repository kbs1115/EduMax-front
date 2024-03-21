import React from "react";
import styled from "styled-components";
import Typography from "../components/Typography";

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
`;


const BodyWrapper = styled.div`
  width: 100%;
	height: 480px;
  border: 2px solid #DFE5EE;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const LoginPage = () => {
    return (
      <Wrapper>
        <LogoWrapper>
          EduMax
        </LogoWrapper>
        <BodyWrapper>

        </BodyWrapper>
      </Wrapper>
    )
}

export default LoginPage;
