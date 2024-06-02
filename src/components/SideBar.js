import React, { useState } from "react";
import styled from "styled-components";

import Typography from "./Typography";
import { boardMapping } from "./NavBar";
import { colorMapping } from "./Typography";
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
  &:hover {
    background: ${colorMapping.bright_blue};
    & > div {
      color: white;
    }
  }

  & > div {
    color: ${(props) => (props.isActive ? "white" : "black")};
  }
`;

const SideBar = ({ board = "question", category = "EQ" , searchParams, setSearchParams }) => {
  // 나중에는 이 state를 props로 받아야 함.

  return (
    <SideBarWrapper>
      <BoardWrapper>
        <Typography size="h1">{boardMapping[board]}</Typography>
      </BoardWrapper>
      {Object.entries(SubjectMapping).map(([key, value]) => (
        <CategoryWrapper
          key={key}
          isActive={key === category}
          onClick={() => {
            searchParams.set('category', key);
	          setSearchParams(searchParams);
          }}
        >
          <Typography size="h3_medium">{value}</Typography>
        </CategoryWrapper>
      ))}
    </SideBarWrapper>
  );
};

export default SideBar;