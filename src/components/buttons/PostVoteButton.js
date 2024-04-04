import React from "react";
import styled from "styled-components";
import { colorMapping } from "../Typography";
import Typography from "../Typography";
import voteIcon from "../../assets/voteIcon.png"
import voteIcon_gray from "../../assets/voteIcon_gray.png"

const ButtonContainer = styled.button`
  display: flex;
  width: 128px;
  padding: 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 2px solid ${props => props.isVoted ? '#4A5BAB' : colorMapping.container};
  background-color: white;
  cursor: ${props => props.isVoted ? 'default' : 'pointer'};
  &:disabled {
    cursor: default;
  }
  &:hover {
    border: 2px solid ${colorMapping.brignt_navy};
  }
`;
const VoteIconWrapper = styled.img`
width: 20px;
height: 20px;
`

const TypoWrapper=styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 10px;
`
const PostVoteButton = ({ votes, isVoted, onVote }) => {
    return (
      <ButtonContainer isVoted={isVoted} onClick={!isVoted ? onVote : undefined} disabled={isVoted}>
        <VoteIconWrapper src={isVoted ? voteIcon : voteIcon_gray} />
        <TypoWrapper>
          <Typography size="h3_medium" color="black_gray">추천{votes}</Typography>
        </TypoWrapper>
      </ButtonContainer>
    );
  };
  


export default PostVoteButton;