import React from "react";
import styled from "styled-components";
import { colorMapping } from "../Typography";
import Typography from "../Typography";
import { Link } from 'react-router-dom'; // Import Link


const CardWrapper = styled.div`
display: flex;
width: 370px;
padding: 10px 0px;
flex-direction: column;
align-items: flex-start;
border-radius: 20px;
background: #FFF;
box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
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
                    content={post.content}
                    author={post.author}
                    date={post.date}
                    id={post.id}
                />
            ))}
        </CardWrapper>
    );
};

const  Bestposts = [
    { content: "예시 내용1", author: "author1", date: "2020-08-26", id:'1'},
    { content: "예시 내용2", author: "author2", date: "2020-08-27", id:'2'},
    { content: "예시 내용3", author: "author3", date: "2020-08-28", id:'3'},
    { content: "예시 내용4", author: "author4", date: "2020-08-29", id:'4'},
    { content: "예시 내용5", author: "author5", date: "2020-08-30", id:'5' }
];
const  noticeposts = [
    { content: "예시 공지내용1", author: "author1", date: "2020-08-26", id:'1'},
    { content: "예시 공지내용1", author: "author2", date: "2020-08-27", id:'2'},
    { content: "예시 공지내용1", author: "author3", date: "2020-08-28", id:'3'},
    { content: "예시 공지내용1", author: "author4", date: "2020-08-29", id:'4'},
    { content: "예시 공지내용1", author: "author5", date: "2020-08-30", id:'5' }
];
const  dataposts = [
    { content: "예시 자료", author: "author1", date: "2020-08-26", id:'1'},
    { content: "예시 자료", author: "author2", date: "2020-08-27", id:'2'},
    { content: "예시 자료", author: "author3", date: "2020-08-28", id:'3'},
    { content: "예시 자료", author: "author4", date: "2020-08-29", id:'4'},
    { content: "예시 자료", author: "author5", date: "2020-08-30", id:'5' }
];

const PostCardsRow = () => {
    return (
        <RowWrapper>
            <PostCard posts={Bestposts} title="Best 추천글"/>
            <PostCard posts={noticeposts} title="공지사항"/>
            <PostCard posts={dataposts} title="자료게시판"/>
        </RowWrapper>
    )
}

export default PostCardsRow;
