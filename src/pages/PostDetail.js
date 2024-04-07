import React, { useEffect } from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import { useParams, Navigate } from "react-router-dom";
import PostContainer from "../components/PostDetail/PostContainer";
import CommentsContainer from "../components/PostDetail/CommentsContainer";
import { ResponsePostData1, ResponsePostData3, ResponsePostData2,CommentsList } from "../TestData/TestPostDetail";

const MainWrapper = styled.div`
display: flex;
justify-content: center;
align-items: flex-start;
gap: 50px;
align-self: stretch;
margin-top: 60px;
`

const MainContainer = styled.div`
display: flex;
width: 923px;
padding-bottom: 34px;
flex-direction: column;
align-items: center;
gap: 10px;
border-top: 2px solid #393E46;
`

function PostDetailPage() {

    // 라우터로부터 postId 추출
    const { postId } = useParams();
    
    // 최상단위치에서 페이지 시작
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // post_id가 1이상의 정수가 아닐시 돌려보냄
    if (isNaN(postId) || parseInt(postId) < 1) {
        return <Navigate to="/" />;
    }

    // 테스트 데이터 매핑
    const { files, likes, title, html_content, created_at, modified_at, category, author, views } = ResponsePostData1;

    // Mapping likes to voter_nicknames
    const voter_nicknames = likes.map(like => like.user);

    // Using the extracted and mapped data as props for PostContainer
    return (
        <MainWrapper>
            <SideBar/>  
            <MainContainer>
                <PostContainer
                    category={category}
                    title={title}
                    user_nickname="danny" // 로그인한 사용자 이름
                    author={author} // 글쓴이
                    modified_date={modified_at}
                    views={views}
                    filesdata={files} // Mapping files to filesdata
                    html_content={html_content}
                    voter_nicknames={voter_nicknames} // Mapped from likes
                />
                <CommentsContainer comments_list={CommentsList}/>
            </MainContainer>
        </MainWrapper>
    );
}
export default PostDetailPage;