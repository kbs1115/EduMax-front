import React, { useState } from "react";
import styled, { css } from "styled-components";
import { colorMapping } from "../Typography";
import Typography from "../Typography";
import { Link } from 'react-router-dom'; // Import Link

const ContainerWrapper = styled.div`
display: flex;
height: 290px;
padding: 1px;
flex-direction: column;
align-items: flex-start;
gap: 1px;
background: ${colorMapping.container};
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
  ${props => props.isSelected && css`
    background: #4A5BAB;
    color: white;
  `}
`;
const RightContainerItemWrapper = styled(Link)`
display: flex;
width: 169px;
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
  background: #4A5BAB;


  & > div {
    color: white;
  }
}

${props => props.isSelected && css`
  background: #4A5BAB;
  color: white;

  // Ensure the Typography component inside also changes color
  & > div {
    color: white;
  }
`}
`;

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
  transition: border-color 0.3s; 

  &:hover {
    border-bottom: 2px solid ${colorMapping.gray}; 
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
const sampleData = {
    국어: Array.from({ length: 5 }, (_, i) => ({
      content: `국어 Post ${i + 1}`,
      author: `Author ${i + 1}`,
      date: `2020-12-${i + 1}`,
      id: `1` 
    })),
    수학: Array.from({ length: 5 }, (_, i) => ({
      content: `수학 Post ${i + 1}`,
      author: `Author ${i + 1}`,
      date: `2020-12-${i + 1}`,
      id: `1` 
    })),
    영어: Array.from({ length: 5 }, (_, i) => ({
      content: `영어 Post ${i + 1}`,
      author: `Author ${i + 1}`,
      date: `2020-12-${i + 1}`,
      id: `1` 
    })),
    탐구: Array.from({ length: 5 }, (_, i) => ({
      content: `탐구 Post ${i + 1}`,
      author: `Author ${i + 1}`,
      date: `2020-12-${i + 1}`,
      id: `1` 
    })),
  };

const CategoryContainer = ({ onSelectCategory }) => {
    // Set the initial selected category to '국어'
    const [selectedCategory, setSelectedCategory] = useState('국어'); // Default to Korean
    const categories = Object.keys(sampleData);

    return (
        <ContainerWrapper>
            {categories.map(category => (
                <ContainerItemWrapper
                    key={category}
                    isSelected={selectedCategory === category} // This will apply the selected styles if true
                    onClick={() => {
                        setSelectedCategory(category);
                        onSelectCategory(category);
                    }}
                >
                    <Typography size="h3_medium" color={selectedCategory === category ? "white" : "black_gray"}>
                        {category}
                    </Typography>
                </ContainerItemWrapper>
            ))}
        </ContainerWrapper>
    );
};

const CategoryPostList = ({ category }) => (
    <ListWrapper>
      {sampleData[category].map((post, index) => (
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
              {post.date}
            </Typography>
          </AuthorWrapper>
        </PostItemWrapper>
      ))}
    </ListWrapper>
  );

const QuickMenu = () => {
    return (
        <ContainerWrapper>
            <RightContainerItemWrapper to={"/create-post"}>
                <Typography size="body_sub_title" color="black_gray">글쓰기</Typography>
            </RightContainerItemWrapper>
            <RightContainerItemWrapper to={"/mypage-posts"}>
                <Typography size="body_sub_title" color="black_gray">내가 쓴 게시물</Typography>
            </RightContainerItemWrapper>
            <RightContainerItemWrapper to={"/mypage-user"}>
                <Typography size="body_sub_title" color="black_gray">마이페이지</Typography>
            </RightContainerItemWrapper>
            <RightContainerItemWrapper to={"https://www.youtube.com/@sunggjun"}>
                <Typography size="body_sub_title" color="black_gray">유튜브 바로가기</Typography>
            </RightContainerItemWrapper>
        </ContainerWrapper>
    )
};

const BestVoteSubject = () => {
    const [selectedCategory, setSelectedCategory] = useState('국어');
    return (
        <BestVoteSubjectWrapper>
            <CategoryContainer onSelectCategory={setSelectedCategory} />
            <CategoryPostList category={selectedCategory} />
            <QuickMenu/>
        </BestVoteSubjectWrapper>
    );
};


export default BestVoteSubject;