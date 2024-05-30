import React from "react";
import styled from "styled-components";
import Typography, { colorMapping, sizeMapping } from "./Typography";
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const LectureNavBarWrapper = styled.div`
  display: flex;
  padding: 30px 10px 50px 10px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  background: #03317D;
`;

const EmptyWrapper = styled.div`
  display: flex;
  padding: 20px 0px 0px 0px;
  width: 100%;
  background: #FFFFFF;
`;

const Wrapper1170 = styled.div`
  display: flex;
  width: 1170px;
  align-items: flex-start;
`;

const CategoryWrapper = styled.div`
  display: flex;
  width: 230px;
  padding: 5px 30px 10px 30px;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  border-left: 1px solid #9695B1;
`;

const RightCategoryWrapper = styled.div`
  display: flex;
  width: 230px;
  padding: 10px 30px;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  align-self: stretch;
  border-left: 1px solid #9695B1;
  border-right: 1px solid #BAB9D2;
`;

const ContentWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TypographyWrapper = styled.div`
  display: flex;
  padding: 10px 0px 10px 5px;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  &:hover > * {
    color: ${colorMapping.white} !important;
  }
`;

const TitleTypographyWrapper = styled.div`
  display: flex;
  padding: 10px 0px;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;

  &:hover > * {
    color: ${colorMapping.white} !important;
  }
`;

const LectureNavBar = ({ onClose }) => {
    return (
        <Wrapper>
            <EmptyWrapper></EmptyWrapper>
            <LectureNavBarWrapper>
                <Wrapper1170>
                    <CategoryWrapper>
                        <ContentWrapper>
                            <Link to="/post/lecture?category=국어" onClick={onClose} style={{ textDecoration: 'none' }}>
                                <TitleTypographyWrapper>
                                    <Typography color="white" size="h3_thin">국어</Typography>
                                </TitleTypographyWrapper>
                            </Link>
                        </ContentWrapper>
                    </CategoryWrapper>
                    <CategoryWrapper>
                        <ContentWrapper>
                            <Link to="/post/lecture?category=수학" onClick={onClose} style={{ textDecoration: 'none' }}>
                                <TitleTypographyWrapper>
                                    <Typography color="white" size="h3_thin">수학</Typography>
                                </TitleTypographyWrapper>
                            </Link>
                            <Link to="/post/lecture?category=수학1" onClick={onClose} style={{ textDecoration: 'none' }}>
                                <TypographyWrapper>
                                    <Typography color="clay" size="body_content_thin">수학1</Typography>
                                </TypographyWrapper>
                            </Link>
                            <Link to="/post/lecture?category=수학2" onClick={onClose} style={{ textDecoration: 'none' }}>
                                <TypographyWrapper>
                                    <Typography color="clay" size="body_content_thin">수학2</Typography>
                                </TypographyWrapper>
                            </Link>
                            <Link to="/post/lecture?category=고등수학" onClick={onClose} style={{ textDecoration: 'none' }}>
                                <TypographyWrapper>
                                    <Typography color="clay" size="body_content_thin">고등수학 상</Typography>
                                </TypographyWrapper>
                            </Link>
                            <Link to="/post/lecture?category=미적분" onClick={onClose} style={{ textDecoration: 'none' }}>
                                <TypographyWrapper>
                                    <Typography color="clay" size="body_content_thin">미적분</Typography>
                                </TypographyWrapper>
                            </Link>
                            <Link to="/post/lecture?category=확률과통계" onClick={onClose} style={{ textDecoration: 'none' }}>
                                <TypographyWrapper>
                                    <Typography color="clay" size="body_content_thin">확률과 통계</Typography>
                                </TypographyWrapper>
                            </Link>
                        </ContentWrapper>
                    </CategoryWrapper>
                    <CategoryWrapper>
                        <ContentWrapper>
                            <Link to="/post/lecture?category=영어" onClick={onClose} style={{ textDecoration: 'none' }}>
                                <TitleTypographyWrapper>
                                    <Typography color="white" size="h3_thin">영어</Typography>
                                </TitleTypographyWrapper>
                            </Link>
                            <Link to="/post/lecture?category=내신" onClick={onClose} style={{ textDecoration: 'none' }}>
                                <TypographyWrapper>
                                    <Typography color="clay" size="body_content_thin">내신</Typography>
                                </TypographyWrapper>
                            </Link>
                            <Link to="/post/lecture?category=수능" onClick={onClose} style={{ textDecoration: 'none' }}>
                                <TypographyWrapper>
                                    <Typography color="clay" size="body_content_thin">수능</Typography>
                                </TypographyWrapper>
                            </Link>
                            <Link to="/post/lecture?category=문법" onClick={onClose} style={{ textDecoration: 'none' }}>
                                <TypographyWrapper>
                                    <Typography color="clay" size="body_content_thin">문법</Typography>
                                </TypographyWrapper>
                            </Link>
                        </ContentWrapper>
                    </CategoryWrapper>
                    <RightCategoryWrapper>
                        <ContentWrapper>
                            <Link to="/post/lecture?category=탐구" onClick={onClose} style={{ textDecoration: 'none' }}>
                                <TitleTypographyWrapper>
                                    <Typography color="white" size="h3_thin">탐구</Typography>
                                </TitleTypographyWrapper>
                            </Link>
                        </ContentWrapper>
                    </RightCategoryWrapper>
                </Wrapper1170>
            </LectureNavBarWrapper>
        </Wrapper>
    );
};

export default LectureNavBar;
