import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../Typography';

const ToggleContainer = styled.div`
  display: flex;
  width: 160px;
  height: 32px;
  border: 1px solid #DFE5EE;
  border-radius: 5px;
  overflow: hidden;
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.selected ? '#4B4F59' : '#FFFFFF'};
  color: ${props => props.selected ? 'white' : '#393E46'};
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:first-child {
    border-right: 1px solid #dee2e6;
  }
`;

const PostOrder = ({order, setOrder}) => {
  return (
    <ToggleContainer>
      <Section selected={order == "created_at"} onClick={() => setOrder("created_at")}>
        <Typography color={order === "created_at" ? 'white' : '#393E46'} size='body_content_medium'>최신순</Typography>
      </Section>
      <Section selected={order == "MOST_LIKE"} onClick={() => setOrder("MOST_LIKE")}>
        <Typography color={order === "MOST_LIKE" ? 'white' : '#393E46'} size='body_content_medium'>추천순</Typography>
      </Section>
    </ToggleContainer>
  );
};

export default PostOrder;
