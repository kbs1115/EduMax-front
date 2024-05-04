import React from "react";
import { useState } from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import PostListButton from "../components/buttons/PostListButton";
import PostTable from "../components/post/PostTable";
import PostOrder from "../components/post/PostOrder";
import PostSearchBar from "../components/post/PostSearchBar";
import PostDropDown from "../components/post/PostDropdown";


function QuestionBoard() {
  // EQ, KQ, MQ, TQ
  const [category, setCategory] = useState("EQ")
  const [page, setPage] = useState(1);

  // created_at or MOST_LIKE
  const [order, setOrder] = useState("created_at")

  // AUTHOR, TITLE, CONTENT, TOTAL
  const [searchOption, setSearchOption] = useState("TOTAL")
  const [searchWord, setSearchWord] = useState("")

  return (
    <Wrapper>
      <SideBar 
        setPage={setPage} 
        category={category} 
        setCategory={setCategory}
        board="question"/>
      <BodyOuterWrapper>
        <PostListButton 
          width="92px" 
          height="43px" 
          size="body_content_bold" 
          buttonColor="#4C6BFF" 
          textColor="white"
        >
          글쓰기
        </PostListButton>
        <BodyInnerWrapper>
          <InnerMenuWrapper>
            <PostOrder order={order} setOrder={setOrder}/>
            <InnerRightWrapper>
              <PostDropDown 
                searchOption={searchOption} 
                setSearchOption={setSearchOption}/>
              <PostSearchBar 
                searchWord={searchWord}
                setSearchWord={setSearchWord}/>
            </InnerRightWrapper>
          </InnerMenuWrapper>
          <PostTable page={page} setPage={setPage}/>
        </BodyInnerWrapper>
      </BodyOuterWrapper>
    </Wrapper>  
  );
}

export default QuestionBoard;


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
