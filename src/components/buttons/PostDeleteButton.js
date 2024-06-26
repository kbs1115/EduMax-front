import React from "react";
import styled from "styled-components";
import { colorMapping } from "../Typography";
import Typography from "../Typography";

const ButtonContainer = styled.button`
display: flex;
padding: 8px 12px;
justify-content: center;
align-items: center;
border-radius: 5px;
border: 1px solid ${colorMapping.middle_gray};
background-color: white;
cursor: pointer;
&:hover {
    border: 1px solid ${colorMapping.brignt_navy};
  } 
`;

const PostDeleteButton = ({ onClick }) => { // onClick prop 추가
    return (
        <ButtonContainer onClick={onClick}> {/* 내부 handleClick 대신 onClick 사용 */}
            <Typography size="body_content_medium" color="black_gray">삭제하기</Typography>
        </ButtonContainer>
    );
};
  


export default PostDeleteButton;