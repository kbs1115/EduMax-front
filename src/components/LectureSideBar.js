import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";

import Typography from "./Typography";
import { boardMapping } from "./NavBar";

export const SubjectMapping = {
  KQ: "국어",
  MQ: "수학",
  EQ: "영어",
  TQ: "탐구",
};

const SideBarWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 285px;
  width: 197px;
  flex-direction: column;
  padding: 20px 0px;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  border-top: 2px solid #393e46;
  border-bottom: 2px solid #393e46;
`;

const BoardWrapper = styled.div`
  display: flex;
  height: 63px;
  padding: 0px 5px 10px 5px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-bottom: 1px solid #dfe5ee;
`;

const CategoryWrapper = styled.div`
  display: flex;
  padding: 5px 15px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 10px;
  background-color: ${(props) => (props.isActive ? "#4C6BFF" : "transparent")};
  cursor: pointer;

  & > div {
    color: ${(props) => (props.isActive ? "white" : "black")};
  }
`;

const LectureSideBar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || '영어';

  return (
    <SideBarWrapper>
      <BoardWrapper>
        <Typography size="h1">선생님강의</Typography>
      </BoardWrapper>
      <CategoryWrapper
        isActive={category === "국어"}
        onClick={() => {
          navigate('/post/lecture?category=국어')
        }}
      >
        <Typography size="h3_medium">국어</Typography>
      </CategoryWrapper>
      <CategoryWrapper
        isActive={category === "수학"}
        onClick={() => {
          navigate('/post/lecture?category=수학')
        }}
      >
        <Typography size="h3_medium">수학</Typography>
      </CategoryWrapper>
      <CategoryWrapper
        isActive={category === "영어"}
        onClick={() => {
          navigate('/post/lecture?category=영어')
        }}
      >
        <Typography size="h3_medium">영어</Typography>
      </CategoryWrapper>
      <CategoryWrapper
        isActive={category === "탐구"}
        onClick={() => {
          navigate('/post/lecture?category=탐구')
        }}
      >
        <Typography size="h3_medium">탐구</Typography>
      </CategoryWrapper>
    </SideBarWrapper>
  );
};

export default LectureSideBar;