import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Typography from "../components/Typography";
import SignupInput from "../components/SignupInput";


const SignupButton = ({ 
  isDisabled, 
  onClick, 
  width = "128px", 
  text = "중복확인",
  isBigButton = false }) => {
  return (
    <CertifyButton
      disabled={isDisabled} // 버튼의 disabled 속성 설정
      width={width}
      isDisabled={isDisabled} // styled-components에 isDisabled prop 전달
      onClick={isDisabled ? null : onClick} // isDisabled가 true일 경우, onClick 이벤트 비활성화
    >
      <Typography 
        color={isDisabled ? "#B3BCC3" : "white"}
        size={isBigButton ? "h3_medium" : "body_sub_title"}>
        {text}
      </Typography>
    </CertifyButton>
  );
};


const Signup = () => {
  const moveTo = useNavigate();

  const [ID, setID] = useState("");
  const [isIDValid, setIsIDValid] = useState(false);
  const [pw, setPw] = useState("");
  const [isPwValid, setIsPwValid] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [nickname, setNickname] = useState("");
  const [certNum, setCertNum] = useState("");

  const [isDup, setIsDup] = useState(true);
  const [isCertifyed, setIsCertified] = useState(false);

  const [timer, setTimer] = useState(false); // 타이머를 위한 상태
  const [timeLeft, setTimeLeft] = useState(300); // 초기 시간 5분 설정

  useEffect(() => {
    // ID 유효성 검사를 위한 정규 표현식
    const regex = /^[a-zA-Z0-9_]{4,20}$/;
    setIsIDValid(regex.test(ID));
  }, [ID]);

  useEffect(() => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
    setIsPwValid(regex.test(pw));
  }, [pw]);

  useEffect(() => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
    setIsEmailValid(regex.test(email));
  }, [email]);

  useEffect(() => {
    // 타이머가 동작 중일 때만 작동
    if (timeLeft > 0 && timer) {
      const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      clearInterval(timer);
      setTimer(null);
    }
  }, [timeLeft, timer]);

  const handleStartTimer = () => {
    setTimeLeft(300); // 5분으로 재설정
    setTimer(true); // 타이머 시작
  };

  // 타이머 포맷 변경 함수
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (<>
    <HeaderWrapper>
      <HeaderItems>
        <LogoWrapper>
          <Typography
            size="logo"
            color="navy"
            font="symbol">
            EduMax
          </Typography>
          <Typography
            size="signup_small_logo"
            color="black_gray"
            font="symbol">
            회원가입
          </Typography>
        </LogoWrapper>
        <HomeWrapper onClick={() => moveTo('/')}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" height="17" 
          viewBox="0 0 18 17" fill="none">
          <path d="M9 0.625L0 7.375H2.25V16.375H6.75V11.875H11.25V16.375H15.75V7.3075L18 7.375L9 0.625Z" 
            fill="#4A5BAB"/>
        </svg>
        <Typography
          size="body_sub_title">
          에듀맥스 홈
        </Typography>
        </HomeWrapper>
      </HeaderItems>
    </HeaderWrapper>
    <ContentWrapper>
      <Typography
        size="h1"
        color="black_gray">
        회원정보를 입력해주세요
      </Typography>
      <div style={{ marginTop: "60px"}}>
        <InputWrapper>
          <Typography
              size="h3_bold"
              color="black_gray">
            아이디
          </Typography>
          <InputWithButtonWrapper>
            <SignupInput 
              placeholder="4~20자리 / 영문, 숫자, '_' 사용가능" 
              input={ID}
              setInput={setID}
              width="310px"/>
            <SignupButton  isDisabled={isIDValid === false}/>
          </InputWithButtonWrapper>
        </InputWrapper>
      </div>
      <InputWrapper>
        <Typography
            size="h3_bold"
            color="black_gray">
          비밀번호
        </Typography>
        <SignupInput 
          placeholder="8~20자리 / 영문, 숫자, 특수문자 반드시 하나 이상 포함" 
          input={pw}
          setInput={setPw}
          isPassword={true}/>
      </InputWrapper>
      <InputWrapper>
        <Typography
            size="h3_bold"
            color="black_gray">
          닉네임
        </Typography>
        <InputWithButtonWrapper>
          <SignupInput 
            placeholder="닉네임을 입력하세요" 
            input={nickname}
            setInput={setNickname}
            width="310px"/>
          <SignupButton  isDisabled={nickname.trim().length === 0}/>
        </InputWithButtonWrapper>
      </InputWrapper>
      <InputWrapper>
        <Typography
            size="h3_bold"
            color="black_gray">
          이메일
        </Typography>
        <InputWithButtonWrapper>
          <SignupInput 
            placeholder="이메일을 입력하세요" 
            input={email}
            setInput={setEmail}
            width="310px"/>
          <SignupButton  
            isDisabled={!isEmailValid} 
            text="인증요청"
            onClick={handleStartTimer}/>
        </InputWithButtonWrapper>
      </InputWrapper>
      <div style={{ marginBottom: "30px"}}>
        <InputWrapper>
          <Typography
              size="h3_bold"
              color="black_gray">
              인증번호
          </Typography>
          <SignupInput 
            placeholder="인증번호를 입력하세요" 
            input={certNum}
            setInput={setCertNum}/>
          <TimerWrapper>
          {timer && <Typography color="timer_red" size="body_sub_title">
              {formatTime(timeLeft)}
            </Typography>}
          </TimerWrapper>
        </InputWrapper>
      </div>
      <SignupButton 
        isDisabled={!(isIDValid && isPwValid)} 
        isBigButton={true} 
        text="회원가입 완료" 
        width="100%"
        onClick={() => moveTo('/')}/>
    </ContentWrapper>
  </>);
}

export default Signup;


const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 92px;
  border-bottom: 2px solid #DFE5EE;
`;

const HeaderItems = styled.div`
  display: flex;
  width: 1170px;
  justify-content: space-between;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 5px;
`;

const HomeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  padding-top: 10px;
  display: flex;
  width: 450px;
  height: 1000px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 100px auto;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  gap: 10px;
`;

const InputWithButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CertifyButton = styled.button`
  display: flex;
  width: ${props => props.width};
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #E0E4EB;
  background-color: ${props => props.isDisabled ? "#F4F6FA" : "#5E59FF"}; // isDisabled 값에 따라 배경색 변경
  color: ${props => props.isDisabled ? "#A8AAAE" : "white"}; // isDisabled 값에 따라 글자색 변경

  &:disabled {
    cursor: not-allowed; // 버튼이 disabled 상태일 때의 커서 스타일
  }
`;

const TimerWrapper = styled.div`
  position: relative;
  height: 40px;
  bottom: 52px;
  left: 400px;
`;