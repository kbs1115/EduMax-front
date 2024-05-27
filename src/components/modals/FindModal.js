import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../Typography';
import { SendEmail, EmailAuth, EmailAuthForPw, PwChange } from '../../apifetchers/fetcher';
import LoadingSpinner from '../spinner';
import AlertModal from '../modals/AlertModal';
import { useNavigate } from 'react-router-dom';

const FindModal = ({ isOpen, isPassword = false, onClose }) => {
    const [title, setTitle] = useState({
        "title": "",
        "step": ""
    });
    const moveTo = useNavigate();
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [certNum, setCertNum] = useState("");
    const [isCertValid, setIsCertValid] = useState(false);
    const [certError, setCertError] = useState("");
    const [step, setStep] = useState(1);
    const [timer, setTimer] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);
    const [loginId, setLoginId] = useState(""); // login_id 상태 추가
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [alertModalOpen, setAlertModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [pw, setPw] = useState("");
    const [isPwNotSame, setIsPwNotSame] = useState(false);
    const [isPwValid, setIsPwValid] = useState(false);
    const [pwError, setPwError] = useState("");
    const [pw2, setPw2] = useState("");
    const [pwUrl, setPwUrl] = useState("");

    useEffect(() => {
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
            setAlertMessage('인증번호 전송에 실패했습니다');
            setAlertModalOpen(true);
        }
        setTimeLeft(300);
        setTimer(true);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleCertNumChange = (event) => {
        setCertNum(event.target.value);
    };

    useEffect(() => {
        if (email === "") {
            setEmailError("");
            setIsEmailValid(false);
        } else {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
            if (regex.test(email)) {
                setIsEmailValid(true);
                setEmailError("");
            } else {
                setIsEmailValid(false);
                setEmailError("이메일 형식이 잘못되었습니다.");
            }
        }
    }, [email]);

    useEffect(() => {
        if (certNum === "") {
            setCertError("");
            setIsCertValid(false);
        } else {
            const regex = /^\d{6}$/;
            if (regex.test(certNum)) {
                setIsCertValid(true);
                setCertError("");
            } else {
                setIsCertValid(false);
                setCertError("인증번호는 6자리의 자연수입니다.");
            }
        }
    }, [certNum]);

    useEffect(() => {
        if (step === 1) {
            if (isPassword)
                setTitle({
                    "title": "이메일 인증",
                    "step": "Step 1/3"
                });
            else
                setTitle({
                    "title": "이메일 인증",
                    "step": "Step 1/2"
                });
        }

        if (step === 2) {
            if (isPassword)
                setTitle({
                    "title": "비밀번호 변경",
                    "step": "Step 2/3"
                });
            else
                setTitle({
                    "title": "인증 완료",
                    "step": "Step 2/2"
                });
        }

        if (step === 3)
            setTitle({
                "title": "변경 완료",
                "step": "Step 3/3"
            });
    }, [step]);

    useEffect(() => {
        if (pw === "") {
            setPwError("");
            setIsPwValid(false);
        } else {
            if (pw.length < 8 || pw.length > 20) {
                setPwError("비밀번호는 8~20자리여야 합니다.");
                setIsPwValid(false);
                return;
            }
            if (!/[a-zA-Z]/.test(pw)) {
                setPwError("비밀번호에는 하나 이상의 영문자가 포함되어야 합니다.");
                setIsPwValid(false);
                return;
            }
            if (!/\d/.test(pw)) {
                setPwError("비밀번호에는 하나 이상의 숫자가 포함되어야 합니다.");
                setIsPwValid(false);
                return;
            }
            if (!/[!@#$%^&*]/.test(pw)) {
                setPwError("비밀번호에는 하나 이상의 특수문자가 포함되어야 합니다.");
                setIsPwValid(false);
                return;
            }
            setPwError("");
            setIsPwValid(true);
        }
    }, [pw]);

    useEffect(() => {
        if (pw !== "" && pw2 !== "" && pw !== pw2) {
            setIsPwNotSame(true);
        }
        else
            setIsPwNotSame(false);
    }, [pw, pw2]);

    const handleNextStep = async (e) => {
        const formData = new FormData();
        formData.append('auth_key', certNum);
        formData.append('email', email);
        e.preventDefault();
        setLoading(true); // 로딩 시작
        try {
            let response;
            if (isPassword) {
                response = await EmailAuthForPw(formData);
                setPwUrl(response.data.redirect_url);
                setStep(2);
            } else {
                response = await EmailAuth(formData);
                setLoginId(response.data.login_id);
                setStep(2);
            }
            setLoading(false); // 로딩 종료
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

    const handlePwChangeAndNextStep = async () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('new_pw', pw);

        try {
            await PwChange(pwUrl, formData);
            setStep(3);
        } catch (error) {
            console.error('Failed to change password:', error);
            setErrorMessage('비밀번호 변경에 실패했습니다.');
            setErrorModalOpen(true);
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
                setErrorMessage('알 수 없는 에러가 발생했습니다');
        }
        setErrorModalOpen(true);
    };

    const handleCloseErrorModal = () => {
        setErrorModalOpen(false);
        window.location.reload();
    };

    const handleCloseAlertModal = () => {
        setAlertModalOpen(false);
    };

    if (!isOpen) return null;

    return (
        <Backdrop onClick={onClose}>
            <Wrapper onClick={(e) => e.stopPropagation()}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%", paddingBottom: "10px" }}>
                    <TitleWrapper>
                        <Typography size='h2'>
                            {title["title"]}
                        </Typography>
                        <Typography size='h2' color='bright_blue'>
                            {title["step"]}
                        </Typography>
                    </TitleWrapper>
                    {step === 1 && <>
                        <Typography size='body_content_thin' color='gray'>
                            본인확인을 위해 반드시 인증절차가 필요합니다.
                        </Typography>
                    </>}
                </div>
                {step === 1 ? <>
                    <div style={{ display: "flex", width: "100%", flexDirection: "column", gap: "20px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
                            <EmailWrapper>
                                <Typography color='black_gray' size='h3_bold'>
                                    이메일
                                </Typography>
                                <StyledInput
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="이메일을 입력하세요"
                                />
                            </EmailWrapper>
                            <StyledButton
                                disabled={!isEmailValid}
                                onClick={handleStartTimer}>
                                <Typography
                                    size='body_sub_title'
                                    color={isEmailValid ? 'white' : 'gray'}>인증요청</Typography>
                            </StyledButton>
                        </div>
                        {(emailError !== "") && <div style={{ marginLeft: "10px" }}><Typography
                            color="warning_red"
                            size="body_content_thin">
                            {emailError}
                        </Typography></div>}
                        <CertNumWrapper>
                            <Typography color='black_gray' size='h3_bold'>
                                인증번호
                            </Typography>
                            <StyledInput
                                value={certNum}
                                onChange={handleCertNumChange}
                                placeholder="인증번호를 입력하세요"
                            />
                            <TimerWrapper>
                                {timer && <Typography color="timer_red" size="body_sub_title">
                                    {formatTime(timeLeft)}
                                </Typography>}
                            </TimerWrapper>
                        </CertNumWrapper>
                        {(certError !== "") && <div style={{ marginLeft: "10px" }}><Typography
                            color="warning_red"
                            size="body_content_thin">
                            {certError}
                        </Typography></div>}
                    </div>
                    <div>
                        <StyledButton disabled={!(isEmailValid && certNum !== "")} onClick={handleNextStep}>
                            <Typography
                                size='body_sub_title'
                                color={isEmailValid ? 'white' : 'gray'}>다음</Typography>
                        </StyledButton>
                    </div>
                </> : step === 2 && !isPassword ?
                    <Step2Wrapper>
                        <Step2TextWrapper>
                            <Typography color='gray' size='body_sub_title'>
                                귀하의 아이디는&nbsp;
                            </Typography>
                            <Typography color='black_gray' size='body_sub_title'>
                                {loginId}
                            </Typography>
                            <Typography color='gray' size='body_sub_title'>
                                입니다.
                            </Typography>
                        </Step2TextWrapper>
                        <div>
                            <StyledButton onClick={() => window.location.reload()}>
                                <Typography
                                    size='body_sub_title'
                                    color='white'>홈으로</Typography>
                            </StyledButton>
                        </div>
                    </Step2Wrapper>
                    : step === 2 && isPassword ? <>
                        <div style={{ display: "flex", width: "100%", flexDirection: "column", gap: "20px" }}>
                            <CertNumWrapper>
                                <Typography color='black_gray' size='h3_bold'>
                                    새 비밀번호
                                </Typography>
                                <StyledInput
                                    value={pw}
                                    type='password'
                                    onChange={(event) => setPw(event.target.value)}
                                    placeholder="8~20자리/ 영문 대소문자, 숫자, 특수문자 조합"
                                />
                                {(pwError !== "") && <div style={{ marginLeft: "10px" }}><Typography
                                    color="warning_red"
                                    size="body_sub_title">
                                    {pwError}
                                </Typography></div>}
                            </CertNumWrapper>
                            <CertNumWrapper>
                                <Typography color='black_gray' size='h3_bold'>
                                    새 비밀번호 확인
                                </Typography>
                                <StyledInput
                                    value={pw2}
                                    type='password'
                                    onChange={(event) => setPw2(event.target.value)}
                                    placeholder="8~20자리/ 영문 대소문자, 숫자, 특수문자 조합"
                                />
                                {(isPwNotSame && isPwValid) && <div style={{ marginLeft: "10px" }}><Typography
                                    color="warning_red"
                                    size="body_sub_title">
                                    비밀번호가 일치하지 않습니다.
                                </Typography></div>}
                            </CertNumWrapper>
                        </div>
                        <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                            <StyledButton onClick={() => {
                                setStep(1);
                                setCertNum("");
                                setIsCertValid(false);
                                setTimer(null);
                            }}>
                                <Typography
                                    size='body_sub_title'
                                    color='white'>이전</Typography>
                            </StyledButton>
                            <StyledButton disabled={!isPwValid || isPwNotSame} onClick={handlePwChangeAndNextStep}>
                                <Typography
                                    size='body_sub_title'
                                    color={isEmailValid ? 'white' : 'gray'}>다음</Typography>
                            </StyledButton>
                        </div>
                    </> : <Step2Wrapper>
                        <Step2TextWrapper>
                            <Typography color='gray' size='body_sub_title'>
                                귀하의 비밀번호가 성공적으로 변경되었습니다.
                            </Typography>
                        </Step2TextWrapper>
                        <div>
                            <StyledButton onClick={() => window.location.reload()}>
                                <Typography
                                    size='body_sub_title'
                                    color='white'>홈으로</Typography>
                            </StyledButton>
                        </div>
                    </Step2Wrapper>}
                {loading && <LoadingSpinner />}
                {errorModalOpen && (
                    <AlertModal message={errorMessage} onClose={handleCloseErrorModal} />
                )}
                {alertModalOpen && (
                    <AlertModal message={alertMessage} onClose={handleCloseAlertModal} />
                )}
            </Wrapper>
        </Backdrop>
    );
};

export default FindModal;

const Wrapper = styled.div`
  display: flex;
  margin: auto;
  box-sizing: border-box;
  width: 640px;
  height: 445px;
  padding: 30px 40px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  border: 1px solid #B6C0D5;
  background-color: white;
`;

const TitleWrapper = styled.div`
	display: flex;
	box-sizing: border-box;
	padding: 10px 0px;
	justify-content: space-between;
	align-items: center;
	align-self: stretch;
	border-bottom: 2px solid #393E46;
	margin-bottom: 10px;
`;

const EmailWrapper = styled.div`
	display: flex;
	width: 450px;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
`;

const CertNumWrapper = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;
`;

const StyledInput = styled.input`
	width: 100%;
	box-sizing: border-box;
	padding: 10px;
	height: 46px;
	border: none;
	border-bottom: 1px solid #4C6BFF;
	font-family: "Noto Sans KR";
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	outline: none;
	color: black; /* 입력하는 텍스트 색상 */
	::placeholder {
		color: #A8AAAE; /* 플레이스홀더 텍스트 색상 */
	}
`;

const StyledButton = styled.button`
	display: flex;
	width: 100px;
	height: 46px;
	padding: 10px;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	border: 1px solid #E0E4EB;
	background: ${(props) => props.disabled ? "#F4F6FA" : "#4C6BFF"};
	cursor: pointer;
	&:hover {
		background: ${(props) => props.disabled ? "#F4F6FA" : "#002CFF"};
	}
`;

const Step2Wrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	align-items: center;
`;

const Step2TextWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const TimerWrapper = styled.div`
  position: relative;
  height: 0px;
  bottom: 45px;
  left: 510px;
`;
