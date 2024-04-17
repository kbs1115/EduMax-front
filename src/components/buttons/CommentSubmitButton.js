import React, { useState } from "react";
import styled from "styled-components"
import Typography, { colorMapping } from "../Typography";

const ButtonWrapper = styled.div`
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background: ${colorMapping.bright_blue};
  cursor: pointer;

  &:hover {
    background: ${colorMapping.hover_blue};
  }
`
const CommentSubmitButton = ({content,onClick, isValid})=>{
    return(
        <ButtonWrapper onClick={onClick} isValid={isValid}> 
            <Typography size="body_sub_title" color="white">{content}</Typography>
        </ButtonWrapper>
    )
}
export default CommentSubmitButton;