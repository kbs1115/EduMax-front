import React from 'react';
import styled from 'styled-components';

// Styled-component for the input
const StyledInput = styled.input`
  box-sizing: border-box;
  border: 1px solid ${props => props.border_color};
  width: ${props => props.width};
  height: 60px;
  background-color: #FFF;
  border-radius: 10px;
  font-family: "Noto Sans KR";
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-left: ${props => props.padding_left};

  // Placeholder styles
  &::placeholder {
    font-family: "Noto Sans KR";
    color: #A8AAAE;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  // Focus styles to maintain original border color
  &:focus {
    outline: none;
    border-color: ${props => props.border_color}; // Focus 상태에서도 원래 테두리 색상 유지
  }
`;


// The LoginInput component
const SignupInput = ({ 
	className,
    width = "450px",
	placeholder, 
	isPassword,
	input,
	setInput,
	border_color = "#B6C0D5",
	padding_left = "20px"
}) => {
    return (
        <StyledInput
		  className={className}
          width={width}
          type={isPassword ? "password" : "text"} // Set type based on isPassword prop
          placeholder={placeholder} // Use the placeholder prop
		  value={input}
		  onChange={e => setInput(e.target.value)}
		  border_color = {border_color}
		  padding_left = {padding_left}
        />
    );
}

export default SignupInput;