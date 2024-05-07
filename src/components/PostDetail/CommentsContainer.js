import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components"
import Typography, { colorMapping } from "../Typography";
import CkeditorBox from "../PostCreate/CkeditorBox"
import CommentSubmitButton from "../buttons/CommentSubmitButton";
import CommentVoteButton from "../buttons/CommentVoteButton";
import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";
import { useNavigate } from "react-router-dom";
import { getChildCommentsData } from "../../apifetchers/fetcher";
import AuthContext from "../../context/AuthProvider";
import { createChildComment, createParentComment } from "../../apifetchers/fetcher";
import { voteComment } from "../../apifetchers/fetcher";


const CommentBoxWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
align-self: stretch;
padding: 0 0 100px 0;
`
const CommentCountWrapper = styled.div`
display: flex;
padding: 10px 0px 20px 10px;
align-items: center;
gap: 10px;
align-self: stretch;
border-bottom: 1px solid ${colorMapping.black_gray};
`
const CommentsWrapper = styled.div`
  display: flex;
  padding: ${props => props.isParent ? '10px 10px 20px 10px' : '10px 10px 20px 50px'};
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  align-self: stretch;
`;
const CommentWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 15px;
align-self: stretch;
padding: 0px 0px 10px 0px;
border-bottom: 1px solid ${colorMapping.middle_gray};
`
const FirstRowContainer = styled.div`
display: flex;
align-items: center;
gap: 30px;
`
const FirstRowWrapper = styled.div`
display: flex;
padding: 10px 15px 10px 15px;
align-items: center;
gap: 10px;
border-radius: 20px;

background:${colorMapping.blue_gray};
const isVoted = voted_list.some(vote => vote.user === username);
`
const ContentWrapper = styled.div`
display: flex;
padding: 10px 0 10px 10px;
align-items: flex-start;
gap: 22px;
align-self: stretch;

`
const CommentSubmitWrapper = styled.div`
display: flex;
padding: 40px 0 20px 0;
flex-direction: column;
align-items: flex-end;
gap: 10px;
align-self: stretch;
`
const EditorWrapper = styled.div`
display: flex;
align-items: flex-start;
gap: 10px;
align-self: stretch;
`

const PlusOrMinusButtonWrapper = styled.div`
display: flex;
padding: 0px 0px 0px 5px;
align-items: center;
gap: 5px;
align-self: stretch;
cursor: pointer;

`
const PlusOrMinusButtonContainer = styled.div`
display: flex;
align-items: center;
gap: 5px;
`
const PlusIconWrapper = styled.img`
width: 15px;
height: 15px;
`

const ActionText = styled(Typography)`
  cursor: pointer;
  &:hover {
    color: ${colorMapping.brignt_navy}; // Replace with your actual dark blue color code
  }
`;
const Comment = ({
    id,
    vote_list,
    html_content,
    modified_date,
    author_username,
    fetchChildComments,
    childComments,
    showChildComments,
    setShowChildComments,
    user_nickname,   // 로그인 토큰으로부터 nickname 추출할예정, 로그인 상태는 전역임 고로 여기서 받기 가능
    isParent // Add this prop to determine if the comment is a parent
}) => {
    // Ensure user_nickname is not undefined before calling toLowerCase
    const normalizedUserNickname = user_nickname ? user_nickname.toLowerCase() : "";

    // Check if the user has voted
    const [hasVoted, setHasVoted] = useState(vote_list.some(vote => vote.user.toLowerCase() === normalizedUserNickname));
    const [votes, setVotes] = useState(vote_list.length);

    //댓글 추천
    const handleVote = (user_nickname) => {
        if (!user_nickname) {
            window.alert("로그인이 필요한 작업입니다. 로그인 해주세요.");
        } else if (!hasVoted) {
            setHasVoted(true);
            setVotes(votes + 1);


            // API 호출로 댓글에 좋아요를 등록합니다.
            voteComment(id) // id는 해당 댓글의 고유 ID입니다.
                .then(response => {
                    console.log('댓글 좋아요 성공:', response);
                })
                .catch(error => {
                    console.error('댓글 좋아요 실패:', error);
                    // 좋아요 실패 시, 좋아요 상태와 카운트를 원래대로 돌립니다.
                    setHasVoted(false);
                    setVotes(votes);
                });
        }
    };
    // 댓글 수정
    const handleEdit = () => {
        console.log("Edit comment with ID:", id);
        // Implement further edit logic or navigation here
    };
    // 댓글 삭제
    const handleDelete = () => {
        if (window.confirm("정말로 댓글을 삭제하시겠습니까?")) {
            console.log("Delete comment with ID:", id);
            // Call an API to delete the comment or update the state to remove the comment
        }
    };

    const toggleChildCommentsVisibility = () => {
        if (!showChildComments && !childComments) {
            console.log(id)
            fetchChildComments(id);
        }
        setShowChildComments(!showChildComments); // Toggle visibility state
    };

    return (
        <CommentWrapper>
            <FirstRowContainer>
                <FirstRowWrapper>
                    <Typography size="body_sub_title" color="bright_black_gray">{author_username}</Typography>
                    <Typography size="body_sub_title" color="gray">{modified_date}</Typography>
                    <CommentVoteButton votes={votes} isVoted={hasVoted} onVote={() =>handleVote(user_nickname)} />
                </FirstRowWrapper>
                {user_nickname == author_username && (
                    <>
                        <ActionText size="body_content_bold" color="bright_black_gray" onClick={handleEdit}>수정</ActionText>
                        <ActionText size="body_content_bold" color="bright_black_gray" onClick={handleDelete}>삭제</ActionText>
                    </>
                )}
            </FirstRowContainer>
            <ContentWrapper>
                <ContentWrapper dangerouslySetInnerHTML={{ __html: html_content }} />
            </ContentWrapper>

            {isParent && (
                <PlusOrMinusButtonWrapper onClick={toggleChildCommentsVisibility}>
                    <PlusOrMinusButtonContainer>
                        <PlusIconWrapper src={showChildComments ? minus : plus} />
                        <Typography size="body_content_bold" color="navy">
                            {showChildComments ? "댓글 숨기기" : "댓글 더보기"}
                        </Typography>
                    </PlusOrMinusButtonContainer>
                </PlusOrMinusButtonWrapper>
            )}
            {childComments && showChildComments &&
                <Comments comments={childComments} isParent={false} parentId={id} user_nickname={user_nickname}/>
            }
        </CommentWrapper>
    );
};


