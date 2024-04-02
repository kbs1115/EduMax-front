import React, { useEffect } from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import { useParams, Navigate } from "react-router-dom";
import PostContainer from "../components/PostDetail/PostContainer";
import CommentsContainer from "../components/PostDetail/CommentsContainer";


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
        // Redirect to a different page or render an error message
        return <Navigate to="/" />;
    }

    return (
        <MainWrapper>
            <SideBar/>  
            <MainContainer>
                <PostContainer/>
                <CommentsContainer/>
            </MainContainer>
        </MainWrapper>

    )
};
export default PostDetailPage;