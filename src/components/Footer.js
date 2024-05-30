import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Typography from "./Typography";
import { SignupModal } from "../pages/Signup";

const FooterWrapper = styled.div`
    display: flex;
    margin-top: 100px;
    padding: 40px 0px 40px 0px;
    gap: 10px;
    align-items: center;
    justify-content: center;
    border-top: 1px solid #DFE5EE;
    border-bottom: 1px solid #DFE5EE;
`;

const CopyrightWrapper = styled.div`
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    align-items: center;
    justify-content: center;
`;

const FooterInnerWrapper = styled.div`
  display: flex;
  width: 1170px;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 5px;
`;

const TextContainer = styled.div`
    border-right: 0.5px solid #393E46;
    padding-right: 5px;
    padding-left: 5px;
`;


const Footer = () => {
  const navigate = useNavigate();

  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

    return (<>
    <FooterWrapper>
      <FooterInnerWrapper>
      <div style={{ paddingLeft: '5px'}}>
        <Typography color="bright_blue" size="body_content_medium">EduMax</Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <TextContainer>
          <Typography size="body_content_small_thin" color="black_gray">
            에듀맥스
          </Typography>
        </TextContainer>
        <TextContainer>
          <Typography size="body_content_small_thin" color="black_gray">
            사업자번호: 124-94-44996
          </Typography>
        </TextContainer>
        <TextContainer>
          <Typography size="body_content_small_thin" color="black_gray">
            대표: 신성균
          </Typography>
        </TextContainer>
        <TextContainer>
          <Typography size="body_content_small_thin" color="black_gray">
            에듀맥스 입시학원
          </Typography>
        </TextContainer>
        <div style={{ paddingLeft: '5px'}}>
          <Typography size="body_content_small_thin" color="black_gray">
              경기도 수원시 권선구 권광로 68 (권선동,6층)
          </Typography>
        </div>
      </div>
      <div style={{ paddingLeft: '5px'}}>
        <Typography size="body_content_small_thin" color="black_gray">
            대표번호 : 031-238-2261
        </Typography>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <div style={{ textDecoration: "none", cursor: "pointer" }} onClick={() => navigate('/intro')}>
          <TextContainer>
            <Typography size="body_content_small_thin" color="black_gray">
              학원소개
            </Typography>
          </TextContainer>
        </div>
        <div style={{ textDecoration: "none", cursor: "pointer" }} onClick={() => setIsModal1Open(true)}>
          <TextContainer>
            <Typography size="body_content_small_thin" color="black_gray">
              에듀맥스 이용약관
            </Typography>
            <SignupModal isOpen={isModal1Open} onClose={() => setIsModal1Open(false)} modalNum={1} />
          </TextContainer>
        </div>
        <div style={{ textDecoration: "none", cursor: "pointer" }} onClick={() => setIsModal2Open(true)}>
          <TextContainer>
            <Typography size="body_content_small_thin" color="black_gray">
              개인정보 처리방침
            </Typography>
            <SignupModal isOpen={isModal2Open} onClose={() => setIsModal2Open(false)} modalNum={2} />
          </TextContainer>
        </div>
      </div>
      </FooterInnerWrapper>
    </FooterWrapper>
    <CopyrightWrapper>
      <div style={{ width: '1170px'}}>
      <Typography size="body_content_small_thin" color="black_gray">
        Copyright () 2024 EduMax 홈페이지 All rights reserved.
      </Typography>
      </div>
    </CopyrightWrapper>
    </>
    );
}

export default Footer
