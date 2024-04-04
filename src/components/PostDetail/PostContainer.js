import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { colorMapping } from "../Typography";
import Typography from "../Typography";
import homeIcon from "../../assets/homeIcon.png"
import viewsIcon from "../../assets/viewsIcon.png"
import file_downloadIcon from "../../assets/file_downloadIcon.png"
import file_image from "../../assets/file_image.png"
import PostVoteButton from "../buttons/PostVoteButton";
import PostLinkShareButton from "../buttons/PostLinkShareButton";
import PostDeleteButton from "../buttons/PostDeleteButton";
import PostModifyButton from "../buttons/PostModifyButton";
import ListButtons from "../buttons/ListButtons";

const PostWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 5px;
align-self: stretch;
`;
const CategoryWrapper = styled.div`
display: flex;
padding: 30px 0px 10px 5px;
align-items: center;
align-self: stretch;
border-bottom: 1px solid ${colorMapping.container}
`;
const CategoryContainer = styled(Link)`
display: flex;
align-items: center;
gap: 10px;
text-decoration: none;
`;

const HomeIconImage = styled.img`
width: 18px;
height: 18px;
`;

const PostTitleWrapper = styled.div`
display: flex;
padding: 10px 0 10px 5px;
align-items: center;
align-self: stretch;
border-bottom: 1px solid ${colorMapping.black_gray};

`

const AuthorAndViewerWrapper = styled.div`
display: flex;
padding: 10px;
justify-content: space-between;
align-items: center;
align-self: stretch;
border-bottom: 1px solid ${colorMapping.container};
`
const AuthorAndDateContainer = styled.div`
display: flex;
width: 349px;
padding-right: 10px;
align-items: center;
gap: 10px;
`;

const ViewsContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 8px;
`
const ViewIconWrapper = styled.img`
width: 25px;
height: 18px;
`

const FilesWrapper = styled.div`
display: flex;
padding: 20px 10px 10px 10px;
flex-direction: column;
align-items: flex-start;
gap: 10px;
align-self: stretch;
`

const FileContainer = styled.div`
display: flex;
padding: 10px;
align-items: center;
gap: 15px;
align-self: stretch;
border-radius: 5px;
border: 1px solid #B6C0D5;
`

const FileIconWrapper = styled.img`
width: 18px;
height: 18px;
`;

const FileDownLoadWrapper = styled.img`
width: 25px;
height: 25px;
`
const FilenameWrapper = styled(Typography)`
overflow: hidden;
color: ${colorMapping.black_gray};
text-overflow: ellipsis;
white-space: nowrap;
display: flex;
width: 810px;
flex-direction: column;
justify-content: center;
align-self: stretch;
`
const ContentWrapper = styled.div`
display: flex;
padding: 0px 10px;
flex-direction: column;
align-items: flex-start;
align-self: stretch;
`

const VoteButtonWrapper = styled.div`
display: flex;
padding: 40px 0px 20px 0px;
justify-content: center;
align-items: center;
gap: 10px;
align-self: stretch;
`
const ButtonListWrapper = styled.div`
display: flex;
padding: 10px;
justify-content: space-between;
align-items: center;
align-self: stretch;
`
const DeleteOrModifyWrapper = styled.div`
display: flex;
align-items: center;
gap: 10px;
`

const PostContainer = (
    {
        category, title, author, modified_date, views,
        filesdata, html_content, voter_nicknames, user_nickname}
) => {
    const Files = () => {
        if (!filesdata || filesdata.length === 0) {
            return null;
        }

        return (
            <FilesWrapper>
                {filesdata.map((file, index) => (
                    <a key={index} href={file.file_location} download style={{ textDecoration: 'none' }}>
                        <FileContainer>
                            <FileIconWrapper src={file_image} alt="File Icon" />
                            <FilenameWrapper>{file.file_name}</FilenameWrapper>
                            <FileDownLoadWrapper src={file_downloadIcon} alt="Download Icon" />
                        </FileContainer>
                    </a>
                ))}
            </FilesWrapper>
        );
    };

    const [voters, setVoters] = useState(voter_nicknames);
    const [voteCount, setVoteCount] = useState(voters.length);
    const [hasVoted, setHasVoted] = useState(voters.includes(user_nickname));
    const navigate = useNavigate();

    const PostCategorymapping ={
        FR: "자유게시판",
        NO: "공지사항",
        KQ: "질문게시판-국어",
        MQ: "질문게시판-수학",
        EQ: "질문게시판-영어",
        OQ: "질문게시판-탐구",
        KD: "자료게시판-국어",
        MD: "자료게시판-수학",
        ED: "자료게시판-영어",
        OD: "자료게시판-탐구",
    }
    
    const handleVote = () => {
        if (!user_nickname) {
            if (window.confirm("로그인이 필요한 작업입니다. 로그인 페이지로 이동하시겠습니까?")) {
                navigate('/login'); // Redirect the user to the login page if they click "Yes"
            }
        } else if (!hasVoted) {
            const updatedVoters = [...voters, user_nickname];
            setVoters(updatedVoters);
            setVoteCount(updatedVoters.length);
            setHasVoted(true);
            console.log("api호출도 보내야합니다") // page에게 request 요청
        }
    };
    return (
        <PostWrapper>
            <CategoryWrapper>
                <CategoryContainer to={`/post/?category=${category}`}>
                    <HomeIconImage src={homeIcon} />
                    <Typography size="body_sub_title" color="gray">{PostCategorymapping[category]}</Typography>
                </CategoryContainer>
            </CategoryWrapper>

            <PostTitleWrapper>
                <Typography size="h1" color="black_gray">{title}</Typography>
            </PostTitleWrapper>

            <AuthorAndViewerWrapper>
                <AuthorAndDateContainer>
                    <Typography size="body_sub_title" color="black_gray">{author}</Typography>
                    <Typography size="body_sub_title" color="gray">{modified_date}</Typography>
                </AuthorAndDateContainer>
                <ViewsContainer>
                    <ViewIconWrapper src={viewsIcon} />
                    <Typography size="body_sub_title" color="gray">{views}</Typography>
                </ViewsContainer>
            </AuthorAndViewerWrapper>

            {filesdata && filesdata.length > 0 && <Files />}

            <ContentWrapper>
                <ContentWrapper dangerouslySetInnerHTML={{ __html: html_content }} />
            </ContentWrapper>

            <VoteButtonWrapper>
                <PostVoteButton votes={voteCount} isVoted={hasVoted} onVote={handleVote} />
                <PostLinkShareButton />
            </VoteButtonWrapper>
            <ButtonListWrapper>
                <DeleteOrModifyWrapper>
                    {user_nickname && user_nickname === author && (
                        <>
                            <PostModifyButton />
                            <PostDeleteButton />
                        </>
                    )}
                </DeleteOrModifyWrapper>
                <ListButtons category={category} />
            </ButtonListWrapper>
        </PostWrapper>
    )
}
export default PostContainer;