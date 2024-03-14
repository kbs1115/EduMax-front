import React, { useState } from "react";
import styled from "styled-components";

import Typography from "./Typography";
import { boardMapping } from "./NavBar";

export const SubjectMapping = {
  korean: "국어",
  math: "수학",
  english: "영어",
  etc: "탐구",
};

const SideBarWrapper = styled.div`
  display: flex;
  width: 200px;
  padding: 20px 0px;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  border-top: 2px solid #393e46;
  border-bottom: 2px solid #393e46;
`;

const BoardWrapper = styled.div`
  display: flex;
  height: 53px;
  padding: 0px 5px 10px 5px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-bottom: 1px solid #dfe5ee;
`;

const CategoryWrapper = styled.div`
  display: flex;
  height: 35px;
  padding: 0px 10px;
  align-items: center;
  align-self: stretch;
  background-color: ${(props) => (props.isActive ? "#91a5ff" : "transparent")};
  cursor: pointer;

  & > div {
    color: ${(props) => (props.isActive ? "white" : "black")};
  }
`;

const SideBar = ({ board = "question", category = "english" }) => {
  // 나중에는 이 state를 props로 받아야 함.
  const [activeCategory, setActiveCategory] = useState(category);

  return (
    <SideBarWrapper>
      <BoardWrapper>
        <Typography size="h1">{boardMapping[board]}</Typography>
      </BoardWrapper>
      {Object.entries(SubjectMapping).map(([key, value]) => (
        <CategoryWrapper
          key={key}
          isActive={key === activeCategory}
          onClick={() => setActiveCategory(key)}
        >
          <Typography size="h3_medium">{value}</Typography>
        </CategoryWrapper>
      ))}
    </SideBarWrapper>
  );
};

export default SideBar;
