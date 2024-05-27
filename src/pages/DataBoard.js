import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from "react-router-dom";

import PostListButton from "../components/buttons/PostListButton";
import PostTable from "../components/post/PostTable";
import PostOrder from "../components/post/PostOrder";
import PostSearchBar from "../components/post/PostSearchBar";
import PostDropDown from "../components/post/PostDropdown";
import { getPostData } from "../apifetchers/fetcher";
import Typography from "../components/Typography";
import { boardMapping } from "../components/NavBar";

export const SubjectMapping = {
    KD: "국어",
    MD: "수학",
    ED: "영어",
    TD: "탐구",
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
  
  const SideBar = ({ board = "data", category = "ED" , setSearchParams, searchParams }) => {
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

function DataBoard() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ED, KD, MD, TD
  const category = searchParams.get('category') || 'ED';
  const [page, setPage] = useState(1);

  // created_at or MOST_LIKE
  const [order, setOrder] = useState("created_at")

  // AUTHOR, TITLE, CONTENT, TOTAL
  const [searchOption, setSearchOption] = useState("TOTAL")
  const [searchWord, setSearchWord] = useState("")

  const { data, error, isLoading } = useQuery(
    ['posts', category, page, order, searchWord],
    () => getPostData(category, searchOption, searchWord, page, order),
    {
      onSuccess: (data) => {
        // 데이터 로드 성공 시 콘솔에 데이터 출력
        console.log('Fetched data:', data);
      },
      onError: (error) => {
        // 에러 발생 시 콘솔에 에러 메시지 출력
        console.error('Error fetching data:', error);
      }
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Wrapper>
      <SideBar 
        setPage={setPage} 
        category={category} 
        setSearchParams={setSearchParams}
        searchParams={searchParams}/>
      <BodyOuterWrapper>
        <Typography size="h1">
          자료게시판 / {category === "KD" ? '국어' : category === "MD" ? '수학' : category === "ED" ? "영어" : "탐구"}
        </Typography>
        <BodyInnerWrapper>
          <InnerMenuWrapper>
            <PostOrder order={order} setOrder={setOrder}/>
            <InnerRightWrapper>
              <PostDropDown 
                searchOption={searchOption} 
                setSearchOption={setSearchOption}/>
              <PostSearchBar 
                searchWord={searchWord}
                setSearchWord={setSearchWord}
                setPage={setPage}/>
            </InnerRightWrapper>
            <PostListButton 
              width="92px" 
              height="43px" 
              size="body_content_bold" 
              buttonColor="#4C6BFF" 
              textColor="white"
            >
              글쓰기
            </PostListButton>
          </InnerMenuWrapper>
          <PostTable page={page} setPage={setPage} data={data}/>
        </BodyInnerWrapper>
      </BodyOuterWrapper>
    </Wrapper>  
  );
}

export default DataBoard;


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
  align-items: flex-start;
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
