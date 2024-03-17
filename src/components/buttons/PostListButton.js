import React from "react";
import styled from "styled-components";
import Typography from "../Typography";

const StyledButton = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
	display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.buttonColor};
	border-radius: 5px;
	border-style: hidden;
	cursor: pointer;
`;

const PostListButton = ({ width, height, size, textColor, buttonColor, children }) => {
  return (
    <StyledButton width={width} height={height} buttonColor={buttonColor}>
        <Typography size={size} color={textColor}>{children}</Typography>
    </StyledButton>
  );
};

export default PostListButton;