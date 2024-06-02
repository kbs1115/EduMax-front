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
import { votePost, DeletePost } from "../../apifetchers/fetcher";
import Modal from "../modals/BasicModal";
import PostCreateForm from "../PostCreate/PostCreateForm";

export const PostWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 5px;
align-self: stretch;
`;
export const CategoryWrapper = styled.div`
display: flex;
padding: 30px 0px 10px 5px;
align-items: center;
align-self: stretch;
border-bottom: 1px solid ${colorMapping.container}
`;
export const CategoryContainer = styled(Link)`
display: flex;
align-items: center;
gap: 10px;
text-decoration: none;
`;

export const HomeIconImage = styled.img`
width: 18px;
height: 18px;
`;

export const PostTitleWrapper = styled.div`
display: flex;
padding: 20px 0 20px 5px;
align-items: center;
align-self: stretch;
border-bottom: 1px solid ${colorMapping.black_gray};
`

export const AuthorAndViewerWrapper = styled.div`
display: flex;
padding: 10px;
justify-content: space-between;
align-items: center;
align-self: stretch;
border-bottom: 1px solid ${colorMapping.container};
`
export const AuthorAndDateContainer = styled.div`
display: flex;
width: 349px;
padding-right: 10px;
align-items: center;
gap: 10px;
`;

export const ViewsContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 8px;
`
export const ViewIconWrapper = styled.img`
width: 25px;
height: 18px;
`

export const FilesWrapper = styled.div`
display: flex;
padding: 20px 10px 10px 10px;
flex-direction: column;
align-items: flex-start;
gap: 10px;
align-self: stretch;
`

export const FileContainer = styled.div`
display: flex;
padding: 10px;
align-items: center;
gap: 15px;
align-self: stretch;
border-radius: 5px;
border: 1px solid #B6C0D5;
`

export const FileIconWrapper = styled.img`
width: 18px;
height: 18px;
`;

export const FileDownLoadWrapper = styled.img`
width: 18px;
height: 18px;
`
export const FilenameWrapper = styled(Typography)`
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
export const ContentWrapper = styled.div`
    display: flex;
    padding: 0px 10px;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    min-height: 200px;
    // 추가: 이미지 크기를 ContentWrapper에 맞추기 위한 스타일
    img {
        max-width: 100%;
        height: auto;
    }
`

export const VoteButtonWrapper = styled.div`
display: flex;
padding: 40px 0px 20px 0px;
justify-content: center;
align-items: center;
gap: 10px;
align-self: stretch;
`
export const ButtonListWrapper = styled.div`
display: flex;
padding: 10px;
justify-content: space-between;
align-items: center;
align-self: stretch;
`
export const DeleteOrModifyWrapper = styled.div`
display: flex;
align-items: center;
gap: 10px;
`

const PostContainer = (
    {
        category, title, author, modified_date, views,
        filesdata, html_content, voter_nicknames, user_nickname, post_id }
) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialData = {
        title,
        content: html_content,
        category,
        files: filesdata
    };

    const Files = () => {
        if (!filesdata || filesdata.length === 0) {
            return null;
        }
        const baseUrl = "https://edumaxbucket.s3.ap-northeast-2.amazonaws.com/";
        return (
            <FilesWrapper>
                {filesdata.map((file, index) => (
                    <a key={index} href={`${baseUrl}${file.file_location}`} download={file.name} style={{ textDecoration: 'none' }}>
                        <FileContainer>
                            <FileIconWrapper src={file_image} alt="File Icon" />
                            <FilenameWrapper>{file.name}</FilenameWrapper>
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

    const PostCategorymapping = {
        FR: { label: "자유게시판", postType: "free" },
        NO: { label: "공지사항", postType: "notice" },
        KQ: { label: "질문게시판-국어", postType: "question" },
        MQ: { label: "질문게시판-수학", postType: "question" },
        EQ: { label: "질문게시판-영어", postType: "question" },
        TQ: { label: "질문게시판-탐구", postType: "question" },
        KD: { label: "자료게시판-국어", postType: "data" },
        MD: { label: "자료게시판-수학", postType: "data" },
        ED: { label: "자료게시판-영어", postType: "data" },
        OD: { label: "자료게시판-탐구", postType: "data" },
    }

    const handleVote = (post_id) => {
        if (!user_nickname) {
            if (window.confirm("로그인이 필요한 작업입니다. 로그인 페이지로 이동하시겠습니까?")) {
                navigate('/login'); // Redirect the user to the login page if they click "Yes"
            }
        } else if (!hasVoted) {
            const updatedVoters = [...voters, user_nickname];
            console.log(post_id, "id입니다")
            // API 호출로 댓글에 좋아요를 등록합니다.
            votePost(post_id) // id는 해당 댓글의 고유 ID입니다.
                .then(response => {
                    console.log('post 좋아요 성공:', response);
                    setVoters(updatedVoters);
                    setVoteCount(updatedVoters.length);
                    setHasVoted(true);
                })
                .catch(error => {
                    console.error(';post 좋아요 실패:', error);
                    // 좋아요 실패 시, 좋아요 상태와 카운트를 원래대로 돌립니다.
                    setHasVoted(false);
                    setVoters(voters);
                    setVoteCount(voters.length);

                });
        }
    };


    const handleDelete = async () => {
        if(window.confirm("정말 삭제하시겠습니까?")){
            try {
                const response = await DeletePost(post_id); // DeletePost 함수를 호출하여 API 요청
                console.log("Post 삭제 성공:", response);
                navigate(`/post/${postType}`); // 상태 업데이트 후 페이지 리다이렉트
            } catch (error) {
                console.error("Post 삭제 실패:", error);
                alert("삭제에 실패하였습니다."); // 사용자에게 실패를 알림
            }
        }
    };

    const handleModify = () => {
        setIsModalOpen(true);
    };

    const postType = PostCategorymapping[category]?.postType || "post";

    return (
        <PostWrapper>
            <CategoryWrapper>
                <CategoryContainer to={`/post/${postType}/?category=${category}`}>
                    <HomeIconImage src={homeIcon} />
                    <Typography size="body_sub_title" color="gray">{PostCategorymapping[category].label}</Typography>
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
                <PostVoteButton votes={voteCount} isVoted={hasVoted} onVote={() => handleVote(post_id)} />
                <PostLinkShareButton />
            </VoteButtonWrapper>
            <ButtonListWrapper>
                <DeleteOrModifyWrapper>
                    {user_nickname && user_nickname === author && (
                        <>
                            <PostModifyButton onClick={handleModify} />
                            <PostDeleteButton onClick={handleDelete} /> {/* handleDelete 함수를 props로 전달 */}
                        </>
                    )}
                </DeleteOrModifyWrapper>
                <ListButtons category={category} mainContent={`post/${postType}`} />
            </ButtonListWrapper>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <PostCreateForm initialData={initialData} postId={post_id} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </PostWrapper>
    )
}
export default PostContainer;
