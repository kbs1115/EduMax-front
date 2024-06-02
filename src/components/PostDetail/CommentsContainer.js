import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Typography, { colorMapping } from "../Typography";
import CkeditorBox from "../PostCreate/CkeditorBox";
import CommentSubmitButton from "../buttons/CommentSubmitButton";
import CommentVoteButton from "../buttons/CommentVoteButton";
import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";
import { getChildCommentsData, ModifyComment } from "../../apifetchers/fetcher";
import AuthContext from "../../context/AuthProvider";
import { createChildComment, createParentComment } from "../../apifetchers/fetcher";
import { voteComment } from "../../apifetchers/fetcher";
import { DeleteComment } from "../../apifetchers/fetcher";
import Modal from "../modals/BasicModal";

const CommentBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  padding: 0 0 100px 0;
`;
const CommentCountWrapper = styled.div`
  display: flex;
  padding: 10px 0px 20px 10px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-bottom: 1px solid ${colorMapping.black_gray};
`;
const CommentsWrapper = styled.div`
  display: flex;
  padding: ${(props) => (props.isParent ? "10px 10px 20px 10px" : "10px 10px 20px 50px")};
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
`;
const FirstRowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;
const FirstRowWrapper = styled.div`
  display: flex;
  padding: 10px 15px 10px 15px;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: ${colorMapping.blue_gray};
`;
const ContentWrapper = styled.div`
  display: flex;
  padding: 10px 0 10px 10px;
  align-items: flex-start;
  flex-direction: column;
  gap: 22px;
  align-self: stretch;
  img {
    max-width: 100%;
    height: auto;
  }
`;
const CommentSubmitWrapper = styled.div`
  display: flex;
  padding: 40px 0 20px 0;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  align-self: stretch;
`;
const EditorWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;
const PlusOrMinusButtonWrapper = styled.div`
  display: flex;
  padding: 0px 0px 0px 5px;
  align-items: center;
  gap: 5px;
  align-self: stretch;
  cursor: pointer;
`;
const PlusOrMinusButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const PlusIconWrapper = styled.img`
  width: 15px;
  height: 15px;
`;
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
  user_nickname,
  isParent,
}) => {
  const normalizedUserNickname = user_nickname ? user_nickname.toLowerCase() : "";
  const [hasVoted, setHasVoted] = useState(vote_list.some((vote) => vote.user.toLowerCase() === normalizedUserNickname));
  const [votes, setVotes] = useState(vote_list.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editContent, setEditContent] = useState(html_content);

  const handleVote = (user_nickname) => {
    if (!user_nickname) {
      window.alert("로그인이 필요한 작업입니다. 로그인 해주세요.");
    } else if (!hasVoted) {
      setHasVoted(true);
      setVotes(votes + 1);

      voteComment(id)
        .then((response) => {
          console.log("댓글 좋아요 성공:", response);
        })
        .catch((error) => {
          console.error("댓글 좋아요 실패:", error);
          setHasVoted(false);
          setVotes(votes);
        });
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await DeleteComment(id);
        console.log("comment 삭제 성공:", response);
        window.location.reload();
      } catch (error) {
        console.error("comment 삭제 실패:", error);
        alert("삭제에 실패하였습니다.");
      }
    }
  };

  const toggleChildCommentsVisibility = () => {
    if (!showChildComments && !childComments) {
      console.log(id);
      fetchChildComments(id);
    }
    setShowChildComments(!showChildComments);
  };

  return (
    <CommentWrapper>
      <FirstRowContainer>
        <FirstRowWrapper>
          <Typography size="body_sub_title" color="bright_black_gray">
            {author_username}
          </Typography>
          <Typography size="body_sub_title" color="gray">
            {modified_date}
          </Typography>
          <CommentVoteButton votes={votes} isVoted={hasVoted} onVote={() => handleVote(user_nickname)} />
        </FirstRowWrapper>
        {user_nickname === author_username && (
          <>
            <ActionText size="body_content_bold" color="bright_black_gray" onClick={handleEdit}>
              수정
            </ActionText>
            <ActionText size="body_content_bold" color="bright_black_gray" onClick={handleDelete}>
              삭제
            </ActionText>
          </>
        )}
      </FirstRowContainer>
      <ContentWrapper dangerouslySetInnerHTML={{ __html: html_content }} />
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
      {childComments && showChildComments && <Comments comments={childComments} isParent={false} parentId={id} user_nickname={user_nickname} />}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CommentSubmit
          initialContent={editContent}
          commentId={id}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </CommentWrapper>
  );
};

const Comments = ({ comments, isParent, user_nickname, parentId = null, postId }) => {
  const [expandedComments, setExpandedComments] = useState({});
  const [childCommentsData, setChildCommentsData] = useState({});
  const [showChildComments, setShowChildComments] = useState({});

  const fetchChildComments = async (commentId) => {
    console.log(commentId);
    if (!expandedComments[commentId]) {
      const data = await getChildCommentsData(commentId);
      setChildCommentsData((prevData) => ({
        ...prevData,
        [commentId]: data.data,
      }));
    }
    if (!showChildComments[commentId]) {
      setShowChildComments((prevShowChildComments) => ({
        ...prevShowChildComments,
        [commentId]: true,
      }));
    }
    setExpandedComments((prevExpandedComments) => ({
      ...prevExpandedComments,
      [commentId]: !prevExpandedComments[commentId],
    }));
  };

  return (
    <CommentsWrapper isParent={isParent}>
      {comments.map((comment) => (
        <Comment
          setShowChildComments={(value) => setShowChildComments({ ...showChildComments, [comment.id]: value })}
          showChildComments={showChildComments[comment.id] ?? false}
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
  );
};

const CommentSubmit = ({ parentId, postId, initialContent = "", commentId, onClose }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState(initialContent);
  const [contentError, setContentError] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [Islogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(isAuthenticated);
  }, [isAuthenticated]);

  const handleContentChange = (newContent) => {
    setContent(newContent);
    if (newContent.trim() !== "") setContentError(false);
  };

  const validateInputs = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const textContent = doc.body.textContent || "";

    if (Islogin && textContent.trim() === "") {
      setContentError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!Islogin) {
      navigate("/login");
    } else if (validateInputs()) {
      try {
        let response;
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const textContent = doc.body.textContent || "";

        if (commentId) {
          response = await ModifyComment(commentId, content, textContent);
        } else if (parentId) {
          response = await createChildComment(parentId, content, textContent);
        } else {
          response = await createParentComment(postId, content, textContent);
        }

        console.log("댓글 처리 성공:", response.data);
        window.location.reload();
      } catch (error) {
        console.error("댓글 처리 실패:", error);
        window.alert("댓글 처리 실패", error);
      }
    }
  };

  const buttonContent = Islogin ? "제출하기" : "EdunMax 로그인 바로가기";

  return (
    <CommentSubmitWrapper>
      <EditorWrapper style={{ cursor: Islogin ? "text" : "not-allowed" }}>
        <CkeditorBox style={{ width: "100%", pointerEvents: Islogin ? "auto" : "none", opacity: Islogin ? 1 : 0.5 }} setContent={handleContentChange} initialData={content} />
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
        <Typography size="h3_medium" color="bright_black_gray">
          댓글 {comment_count}개
        </Typography>
      </CommentCountWrapper>
      <Comments comments={comments_list} isParent={true} user_nickname={user_nickname} postId={postId} />
    </CommentBoxWrapper>
  );
};

export default CommentsContainer;
