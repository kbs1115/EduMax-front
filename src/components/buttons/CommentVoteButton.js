import React from "react";
import styled from "styled-components";
import { colorMapping } from "../Typography";
import Typography from "../Typography";
import voteIcon from "../../assets/voteIcon.png"
import voteIcon_middlegray from "../../assets/voteIcon_middlegray.png"

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 0 0 0;
  border: 1px solid ${colorMapping.blue_gray};
  cursor: ${props => props.isVoted ? 'default' : 'pointer'};
  &:disabled {
    cursor: default;
  }

`;
const VoteIconWrapper = styled.img`
width: 12px;
height: 12px;
`

const CommentVoteButton = ({ votes, isVoted, onVote }) => {
    return (
        <ButtonContainer isVoted={isVoted} onClick={!isVoted ? onVote : undefined} disabled={isVoted}>
            <VoteIconWrapper src={isVoted ? voteIcon : voteIcon_middlegray} />

                <Typography size="body_content_small" color="bright_black_gray">{votes}</Typography>

        </ButtonContainer>
    );
};



export default CommentVoteButton;