import React, { useState } from "react";
import styled from "styled-components";
import Typography from "../Typography";
import PostListButton from "../buttons/PostListButton";
import { Link, useNavigate } from "react-router-dom";

import wordIcon from "../../assets/word_icon.PNG";
import likeIcon from "../../assets/goodIcon.PNG"


export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

const PostItem = ({post_data, isNotice = false, isComment}) => {
  const navigate = useNavigate();

  return (<PostItemWrapper onClick={() => navigate(`/post/${isComment ? post_data.post_id : post_data.id}`)}>
    <PostItemBody>
        <Typography 
          color="black" 
          size="body_content_medium"
          style={{ display: "flex",flexDirection: "row" ,gap: "10px", alignItems: "center"}}>
          {isNotice ? <PostListButton width="50px" 
            height="30px" 
            buttonColor="#4D4E52"
            textColor="white"
            size="body_content_medium">공지</PostListButton> : <></>}
          {isComment ? post_data.post_title : post_data.title}
        </Typography>
      <Typography color="gray" size="body_content_small">{post_data.content}</Typography>
    </PostItemBody>
    <div style={{ width: "100%", display: "flex",flexDirection: "row", justifyContent: "space-between"}}>
      <div style={{ display: "flex",flexDirection: "row", gap: "10px"}}>
        <Typography color="gray" size="body_content_small">{post_data.author}</Typography>
        <Typography color="gray" size="body_content_small">{formatDate(post_data.created_at)}</Typography>
      </div>
      <div style={{ display: "flex",flexDirection: "row", gap: "10px"}}>
        <div style={{ display: "flex",flexDirection: "row", gap: "5px", alignItems: 'center', paddingBottom: '2px'}}>
          <img src={likeIcon} width={15}/>
          <Typography color="bright_black_gray" size="body_content_small">{post_data.likes_count}</Typography>
        </div>
        {!isComment && <div style={{ display: "flex",flexDirection: "row", gap: "5px", alignItems: 'center'}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="13" viewBox="0 0 17 13" fill="none">
            <path d="M8.56 0.500244C3.5 0.500244 0.5 6.50024 0.5 6.50024C0.5 6.50024 3.5 12.5002 8.56 12.5002C13.5 12.5002 16.5 6.50024 16.5 6.50024C16.5 6.50024 13.5 0.500244 8.56 0.500244ZM8.5 2.50024C10.72 2.50024 12.5 4.30024 12.5 6.50024C12.5 8.72024 10.72 10.5002 8.5 10.5002C6.3 10.5002 4.5 8.72024 4.5 6.50024C4.5 4.30024 6.3 2.50024 8.5 2.50024ZM8.5 4.50024C7.4 4.50024 6.5 5.40024 6.5 6.50024C6.5 7.60024 7.4 8.50024 8.5 8.50024C9.6 8.50024 10.5 7.60024 10.5 6.50024C10.5 6.30024 10.42 6.12024 10.38 5.94024C10.22 6.26024 9.9 6.50024 9.5 6.50024C8.94 6.50024 8.5 6.06024 8.5 5.50024C8.5 5.10024 8.74 4.78024 9.06 4.62024C8.88 4.56024 8.7 4.50024 8.5 4.50024Z" fill="#A8AAAE"/>
          </svg> 
          <Typography color="bright_black_gray" size="body_content_small">{post_data.views}</Typography>
        </div>}
        {!isComment && <div style={{ display: "flex",flexDirection: "row", gap: "5px", alignItems: 'center', paddingTop: '1px'}}>
          <img src={wordIcon} width={15}/>
          <Typography color="bright_black_gray" size="body_content_small">{post_data.comments_count}</Typography>
        </div>}
      </div>
    </div>
  </PostItemWrapper>);
}

// PostTable component
const PostTable = ({page, setPage, isComment, data }) => {
  const post_list = isComment ? data.data.comment_list : data.data.post_list
  
  return (
    <>
      <Wrapper>
        {<div style={{ width: '100%', display: 'flex', flexDirection: 'column'}}>
          {post_list.map((post, index) => (post && <PostItem post_data={post} isComment={isComment}/>))}
        </div>}
        <PaginationWrapper>
          {[...Array(data.data.total_page_count)].map((_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber >= page - 2 &&
              pageNumber <= page + 2
            ) {
              return (
                <PageNumber key={pageNumber} onClick={() => setPage(pageNumber)}>
                  <Typography
                    size="h3_medium"
                    color={pageNumber === page ? 'black_gray' : 'gray'}>
                    {pageNumber}
                  </Typography>
                </PageNumber>
              );
            }
            return null;
          })}
        </PaginationWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 920px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledTable = styled.table`
  width: 920px;
  text-align: center;
  border-collapse: collapse;
`;

const StyledHead = styled.thead`
  background-color: #F7F7F8;
  height: 55px;
  border-top: 1px solid #393E46;
  border-bottom: 1px solid #DFE5EE;
`;

const StyledBody = styled.tbody`
  height: 55px;
`;

const StyledRow = styled.tr`
  border-bottom: 1px solid #DFE5EE;
`;

const StyledCell = styled.td`
  height: 55px;
`;

const NumCell = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
`;

const SubjectCell = styled.td`
  text-align: start;
  padding-left: 20px;
  height: 55px;
`;

const StyledLink = styled(Link)`
  text-decoration: none; // 링크의 밑줄 제거
  color: inherit; // 부모 요소의 글자 색상 상속
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.div`
  margin: 0 16px;
  transition: background-color 0.3s ease;
  cursor: pointer;
`;

const PostItemWrapper = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;
  border-bottom: 1px solid #B6C0D5;
  cursor: pointer;
  &:hover {
    background: rgba(168, 170, 174, 0.05);
  }
`;

const PostItemBody = styled.div`
  display: flex;
  width: 100%;
  padding: 10px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

export default PostTable;
