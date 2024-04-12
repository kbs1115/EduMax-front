import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../Typography';


const FindModal = ({ isOpen, isPassword = false, onClose }) => {
	const [title, setTitle] = useState({
		"title": "",
		"step": ""
	})
	const [email, setEmail] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [emailError, setEmailError] = useState("");

	const [pw, setPw] = useState("");
	const [isPwNotSame, setIsPwNotSame] = useState(false);
	const [isPwValid, setIsPwValid] = useState(false);
  	const [pwError, setPwError] = useState("");
	const [pw2, setPw2] = useState("");

	const [certNum, setCertNum] = useState("");
	const [isCertValid, setIsCertValid] = useState(false);
	const [certError, setCertError] = useState("");

	const [step, setStep] = useState(1);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleCertNumChange = (event) => {
		setCertNum(event.target.value);
	};

	useEffect(() => {
		if (email === ""){
		  setEmailError("");
		  setIsEmailValid(false);
		}
		else {
		  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
		  if (regex.test(email)){
			setIsEmailValid(true)
			setEmailError("")
		  }
		  else{
			setIsEmailValid(false)
			setEmailError("이메일 형식이 잘못되었습니다.")
		  }
		}
	  }, [email]);

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
		if (pw !== "" && pw2 !== "" && pw !== pw2){
			setIsPwNotSame(true);
		}
		else
			setIsPwNotSame(false);
  }, [pw, pw2]);

	useEffect(() => {
		if (certNum === ""){
		setCertError("");
		setIsCertValid(false);
		}
		else {
		const regex = /^\d{6}$/;
		if (regex.test(certNum)){
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

  if (!isOpen) return null; // Don't render the modal unless it's open

  return (
	<Backdrop onClick={onClose}>
		<Wrapper onClick={(e) => e.stopPropagation()}>
			<div style={{ display: "flex", flexDirection: "column", width: "100%", paddingBottom: "10px" }}>
				<TitleWrapper>
					<Typography size='h2'>
						{title["title"]}
					</Typography>
					<Typography size='h2' color='navy'>
						{title["step"]}
					</Typography>
				</TitleWrapper>
				{step === 1 && <>
					<Typography size='body_content_thin' color='gray'>
						본인확인을 위해 반드시 인증절차가 필요합니다.
					</Typography>
				</>}
			</div>
			{ step === 1 ? <>
				<div style={{ display: "flex", width: "100%", flexDirection: "column", gap: "20px" }}>
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "end"}}>
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
					<StyledButton disabled={!isEmailValid}>
						<Typography 
							size='body_sub_title' 
							color={isEmailValid ? 'white' : 'gray'}>인증요청</Typography>
					</StyledButton>
				</div>
				{ ( emailError !== "" ) && <div style={{ marginLeft: "10px" }}><Typography 
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
				</CertNumWrapper>
				{ ( certError !== "" ) && <div style={{ marginLeft: "10px" }}><Typography 
					color="warning_red"
					size="body_content_thin">
						{certError}
					</Typography></div>}
			</div>
			<div>
				<StyledButton disabled={!(isEmailValid && certNum !== "")} onClick={() => setStep(2)}>
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
						gmyun1999
					</Typography>
					<Typography color='gray' size='body_sub_title'>
						입니다.
					</Typography>
				</Step2TextWrapper>
				<div>
					<StyledButton onClick={() => setStep(1)}>
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
					비밀번호
				</Typography>
				<StyledInput 
					value={pw}
					type='password' 
					onChange={(event) => setPw(event.target.value)} 
					placeholder="8~20자리/ 영문 대소문자, 숫자, 특수문자 조합"
				/>
				{ ( pwError !== "" ) && <div style={{ marginLeft: "10px" }}><Typography 
            color="warning_red"
            size="body_sub_title">
              {pwError}
            </Typography></div>}
			</CertNumWrapper>
			<CertNumWrapper>
				<Typography color='black_gray' size='h3_bold'>
					비밀번호 확인
				</Typography>
				<StyledInput 
					value={pw2} 
					type='password' 
					onChange={(event) => setPw2(event.target.value)} 
					placeholder="8~20자리/ 영문 대소문자, 숫자, 특수문자 조합"
				/>
				{ (isPwNotSame && isPwValid) && <div style={{ marginLeft: "10px" }}><Typography 
            color="warning_red"
            size="body_sub_title">
              비밀번호가 일치하지 않습니다.
            </Typography></div>}
			</CertNumWrapper>
		</div>
		<div>
			<StyledButton disabled={!isPwValid || isPwNotSame} onClick={() => setStep(3)}>
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
					<StyledButton onClick={() => setStep(1)}>
						<Typography 
							size='body_sub_title' 
							color='white'>홈으로</Typography>
					</StyledButton>
				</div>
			</Step2Wrapper>}
    </Wrapper>
	</Backdrop>
    
  );
}

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
	border-bottom: 1px solid #4A5BAB;
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
	background: ${(props) => props.disabled ? "#F4F6FA" : "#4A5BAB"};
	cursor: pointer;
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

