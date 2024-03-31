import React from 'react';
import styled from 'styled-components';

// Styled-component for the input
const StyledInput = styled.input`
	box-sizing: border-box;
    border: 1px solid #B6C0D5;
	width: ${props => props.width};
	height: 60px;
	background-color: #FFF;
	border-radius: 10px;
	font-family: "Noto Sans KR";
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	padding-left: 20px;

  // Placeholder styles
  &::placeholder {
    font-family: "Noto Sans KR";
		color: #A8AAAE;
		font-size: 16px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
	}
`;

// The LoginInput component
const SignupInput = ({ 
	className,
    width = "450px",
	placeholder, 
	isPassword,
	input,
	setInput
}) => {
    return (
        <StyledInput
		  className={className}
          width={width}
          type={isPassword ? "password" : "text"} // Set type based on isPassword prop
          placeholder={placeholder} // Use the placeholder prop
		  value={input}
		  onChange={e => setInput(e.target.value)}
        />
    );
}

export default SignupInput;