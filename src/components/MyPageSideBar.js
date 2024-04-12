import React, { useState } from "react";
import styled from "styled-components";

import Typography from "./Typography";

export const mypageMapping = {
    info: "회원정보",
    posts: "내가 쓴 글",
    comments: "내가 쓴 댓글",
    likes: "내가 추천한 글",
};
  
const MyPageSideBar = ({ 
    category, 
    setPage,
    setCategory 
}) => {
    // 나중에는 이 state를 props로 받아야 함.
  
    return (
      <SideBarWrapper>
        <BoardWrapper>
          <Typography size="h1">마이페이지</Typography>
        </BoardWrapper>
        {Object.entries(mypageMapping).map(([key, value]) => (
          <CategoryWrapper
            key={key}
            isActive={key === category}
            onClick={() => {
              setCategory(key);
              setPage(1);
            }}
          >
            <Typography size="h3_medium">{value}</Typography>
          </CategoryWrapper>
        ))}
      </SideBarWrapper>
    );
  };
  
  export default MyPageSideBar;

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
  height: 40px;
  padding: 0px 8px;
  align-items: center;
  align-self: stretch;
  background-color: ${(props) => (props.isActive ? "#91A5FF" : "transparent")};
  cursor: pointer;

  & > div {
    color: ${(props) => (props.isActive ? "white" : "black")};
  }
`;