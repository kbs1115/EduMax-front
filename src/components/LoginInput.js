import React from 'react';
import styled from 'styled-components';

// Styled-component for the input
const StyledInput = styled.input`
	box-sizing: border-box;
	width: 310px;
	height: 60px;
	background-color: #F5F5F5;
	border-radius: 20px;
	border: none; // 테두리가 없음
	font-family: "Noto Sans Symbols";
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	letter-spacing: -0.32px;
	padding-left: 20px;

  // Placeholder styles
  &::placeholder {
    font-family: "Noto Sans Symbols";
		color: #A8AAAE;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		letter-spacing: -0.32px;
	}
`;

// The LoginInput component
const LoginInput = ({ 
	className, 
	placeholder, 
	isPassword,
	input,
	setInput
}) => {
    return (
        <StyledInput
					className={className}
          type={isPassword ? "password" : "text"} // Set type based on isPassword prop
          placeholder={placeholder} // Use the placeholder prop
					value={input}
					onChange={e => setInput(e.target.value)}
        />
    );
}

export default LoginInput;
