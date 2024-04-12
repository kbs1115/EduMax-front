import React, { useState } from "react";
import styled from "styled-components";
import Typography from "../Typography";
import PostListButton from "../buttons/PostListButton";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
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
  background-color: #F3F4F8;
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

// PostTable component
const PostTable = ({page, setPage, itemNum = 10}) => {
  return (
    <>
      <Wrapper>
        <StyledTable>
          <StyledHead>
            <StyledRow>
              <StyledCell width="70px">
                <Typography size="body_sub_title">번호</Typography>
              </StyledCell>
              <StyledCell width="460px">
                <Typography size="body_sub_title">제목</Typography>
              </StyledCell>
              <StyledCell width="115px">
                <Typography size="body_sub_title">글쓴이</Typography>
              </StyledCell>
              <StyledCell width="165px">
                <Typography size="body_sub_title">등록일</Typography>
              </StyledCell>
              <StyledCell width="80px">
                <Typography size="body_sub_title">추천</Typography>
              </StyledCell>
            </StyledRow>
          </StyledHead>
          <StyledBody>
            <StyledRow>
              <NumCell>
                <PostListButton width="50px" 
                height="30px" 
                buttonColor="#4B4F59"
                textColor="white"
                size="body_content_medium">공지</PostListButton>
              </NumCell>
              <SubjectCell>
                <StyledLink><Typography size="body_content_thin">공지사항1입니다</Typography></StyledLink>
              </SubjectCell>
              <StyledCell>
                <Typography size="body_content_thin" color="#A8AAAE">윤규민</Typography>
              </StyledCell>
              <StyledCell>
                <Typography size="body_content_thin" color="#A8AAAE">2024-03-18</Typography>
              </StyledCell>
              <StyledCell>
                <Typography size="body_content_thin" color="#A8AAAE">13</Typography>
              </StyledCell>
            </StyledRow>
            {/* undefined array 대신에 data array가 들어가면 된다. setData를 써야할듯? */}
            {[...Array(itemNum)].map((_, index) => (
              <StyledRow key={index}>
                <NumCell>
                  <Typography size="body_content_medium" color="#393E46">{page * 10 + index - 9}</Typography>
                </NumCell>
                <SubjectCell>
                  <StyledLink to="/some-path">
                    <Typography size="body_content_thin">공지사항{page * 10 + index - 9}입니다</Typography>
                  </StyledLink>
                </SubjectCell>
                <StyledCell>
                <Typography size="body_content_thin" color="#A8AAAE">윤규민</Typography>
              </StyledCell>
              <StyledCell>
                <Typography size="body_content_thin" color="#A8AAAE">2024-03-18</Typography>
              </StyledCell>
              <StyledCell>
                <Typography size="body_content_thin" color="#A8AAAE">13</Typography>
              </StyledCell>
                {/* Additional cells */}
              </StyledRow>
            ))}
          </StyledBody>
        </StyledTable>
        <PaginationWrapper>
          {[...Array(10)].map((_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber >= page - 2 &&
              pageNumber <= page + 2
            ) {
              return (
                <PageNumber key={pageNumber} onClick={() => setPage(pageNumber)}>
                  <Typography
                    size="h3_medium"
                    color={pageNumber === page ? 'black' : '#A8AAAE'}>
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

export default PostTable;
