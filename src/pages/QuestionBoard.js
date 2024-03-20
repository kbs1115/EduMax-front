import React from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import PostListButton from "../components/buttons/PostListButton";
import PostTable from "../components/PostTable";
import PostOrder from "../components/PostOrder";
import PostSearchBar from "../components/PostSearchBar";
import PostDropDown from "../components/PostDropdown";

const Wrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const BodyOuterWrapper = styled.div`
  width: 920px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const BodyInnerWrapper = styled.div`
  margin-top: 10px;
  border-top: 2px solid #393E46;
  padding: 30px 0;
`;

const InnerMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const InnerRightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

function QuestionBoard() {
  return (
    <Wrapper>
      <SideBar />
      <BodyOuterWrapper>
        <PostListButton 
          width="98px" 
          height="43px" 
          size="body_content_medium" 
          buttonColor="#4A5BAB" 
          textColor="white"
        >
          글쓰기
        </PostListButton>
        <BodyInnerWrapper>
          <InnerMenuWrapper>
            <PostOrder />
            <InnerRightWrapper>
              <PostDropDown />
              <PostSearchBar />
            </InnerRightWrapper>
          </InnerMenuWrapper>
          <PostTable />
        </BodyInnerWrapper>
      </BodyOuterWrapper>
    </Wrapper>  
  );
}

export default QuestionBoard;
