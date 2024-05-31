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
	border-radius: ${props => props.borderRadius};
	border-style: hidden;
  cursor: pointer;
    &:hover {
    background-color: ${props => props.hoverColor};
  }
`;

const PostListButton = ({ 
  width, 
  height, 
  size, 
  textColor, 
  buttonColor, 
  borderRadius="10px",
  onClick,
  hoverColor = "002CFF",
  children
}) => {
  return (
    <StyledButton width={width} height={height} buttonColor={buttonColor} borderRadius={borderRadius} onClick={onClick} hoverColor = {hoverColor}>
        <Typography size={size} color={textColor}>{children}</Typography>
    </StyledButton>
  );
};

export default PostListButton;