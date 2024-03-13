import { useState, React } from "react";
import styled from "styled-components";

import Typography from "./Typography";

export const boardMapping = {
  question: "질문게시판",
  data: "자료게시판",
  free: "자유게시판",
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
  &:hover {
    background-color: #91a5ff;
    cursor: pointer;
    & > div {
      color: white;
    }
  }
`;

const SideBar = ({ board = "question", category = "english" }) => {
  const [categoryState, setCategoryState] = useState(category);
  return (
    <SideBarWrapper>
      <BoardWrapper>
        <Typography size="h1">{boardMapping[board]}</Typography>
      </BoardWrapper>
      <CategoryWrapper>
        <Typography size="h3_medium">국어</Typography>
      </CategoryWrapper>
      <CategoryWrapper>
        <Typography size="h3_medium">수학</Typography>
      </CategoryWrapper>
      <CategoryWrapper>
        <Typography size="h3_medium">영어</Typography>
      </CategoryWrapper>
      <CategoryWrapper>
        <Typography size="h3_medium">탐구</Typography>
      </CategoryWrapper>
    </SideBarWrapper>
  );
};

export default SideBar;
