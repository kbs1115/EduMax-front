import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../Typography';


const EmailModal = ({isPassword = false}) => {
	const [title, setTitle] = useState({
		"title": "",
		"step": ""
	})
	const [email, setEmail] = useState("");
	const [pw1, setPw1] = useState("");
	const [pw2, setPw2] = useState("");
	const [certNum, setCertNum] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isPwValid, setIsPwValid] = useState(false);
	const [step, setStep] = useState(1);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleCertNumChange = (event) => {
		setCertNum(event.target.value);
	};

	useEffect(() => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
    setIsEmailValid(regex.test(email));
		console.log(isEmailValid);
  }, [email]);

	useEffect(() => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
    setIsPwValid(regex.test(pw1));

		if (pw1 !== pw2)
			setIsPwValid(false);
  }, [pw1, pw2]);

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

  return (
    <Wrapper>
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
					value={pw1}
					type='password' 
					onChange={(event) => setPw1(event.target.value)} 
					placeholder="8~20자리/ 영문 대소문자, 숫자, 특수문자 조합"
				/>
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
			</CertNumWrapper>
		</div>
		<div>
			<StyledButton disabled={!isPwValid} onClick={() => setStep(3)}>
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
  );
}

export default EmailModal;

const Wrapper = styled.div`
  display: flex;
	box-sizing: border-box;
  width: 640px;
  height: 445px;
  padding: 30px 40px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  border: 1px solid #B6C0D5;
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