const Comments = ({ comments, isParent, user_nickname, parentId = null, postId }) => {
    // State to keep track of which comments have their child comments expanded
    const [expandedComments, setExpandedComments] = useState({});
    const [childCommentsData, setChildCommentsData] = useState({});
    const [showChildComments, setShowChildComments] = useState({});


    // Function to fetch child comments from the API
    const fetchChildComments = async (commentId) => {

        console.log(commentId)
        if (!expandedComments[commentId]) {
            const data = await getChildCommentsData(commentId);
            setChildCommentsData(prevData => ({
                ...prevData,
                [commentId]: data.data
            }));
        }
        // Toggle visibility of child comments
        if (!showChildComments[commentId]) {
            setShowChildComments(prevShowChildComments => ({
                ...prevShowChildComments,
                [commentId]: true
            }));
        }
        // Toggle visibility of child comments
        setExpandedComments(prevExpandedComments => ({
            ...prevExpandedComments,
            [commentId]: !prevExpandedComments[commentId]
        }));
    };
    return (
        <CommentsWrapper isParent={isParent}>
            {comments.map(comment => (
                <Comment
                    setShowChildComments={(value) => setShowChildComments({ ...showChildComments, [comment.id]: value })}
                    showChildComments={showChildComments[comment.id] ?? false}  // 자식댓글들이 보여지고있는지
                    key={comment.id}
                    id={comment.id}
                    vote_list={comment.likes}
                    html_content={comment.html_content}
                    modified_date={comment.modified_at}
                    author_username={comment.author}
                    fetchChildComments={fetchChildComments}
                    childComments={childCommentsData[comment.id]}
                    isParent={isParent}
                    user_nickname={user_nickname}
                    parentId={comment.id}
                />
            ))}
            <CommentSubmit parentId={parentId} postId={postId} />
        </CommentsWrapper>
    )
}

const CommentSubmit = ({ parentId, postId }) => {
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [contentError, setContentError] = useState(false);

    const { isAuthenticated } = useContext(AuthContext);
    const [Islogin, setIsLogin] = useState(false);

    useEffect(() => {
        setIsLogin(isAuthenticated);
    }, [isAuthenticated]); // isAuthenticated 값이 변경될 때마다 isLogin 업데이트

    const handleContentChange = (newContent) => {
        setContent(newContent);
        if (newContent.trim() !== '') setContentError(false);
    };

    const validateInputs = () => {
        if (Islogin && content.trim() === '') {
            setContentError(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!Islogin) {
            navigate('/login');
        } else if (validateInputs()) {
            try {
                let response;
                const parser = new DOMParser();
                const doc = parser.parseFromString(content, "text/html");
                const textContent = doc.body.textContent || "";
                if (parentId) {

                    console.log(content)
                    console.log(textContent)
                    response = await createChildComment(parentId, content, textContent);
                } else {
                    response = await createParentComment(postId, content, textContent);
                }
                console.log('댓글 생성 성공:', response.data);
                // 성공적인 댓글 생성 후 필요한 상태 업데이트 또는 UI 반응
                window.location.reload()
            } catch (error) {
                console.error('댓글 생성 실패:', error);
            }
        }
    };

    const buttonContent = Islogin ? "제출하기" : "EdunMax 로그인 바로가기";

    return (
        <CommentSubmitWrapper>
            <EditorWrapper style={{ cursor: Islogin ? 'text' : 'not-allowed' }}>
                <CkeditorBox style={{ width: '100%', pointerEvents: Islogin ? 'auto' : 'none', opacity: Islogin ? 1 : 0.5 }} setContent={handleContentChange} />
            </EditorWrapper>
            {contentError && <Typography size="body_content_medium" color="red">내용을 입력해주세요</Typography>}
            <CommentSubmitButton onClick={handleSubmit} isValid={Islogin && content.trim()} content={buttonContent} />
        </CommentSubmitWrapper>
    );
};

const CommentsContainer = ({ comments_list, user_nickname, postId }) => {
    const comment_count = comments_list.length;
    return (
        <CommentBoxWrapper>
            <CommentCountWrapper>
                <Typography size="h3_medium" color="bright_black_gray">댓글 {comment_count}개</Typography>
            </CommentCountWrapper>
            <Comments comments={comments_list} isParent={true} user_nickname={user_nickname} postId={postId} />
        </CommentBoxWrapper>
    )
}
export default CommentsContainer;