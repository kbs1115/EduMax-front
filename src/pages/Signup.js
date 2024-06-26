import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { CheckDuplicate, SendEmail, RegisterUser } from "../apifetchers/fetcher";
import Typography from "../components/Typography";
import SignupInput from "../components/SignupInput";
import CheckMark from "../assets/check_mark.png";
import AlertModal from "../components/modals/AlertModal";
import LoadingSpinner from "../components/spinner";
import { Modal1Text, Modal2Text } from "../TestData/signupTexts";


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

export const SignupModal = ({ isOpen, onClose, modalNum }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (modalNum === 1) {
      setContent(Modal1Text)
      setTitle("에듀맥스 서비스 이용 약관")
    }
    else {
      setContent(Modal2Text)
      setTitle("개인정보 수집 및 이용에 대한 안내")
    }
  }, []);

  // modal 뒤 스크린 활성화/비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <SignupModalBackdrop onClick={onClose}>
      <SignupModalView onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", width: "100%", justifyContent: "end", cursor: "pointer" }}>
          <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.3687 0.477142C18.7325 -0.159051 17.7011 -0.159052 17.0649 0.477141L9.92301 7.61902L2.93527 0.631269C2.29908 -0.00492373 1.26761 -0.00492402 0.631419 0.631269C-0.00477254 1.26746 -0.00477366 2.29893 0.631418 2.93513L7.61915 9.92287L0.477118 17.0649C-0.159074 17.7011 -0.159074 18.7326 0.477118 19.3688C1.11331 20.005 2.14478 20.005 2.78097 19.3688L9.92301 12.2267L17.2192 19.5229C17.8554 20.1591 18.8868 20.1591 19.523 19.5229C20.1592 18.8867 20.1592 17.8552 19.523 17.2191L12.2269 9.92287L19.3687 2.781C20.0049 2.14481 20.0049 1.11334 19.3687 0.477142Z" fill="#B6C0D5" />
          </svg>
        </div>
        <Typography color="#000" size="h2">
          {title}
        </Typography>
        <ScrollbarContainer>
          <ContentContainer>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </ContentContainer>
        </ScrollbarContainer>
      </SignupModalView>
    </SignupModalBackdrop>
  );
};

