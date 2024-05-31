import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { useQuery } from 'react-query';
import { useNavigate } from "react-router-dom";
import PostListButton from "../components/buttons/PostListButton";
import PostTable from "../components/post/PostTable";
import PostOrder from "../components/post/PostOrder";
import PostSearchBar from "../components/post/PostSearchBar";
import PostDropDown from "../components/post/PostDropdown";
import { getPostData } from "../apifetchers/fetcher";
import Typography from "../components/Typography";
import { boardMapping } from "../components/NavBar";


function FreeBoard() {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // created_at or MOST_LIKE
  const [order, setOrder] = useState("created_at")

  // AUTHOR, TITLE, CONTENT, TOTAL
  const [searchOption, setSearchOption] = useState("TOTAL")
  const [searchWord, setSearchWord] = useState("")

  const { data, error, isLoading } = useQuery(
    ['posts', 'FR', page, order, searchWord],
    () => getPostData('FR', searchOption, searchWord, page, order),
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
      <BodyOuterWrapper>
        <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Typography size="h1">자유게시판</Typography>
        </div>
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
                onClick={() => navigate('/create-post')}
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

export default FreeBoard;


const Wrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const BodyOuterWrapper = styled.div`
  padding-top: 21px;
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
