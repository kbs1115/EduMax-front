import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '../Typography';

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
	justify-content: center;
	align-items: center;
	margin: auto;
`;

const PasswordModal = () => {
	const [email, setEmail] = useState("");
	const [certNum, setCertNum] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(false);
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

  return (
    <Wrapper>
			<div style={{ display: "flex", flexDirection: "column", width: "100%", paddingBottom: "10px" }}>
				<TitleWrapper>
					<Typography size='h2'>
						{step === 1 ? "이메일 인증" : "인증 완료"}
					</Typography>
					<Typography size='h2' color='navy'>
						Step {step}/2
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
			</>: 
				<Step2Wrapper>
					<Typography color='gray' size='body_sub_title'>
						귀하의 아이디는&nbsp; 
					</Typography>
					<Typography color='black_gray' size='body_sub_title'>
						gmyun1999
					</Typography>
					<Typography color='gray' size='body_sub_title'>
						입니다.
					</Typography>
				</Step2Wrapper>
			}
    </Wrapper>
  );
}

export default PasswordModal;
