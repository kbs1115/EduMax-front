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
`;

const PostDeleteButton = () => {
    const handleClick = () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            // do something
        }
    };

    return (
      <ButtonContainer onClick={handleClick}>

          <Typography size="body_content_medium" color="black_gray">삭제하기</Typography>

      </ButtonContainer>
    );
};
  


export default PostDeleteButton;