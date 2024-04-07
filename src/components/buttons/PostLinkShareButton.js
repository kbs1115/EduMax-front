import React from "react";
import styled from "styled-components";
import { colorMapping } from "../Typography";
import Typography from "../Typography";
import linkIcon from "../../assets/linkIcon.png"
const ButtonContainer = styled.button`
  display: flex;
  padding: 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 2px solid ${colorMapping.container};
  background-color: white;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
`;
const LinkIconWrapper = styled.img`
width: 20px;
height: 20px;
`

const TypoWrapper=styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 10px;
`
const PostLinkShareButton = () => {
    const handleClick = () => {
        // Copy the current URL to the clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert("게시글 url이 복사되었습니다."); // Show a confirmation message
        }).catch((err) => {
            console.error('Could not copy URL: ', err);
        });
    };

    return (
      <ButtonContainer onClick={handleClick}>
        <LinkIconWrapper src={linkIcon} />
        <TypoWrapper>
          <Typography size="h3_medium" color="black_gray">공유하기</Typography>
        </TypoWrapper>
      </ButtonContainer>
    );
};
  


export default PostLinkShareButton;