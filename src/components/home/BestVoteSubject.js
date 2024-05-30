import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import { useQuery } from "react-query";

import { colorMapping } from "../Typography";
import Typography from "../Typography";
import { categoryDict } from "../../pages/Home";
import AuthContext from "../../context/AuthProvider";
import { getPostData } from "../../apifetchers/fetcher";


const ContainerWrapper = styled.div`
display: flex;
height: 290px;
padding: 1px;
flex-direction: column;
align-items: flex-start;
gap: 1px;
border-radius: 15px;
border: 1px solid ${colorMapping.container};
box-shadow: 0px 2px 2px 0px rgba(0.15, 0.15, 0.15, 0.15);
`;
const SubjectContainerWrapper = styled.div`
display: flex;
height: 290px;
padding: 1px;
flex-direction: column;
align-items: flex-start;
gap: 1px;
border-radius: 15px;
border: 1px solid ${colorMapping.container};
&:hover {
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
}

`;

const ContainerItemWrapper = styled.div`
  display: flex;
  width: 169px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  background: #FFF;
  cursor: pointer;
  border-radius: 15px;
  transition: background-color 0.3s, color 0.3s; // Add transition for smooth changes
  ${props => props.isSelected && css`
    background: ${colorMapping.bright_blue};
    color: white;
  `}
`;
const RightContainerItemWrapper = styled(Link)`
display: flex;
width: 170px;
justify-content: center;
align-items: center;
gap: 10px;
flex: 1 0 0;
background: #FFF;
cursor: pointer;
transition: background-color 0.3s; // Smooth transition for background
text-decoration: none;
// Apply hover styles to the container
&:hover {
  background: ${colorMapping.bright_blue};
  & > div {
    color: white;
  }
}
`
const PostCreateItemWrapper  = styled(Link)`
display: flex;
width: 170px;
justify-content: center;
border-radius: 15px 15px 0px 0px;
align-items: center;
gap: 10px;
flex: 1 0 0;
background: #FFF;
cursor: pointer;
transition: background-color 0.3s; // Smooth transition for background
text-decoration: none;
// Apply hover styles to the container
&:hover {
  background: ${colorMapping.bright_blue};
  & > div {
    color: white;
  }
}
`
const YouTubeGoItemWrapper  = styled(Link)`
display: flex;
width: 170px;
justify-content: center;
align-items: center;
border-radius:  0px 0px 15px 15px;
gap: 10px;
flex: 1 0 0;
background: #FFF;
cursor: pointer;
transition: background-color 0.3s; // Smooth transition for background
text-decoration: none;
// Apply hover styles to the container
&:hover {
  background: ${colorMapping.bright_blue};
  & > div {
    color: white;
  }
}
`
const AuthorWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;

`;
const ContentWrapper = styled(Link)`
display: flex;
width: 660px;
align-items: center;
gap: 10px;
flex-shrink: 0;
text-decoration: none;
`;

const PostItemWrapper = styled.div`
  display: flex;
  width: 743px;
  height: 57.5px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${colorMapping.container};
  transition: border-color 0.5s, transform 0.5s, opacity 0.5s; // Add transition for border-color, transform, and opacity

  &:hover {
    border-bottom: 1px solid ${colorMapping.black_gray}; 
  }

  &.fade-enter {
    opacity: 0;
    transform: translateY(-10px);
  }
  &.fade-enter-active {
    opacity: 1;
    transform: translateY(0);
  }
  &.fade-exit {
    opacity: 1;
    transform: translateY(0);
  }
  &.fade-exit-active {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const ListWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
`;


const BestVoteSubjectWrapper = styled.div`
display: flex;
width: 1170px;
justify-content: space-between;
align-items: flex-start;
padding: 100px 0px;
`

const CategoryContainer = ({ selectedCategory, setSelectedCategory }) => {
    const categories = Object.keys(categoryDict);

    return (
        <SubjectContainerWrapper>
            {categories.map(category => (
                <ContainerItemWrapper
                    key={category}
                    isSelected={selectedCategory === category} // This will apply the selected styles if true
                    onClick={() => setSelectedCategory(category)}
                >
                    <Typography size="h3_medium" color={selectedCategory === category ? "white" : "black_gray"}>
                        {category}
                    </Typography>
                </ContainerItemWrapper>
            ))}
        </SubjectContainerWrapper>
    );
};

const CategoryPostList = ({ post_list, category }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
  
  return (
    <ListWrapper>
      {post_list ? (
        post_list.slice(0, 5).map((post, index) => (
          <PostItemWrapper key={index}>
            <ContentWrapper to={`/post/${post.id}`}>
              <Typography size="body_content_regular" color="black_gray">
                {post.content}
              </Typography>
            </ContentWrapper>
            <AuthorWrapper>
              <Typography size="body_content_small" color="gray">
                {post.author}
              </Typography>
              <Typography size="body_content_small" color="gray">
                {formatDate(post.created_at)}
              </Typography>
            </AuthorWrapper>
          </PostItemWrapper>
        ))
      ) : (
        <Typography size="body_content_regular" color="gray">
          No posts available.
        </Typography>
      )}
    </ListWrapper>
  );
}


const QuickMenu = () => {
    return (
        <ContainerWrapper>
            <PostCreateItemWrapper to={"/create-post"}>
                <Typography size="body_sub_title" color="black_gray">글쓰기</Typography>
            </PostCreateItemWrapper>
            <RightContainerItemWrapper to={"/mypage-posts"}>
                <Typography size="body_sub_title" color="black_gray">내가 쓴 게시물</Typography>
            </RightContainerItemWrapper>
            <RightContainerItemWrapper to={"/mypage-user"}>
                <Typography size="body_sub_title" color="black_gray">마이페이지</Typography>
            </RightContainerItemWrapper>
            <YouTubeGoItemWrapper to={"https://www.youtube.com/@sunggjun"}>
                <Typography size="body_sub_title" color="black_gray">유튜브 바로가기</Typography>
            </YouTubeGoItemWrapper>
        </ContainerWrapper>
    )
};

const BestVoteSubject = () => {
  const [selectedCategory, setSelectedCategory] = useState('국어');

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate()
  
  const { data, error, isLoading } = useQuery(
    ['home_posts', categoryDict[selectedCategory]],
    () => getPostData(categoryDict[selectedCategory], "TOTAL", "", 1, "created_at"),
    {
      onSuccess: (data) => {
        // 데이터 로드 성공 시 콘솔에 데이터 출력
        console.log('Fetched data:', data.data.post_list.length);
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

  if (isLoading) return <></>;
  if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <BestVoteSubjectWrapper>
            <CategoryContainer 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory} />
            <CategoryPostList 
              post_list={data.data.post_list}
              category={selectedCategory} />
            <QuickMenu/>
        </BestVoteSubjectWrapper>
    );
};


export default BestVoteSubject;