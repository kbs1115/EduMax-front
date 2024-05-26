import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import { useParams, Navigate } from "react-router-dom";
import PostContainer from "../components/PostDetail/PostContainer";
import CommentsContainer from "../components/PostDetail/CommentsContainer";
import { getPostDetailData, getCommentsData } from "../apifetchers/fetcher";
import AuthContext from "../context/AuthProvider";
import { ChildCommentsList, CommentsList } from "../TestData/TestPostDetail";
import LoadingSpinner from "../components/spinner";
import Typography from "../components/Typography";
import { boardMapping } from "../components/NavBar";


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

function isSecondCharQ(str) {
  if (str[1] === 'Q')
    return "질문게시판"
  else if (str[1] === 'D')
    return "자료게시판"
  else
    return undefined
}

const DetailSideBar = ({ board, category }) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  const QuestionSubjectMapping = {
    KQ: "국어",
    MQ: "수학",
    EQ: "영어",
    TQ: "탐구",
  };

  const DataSubjectMapping = {
    KD: "국어",
    MD: "수학",
    ED: "영어",
    TD: "탐구",
  };

  return (
    <SideBarWrapper>
      <BoardWrapper>
        <Typography size="h1">{board}</Typography>
      </BoardWrapper>
      {board === "질문게시판" ? Object.entries(QuestionSubjectMapping).map(([key, value]) => (
        <CategoryWrapper
          key={key}
          isActive={key === category}
          onClick={() => {
            navigate(`/post/question?category=${key}`)
          }}
        >
          <Typography size="h3_medium">{value}</Typography>
        </CategoryWrapper>
      )) : Object.entries(DataSubjectMapping).map(([key, value]) => (
        <CategoryWrapper
          key={key}
          isActive={key === category}
          onClick={() => {
            navigate(`/post/data?category=${key}`)
          }}
        >
          <Typography size="h3_medium">{value}</Typography>
        </CategoryWrapper>
      ))}
    </SideBarWrapper>
  );
};

function PostDetailPage() {

    const auth = useContext(AuthContext);
    const [postData, setPostData] = useState(null);
    const [commentsData, setCommentsData] = useState([]);
    // 라우터로부터 postId 추출
    const { postId } = useParams();

    async function fetchData() {
        try {
            const postDetails = await getPostDetailData(postId);
            const comments = await getCommentsData(postId);
            setPostData(postDetails.data);
            setCommentsData(comments.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!isNaN(postId) && parseInt(postId) >= 1) {
            fetchData();
        }
    }, [postId]); // postId가 변경될 때마다 fetchData를 호출



    // Update comments function
    const updateComments = (newComment) => {
        setCommentsData(prevComments => [...prevComments, newComment]);
    };

    if (!postData) {
        return <LoadingSpinner />;
    }


    // post_id가 1이상의 정수가 아닐시 돌려보냄
    if (isNaN(postId) || parseInt(postId) < 1) {
        return <Navigate to="/" />;
    }

    // 데이터 매핑
    const {id, files, likes, title, html_content, created_at, modified_at, category, author, views } = postData;

    // Mapping likes to voter_nicknames
    const voter_nicknames = likes.map(like => like.user);
    // Using the extracted and mapped data as props for PostContainer
    return (
        <MainWrapper>
            {isSecondCharQ(category) && <DetailSideBar board={isSecondCharQ(category)} category={category}/>}
            <MainContainer>
                <PostContainer
                    post_id={id}
                    category={category}
                    title={title}
                    user_nickname={auth.isAuthenticated ? auth.username : ""} // 로그인 상태에 따라 닉네임 설정
                    author={author} // 글쓴이
                    modified_date={modified_at}
                    views={views}
                    filesdata={files} // Mapping files to filesdata 
                    html_content={html_content}
                    voter_nicknames={voter_nicknames} // Mapped from likes
                />
                <CommentsContainer
                    comments_list={commentsData}
                    updateComments={updateComments}
                    user_nickname={auth.isAuthenticated ? auth.username : ""}
                    postId={postId}     
                />
            </MainContainer>
        </MainWrapper>
    );
}
export default PostDetailPage;