const Signup = () => {
  const moveTo = useNavigate();

  const [ID, setID] = useState("");
  const [isIDValid, setIsIDValid] = useState(false);
  const [isIdDup, setIsIdDup] = useState(null);
  const [idError, setIdError] = useState(false);

  const [pw, setPw] = useState("");
  const [isPwValid, setIsPwValid] = useState(false);
  const [pwError, setPwError] = useState("");

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [nickname, setNickname] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isDup, setIsDup] = useState(null);
  const [nicknameError, setNicknameError] = useState("");

  const [certNum, setCertNum] = useState("");
  const [isCertValid, setIsCertValid] = useState(false);
  const [certError, setCertError] = useState("");

  const [timer, setTimer] = useState(false); // 타이머를 위한 상태
  const [timeLeft, setTimeLeft] = useState(300); // 초기 시간 5분 설정

  const [yakgwan1Checked, setYakgwan1Checked] = useState(false);
  const [yakgwan2Checked, setYakgwan2Checked] = useState(false);
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');

  const [alertModalOpen, setAlertModalOpen] = useState(false);
  
  const handleCloseAlertModal = () => {
    setAlertModalOpen(false);
};

  useEffect(() => {
    setIsIdDup(null);

    if (ID === "")
      setIdError("")
    else {
      const regex = /^[a-zA-Z0-9_]{4,20}$/;
      setIsIDValid(regex.test(ID));
      if (isIDValid === false)
        setIdError("아이디는 4~20자의 영문, 숫자, 특수문자여야 합니다.")
      else
        setIdError("")
    }
  }, [ID, isIDValid]);

  useEffect(() => {
    setIsDup(null);

    if (nickname === "") {
      setNicknameError("");
    } else {
      const regex = /^[\u3131-\u318E\uAC00-\uD7A3a-zA-Z0-9]{2,10}$/;
      setIsNicknameValid(regex.test(nickname));
      if (isNicknameValid === false)
        setNicknameError("닉네임은 2~10자 사이의 한글, 영문자, 숫자로 이루어져야 합니다.")
      else
        setNicknameError("")
    }
  }, [nickname, isNicknameValid]);

  useEffect(() => {
    if (ID === "")
      setIdError("")
    else if (isIdDup === true)
      setIdError("중복되는 아이디입니다.")
    else if (isIdDup === false)
      setIdError("사용 가능한 아이디입니다.")
  }, [isIdDup]);

  useEffect(() => {
    if (nickname === "")
      setNicknameError("")
    else if (isDup === true)
      setNicknameError("중복되는 닉네임입니다.")
    else if (isDup === false)
      setNicknameError("사용 가능한 닉네임입니다.")
  }, [isDup]);

  useEffect(() => {
    if (pw === "") {
      setPwError("");
      setIsPwValid(false); // 비밀번호가 비어있을 경우, 유효하지 않음
    } else {
      // 비밀번호 길이 검증
      if (pw.length < 8 || pw.length > 20) {
        setPwError("비밀번호는 8~20자리여야 합니다.");
        setIsPwValid(false);
        return; // 이후 조건 검사를 중단
      }
      // 영문자 포함 검증
      if (!/[a-zA-Z]/.test(pw)) {
        setPwError("비밀번호에는 하나 이상의 영문자가 포함되어야 합니다.");
        setIsPwValid(false);
        return; // 이후 조건 검사를 중단
      }
      // 숫자 포함 검증
      if (!/\d/.test(pw)) {
        setPwError("비밀번호에는 하나 이상의 숫자가 포함되어야 합니다.");
        setIsPwValid(false);
        return; // 이후 조건 검사를 중단
      }
      // 특수문자 포함 검증
      if (!/[!@#$%^&*]/.test(pw)) {
        setPwError("비밀번호에는 하나 이상의 특수문자가 포함되어야 합니다.");
        setIsPwValid(false);
        return; // 이후 조건 검사를 중단
      }
      // 모든 조건을 만족하면 에러 메시지를 비움 및 유효성 상태를 true로 설정
      setPwError("");
      setIsPwValid(true);
    }
  }, [pw]);

  useEffect(() => {
    if (email === "") {
      setEmailError("");
      setIsEmailValid(false);
    }
    else {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
      if (regex.test(email)) {
        setIsEmailValid(true)
        setEmailError("")
      }
      else {
        setIsEmailValid(false)
        setEmailError("이메일 형식이 잘못되었습니다.")
      }
    }
  }, [email]);

  useEffect(() => {
    if (certNum === "") {
      setCertError("");
      setIsCertValid(false);
    }
    else {
      const regex = /^\d{6}$/;
      if (regex.test(certNum)) {
        setIsCertValid(true);
        setCertError("");
      }
      else {
        setIsCertValid(false);
        setCertError("인증번호는 6자리의 자연수입니다.")
      }
    }
  }, [certNum]);

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

  const handleStartTimer = async () => {
    const formData = { 'email': email }
    try {
      await SendEmail(formData);
      setAlertMessage('인증번호가 전송됐습니다');
      setAlertModalOpen(true);
    } catch (error) {
      console.error("An error occurred while sending email:", error);
      console.error("An error occurred while sending email:", error);
      setAlertMessage('인증번호 전송에 실패했습니다');
      setAlertModalOpen(true);
      // Handle error appropriately, maybe set a state to notify the user
    }
    setTimeLeft(300); // 5분으로 재설정
    setTimer(true); // 타이머 시작
  };

  // 타이머 포맷 변경 함수
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const checkIdDuplication = async () => {
    const formData = { 'login_id': ID }
    try {
      const response = await CheckDuplicate(formData);
      if (response.message === "duplicate") {
        setIsIdDup(true);
      } else {
        setIsIdDup(false);
      }
    } catch (error) {
      console.error("An error occurred while checking ID duplication:", error);
      // Handle error appropriately, maybe set a state to notify the user
    }
  }

  const checkNicknameDuplication = async () => {
    const formData = { 'nickname': nickname }
    try {
      const response = await CheckDuplicate(formData);
      if (response.message === "duplicate") {
        setIsDup(true);
      } else {
        setIsDup(false);
      }
    } catch (error) {
      console.error("An error occurred while checking ID duplication:", error);
      // Handle error appropriately, maybe set a state to notify the user
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 시작
    const formData = { login_id: ID, password: pw, email: email, nickname: nickname, auth_key: certNum }

    try {
      const response = await RegisterUser(formData);
      setLoading(false); // 로딩 종료
      moveTo('/login');
    } catch (error) {
      setLoading(false); // 로딩 종료
      console.error('An error occurred during registration:', error);
      if (error.response && error.response.data) {
        handleErrorResponse(error.response.data.errors[0]);
      } else if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.detail);
        setErrorModalOpen(true);
      } else {
        setErrorMessage('An unexpected error occurred.');
        setErrorModalOpen(true);
      }
    }
  };

  const handleErrorResponse = (message) => {
    switch (message) {
      case 'email already exist':
        setErrorMessage('이미 등록된 이메일입니다');
        break;
      case '인증번호가 틀렸습니다.':
        setErrorMessage('잘못된 인증번호 입니다.');
        break;
      case '이메일 시간이 만료됐거나, 이메일 전송이 필요합니다.':
        setErrorMessage('인증 시간이 만료되었습니다');
        break;
      default:
        setErrorMessage('알수없는 에러가 발생했습니다');
    }
    setErrorModalOpen(true);
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
    window.location.reload();
  };


  return (
    <>
      <HeaderWrapper>
        <HeaderItems>
          <LogoWrapper>
            <Typography size="logo" color="bright_blue" font="symbol">
              EduMax
            </Typography>
            <Typography size="signup_small_logo" color="black_gray" font="symbol">
              회원가입
            </Typography>
          </LogoWrapper>
          <HomeWrapper onClick={() => moveTo('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
              <path d="M9 0.625L0 7.375H2.25V16.375H6.75V11.875H11.25V16.375H15.75V7.3075L18 7.375L9 0.625Z" fill="#4A5BAB" />
            </svg>
            <Typography size="body_sub_title">에듀맥스 홈</Typography>
          </HomeWrapper>
        </HeaderItems>
      </HeaderWrapper>
      <ContentWrapper>
        <Typography size="h1" color="black_gray">
          회원정보를 입력해주세요
        </Typography>
        <div style={{ marginTop: "60px" }}>
          <InputWrapper>
            <Typography size="h3_bold" color="black_gray">
              아이디
            </Typography>
            <InputWithButtonWrapper>
              <SignupInput
                placeholder="4~20자리 / 영문, 숫자, '_' 사용가능"
                input={ID}
                setInput={setID}
                width="310px"
              />
              <SignupButton isDisabled={isIDValid === false} onClick={checkIdDuplication} />
            </InputWithButtonWrapper>
            {idError !== "" && (
              <div style={{ marginLeft: "20px" }}>
                <Typography color={isIdDup === false ? "ok_message" : "warning_red"} size="body_sub_title">
                  {idError}
                </Typography>
              </div>
            )}
          </InputWrapper>
        </div>
        <InputWrapper>
          <Typography size="h3_bold" color="black_gray">
            비밀번호
          </Typography>
          <SignupInput
            placeholder="8~20자리 / 영문, 숫자, 특수문자 반드시 하나 이상 포함"
            input={pw}
            setInput={setPw}
            isPassword={true}
          />
          {pwError !== "" && (
            <div style={{ marginLeft: "20px" }}>
              <Typography color="warning_red" size="body_sub_title">
                {pwError}
              </Typography>
            </div>
          )}
        </InputWrapper>
        <InputWrapper>
          <Typography size="h3_bold" color="black_gray">
            닉네임
          </Typography>
          <InputWithButtonWrapper>
            <SignupInput
              placeholder="닉네임을 입력하세요"
              input={nickname}
              setInput={setNickname}
              width="310px"
            />
            <SignupButton isDisabled={isNicknameValid === false} onClick={checkNicknameDuplication} />
          </InputWithButtonWrapper>
          {nicknameError !== "" && (
              <div style={{ marginLeft: "20px" }}>
                <Typography color={isDup === false ? "ok_message" : "warning_red"} size="body_sub_title">
                  {nicknameError}
                </Typography>
              </div>
            )}
        </InputWrapper>
        <InputWrapper>
          <Typography size="h3_bold" color="black_gray">
            이메일
          </Typography>
          <InputWithButtonWrapper>
            <SignupInput
              placeholder="이메일을 입력하세요"
              input={email}
              setInput={setEmail}
              width="310px"
            />
            <SignupButton isDisabled={!isEmailValid} text="인증요청" onClick={handleStartTimer} />
          </InputWithButtonWrapper>
          {emailError !== "" && (
            <div style={{ marginLeft: "20px" }}>
              <Typography color="warning_red" size="body_sub_title">
                {emailError}
              </Typography>
            </div>
          )}
        </InputWrapper>
        <div>
          <InputWrapper>
            <Typography size="h3_bold" color="black_gray">
              인증번호
            </Typography>
            <TimerAndInpuerContainer>
              <SignupInput placeholder="인증번호를 입력하세요"
                input={certNum} setInput={setCertNum} width="295px" border_color="white" padding_left="0px" />
              <TimerWrapper>
                {timer && (
                  <Typography color="timer_red" size="body_sub_title">
                    {formatTime(timeLeft)}
                  </Typography>
                )}
              </TimerWrapper>
            </TimerAndInpuerContainer>
            {certError !== "" && (
              <div style={{ marginLeft: "20px" }}>
                <Typography color="warning_red" size="body_sub_title">
                  {certError}
                </Typography>
              </div>
            )}
          </InputWrapper>
        </div>
        <InputWrapper>
          <Typography size="h3_bold" color="black_gray">
            약관
          </Typography>
          <YakgwanBox>
            <YakgwanWrapper>
              <YakgwanCheckBox
                isChecked={yakgwan1Checked}
                src={CheckMark}
                onClick={() => setYakgwan1Checked(!yakgwan1Checked)}
              />
              <div style={{ textDecoration: "none", cursor: "pointer" }} onClick={() => setIsModal1Open(true)}>
                <Typography color={yakgwan1Checked ? "black_gray" : "gray"} size="body_sub_title">
                  (필수) 에듀맥스 이용약관
                </Typography>
              </div>
              <SignupModal isOpen={isModal1Open} onClose={() => setIsModal1Open(false)} modalNum={1} />
              <Typography color={yakgwan1Checked ? "black_gray" : "gray"} size="body_sub_title">
                에 동의
              </Typography>
            </YakgwanWrapper>
            <YakgwanWrapper>
              <YakgwanCheckBox
                isChecked={yakgwan2Checked}
                src={CheckMark}
                onClick={() => setYakgwan2Checked(!yakgwan2Checked)}
              />
              <div style={{ textDecoration: "none", cursor: "pointer" }} onClick={() => setIsModal2Open(true)}>
                <Typography color={yakgwan2Checked ? "black_gray" : "gray"} size="body_sub_title">
                  (필수) 개인정보 수집 및 이용
                </Typography>
              </div>
              <SignupModal isOpen={isModal2Open} onClose={() => setIsModal2Open(false)} modalNum={2} />
              <Typography color={yakgwan2Checked ? "black_gray" : "gray"} size="body_sub_title">
                에 동의
              </Typography>
            </YakgwanWrapper>
          </YakgwanBox>
        </InputWrapper>
        <SignupButton
          isDisabled={
            !(
              isIDValid &&
              isPwValid &&
              isEmailValid &&
              yakgwan1Checked &&
              yakgwan2Checked &&
              isCertValid &&
              isIdDup == false &&
              isDup == false &&
              timer
            )
          }
          isBigButton={true}
          text="회원가입 완료"
          width="100%"
          onClick={handleSignup}
        />
      </ContentWrapper>
      {errorModalOpen && <AlertModal message={errorMessage} onClose={handleCloseErrorModal} />}
      {loading && <LoadingSpinner />}
      {alertModalOpen && (
        <AlertModal message={alertMessage} onClose={handleCloseAlertModal} />
      )}
    </>
  );
}

export default Signup;


const TimerAndInpuerContainer = styled.div`
display: flex;
width: 450px;
height: 60px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 10px;
border: 1px solid #B6C0D5;
`
const TimerWrapper = styled.div`
display: flex;
width: 105px;
justify-content: flex-end;
align-items: center;
gap: 10px;
flex-shrink: 0;
`
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
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 100px auto;
`;

const InputWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
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



const YakgwanBox = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 450px;
  height: 110px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #B6C0D5;
  margin-bottom: 30px;
`;

const YakgwanWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const YakgwanCheckBox = styled.div`
  width: ${(props) => props.isChecked ? "27px" : "25px"};
  height: ${(props) => props.isChecked ? "27px" : "25px"};
  margin-right: 15px;
  cursor: pointer;
  border-radius: 5px;
  border: ${(props) => props.isChecked ? "none" : "1px solid #A8AAAE"};
  background: ${(props) => props.isChecked ? `url(${props.src}) center/cover` : "#FFFFFF"};
`;

const SignupModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 모달 창 스타일
const SignupModalView = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 620px;
  height: 445px;
  padding: 30px 30px 40px;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  border-radius: 20px;
  background: #FFF;
`;

const ScrollbarContainer = styled.div`
  height: 280px;  // 높이 설정
  box-sizing: border-box;
  width: 100%;   // 너비 설정
  overflow: auto; // 스크롤바가 필요할 때 나타나도록 설정
  padding: 10px 20px; // 내부 패딩
  border-radius: 20px; // 테두리 둥글게
  border: 1px solid #B6C0D5; // 테두리 색상과 스타일

  // 스크롤바 스타일 커스터마이징
  &::-webkit-scrollbar {
    width: 4px; // 스크롤바 너비
  }

  &::-webkit-scrollbar-track {
    background: transparent; // 스크롤바 트랙 색상
    border-radius: 10px; // 트랙 둥글게
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888; // 스크롤바 색상
    border-radius: 10px; // 스크롤바 둥글게
    &:hover {
      background: #555; // 호버 시 스크롤바 색상 변경
    }
  }
`;

const ContentContainer = styled.div`
  word-wrap: break-word;
  color: #393E46;
  font-family: "Noto Sans KR";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
