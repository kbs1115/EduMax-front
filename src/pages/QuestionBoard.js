import React, { useEffect, useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from "react-router-dom";

import AuthContext from "../context/AuthProvider";
import SideBar from "../components/SideBar";
import PostListButton from "../components/buttons/PostListButton";
import PostTable from "../components/post/PostTable";
import PostOrder from "../components/post/PostOrder";
import PostSearchBar from "../components/post/PostSearchBar";
import PostDropDown from "../components/post/PostDropdown";
import { getPostData } from "../apifetchers/fetcher";
import LoadingSpinner from "../components/spinner";
import Typography from "../components/Typography";

function QuestionBoard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // EQ, KQ, MQ, TQ
  const category = searchParams.get('category') || 'EQ';
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
        if (error.response.status === 401){
          alert("로그인이 필요합니다. 로그인을 진행해 주세요")
          logout();
          navigate("/login")
        }
      }
    }
  );

  if (isLoading) return <LoadingSpinner/>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Wrapper>
      <SideBar 
        setPage={setPage} 
        category={category} 
        searchParams={searchParams}
        setSearchParams={setSearchParams}/>
      <BodyOuterWrapper>
        <Typography size="h1">
          질문게시판 / {category === "KQ" ? '국어' : category === "MQ" ? '수학' : category === "EQ" ? "영어" : "탐구"}
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
              <PostListButton 
                width="92px" 
                height="43px" 
                size="body_content_bold" 
                buttonColor="#4C6BFF" 
                textColor="white"
              >
                글쓰기
              </PostListButton>
            </InnerRightWrapper>
          </InnerMenuWrapper>
          <PostTable page={page} setPage={setPage} data={data}/>
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
  padding-top: 21px;
  padding-bottom: 80px;
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
