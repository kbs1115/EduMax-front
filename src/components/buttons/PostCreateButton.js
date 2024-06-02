import React from "react";
import styled from "styled-components";
import Typography from "../Typography";
import { colorMapping } from "../Typography";

const ButtonWrapper = styled.div`
display: flex;
padding: 10px 20px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 5px;

opacity: ${props => props.isValid ? '1' : '0.5'};
background: ${colorMapping.bright_blue};
cursor: pointer;

`

const PostCreateButton = ({ onClick, isValid }) => {
    return (
        <ButtonWrapper onClick={onClick} isValid={isValid}>
            <Typography size="body_sub_title" color="white">제출하기</Typography>
        </ButtonWrapper>
    )
}
export default PostCreateButton;