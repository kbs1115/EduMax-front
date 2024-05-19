import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import { useQuery } from "react-query";

import { colorMapping } from "../Typography";
import Typography from "../Typography";
import AuthContext from "../../context/AuthProvider";
import { getPostData } from "../../apifetchers/fetcher";
import { categoryDict } from "../../pages/Home";


const CardWrapper = styled.div`
display: flex;
width: 370px;
height: 350px;
padding: 10px 0px;
flex-direction: column;
align-items: flex-start;
border-radius: 20px;
background: #FFFFFF;
box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
&:hover {
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`;

const TitleWrapper = styled.div`
display: flex;
padding: 10px 20px;
justify-content: center;
align-items: center;
gap: 10px;
`;
const ContentWrapper = styled(Link)`
Frame 264
display: flex;
padding: 10px 20px 10px 30px;
flex-direction: column;
align-items: center;
gap: 10px;
align-self: stretch;
text-decoration: none;
`;
const ItemWrapper = styled.div`
display: flex;
align-items: center;
align-self: stretch;
`;
const ContentItem = styled.div`
display: flex;
padding: 10px 0px;
align-items: center;
flex: 1 0 0;
`;

const AuthorItem = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
`;
const ContentTextBow = styled.div`
display: flex;
height: 20px;
flex-direction: column;
justify-content: center;
flex: 1 0 0;
`;
const AuthortextBox = styled.div`
display: flex;
padding: 0px 10px;
justify-content: center;
align-items: center;
gap: 10px;
`;

const DatetextBox = styled.div`
display: flex;
padding: 0px 10px;
justify-content: center;
align-items: center;
gap: 10px;
`;

const RowWrapper = styled.div`
display: flex;
padding: 100px 0px;
justify-content: center;
align-items: center;
align-content: center;
gap: 40px 30px;
align-self: stretch;
flex-wrap: wrap;
background : #F6F8FF;
`;

const ContentContainer = ({ date, author, content, id}) => {
    return (
        <ContentWrapper to={`post/${id}`}>
            <ItemWrapper>
                <ContentItem>
                    <ContentTextBow>
                        <Typography size="body_content_regular" color="black_gray">{content}</Typography>
                    </ContentTextBow>
                </ContentItem>
                <AuthorItem>
                    <AuthortextBox>
                        <Typography size="body_content_small" color="gray">{author}</Typography>
                    </AuthortextBox>
                    <DatetextBox>
                        <Typography size="body_content_small" color="gray">{date}</Typography>
                    </DatetextBox>
                </AuthorItem>
            </ItemWrapper>
        </ContentWrapper>
    )
};

const PostCard = ({ posts, title }) => {
    return (
        <CardWrapper>
            <TitleWrapper>
                <Typography size="h3_medium" color="black_gray">{title}</Typography>
            </TitleWrapper>
            {posts.map((post, index) => (
                <ContentContainer
                    key={index}
                    content={post.title}
                    author={post.author}
                    date={post.date}
                    id={post.id}
                />
            ))}
        </CardWrapper>
    );
};

const PostCards = () => {
    const best = useQuery(
        ['best_posts', 'AL'],
        () => getPostData('AL', "TOTAL", "", 1, "MOST_LIKE")
    );
    const notice = useQuery(
        ['best_posts', 'NO'],
        () => getPostData('NO', "TOTAL", "", 1, "MOST_LIKE")
    );
    const data = useQuery(
        ['best_posts', 'DA'],
        () => getPostData('DA', "TOTAL", "", 1, "MOST_LIKE")
    );

    if (best.isLoading || notice.isLoading || data.isLoading) return <></>;
    if (best.error || notice.error || data.error) return <RowWrapper>Data Fetching Error</RowWrapper>;

    return (
        <RowWrapper>
            <PostCard posts={best.data.data.post_list.slice(0, 5)} title="Best 추천글"/>
            <PostCard posts={notice.data.data.post_list.slice(0, 5)} title="공지사항"/>
            <PostCard posts={data.data.data.post_list.slice(0, 5)} title="자료게시판"/>
        </RowWrapper>
    )
}

export default PostCards;
