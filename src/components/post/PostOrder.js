import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../Typography';

const ToggleContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 82px;
  height: 39px;
  padding: 5px 15px 0px 15px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  position: relative;
  cursor: pointer;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 80%;
  background: white;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 5px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const PostOrder = ({ order, setOrder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (newOrder) => {
    setOrder(newOrder);
    setIsOpen(false);
  };

  return (
    <ToggleContainer onClick={toggleDropdown}>
      <Typography size='body_content_medium' color='black'>
        {order === 'created_at' ? '최신순' : '추천순'}
      </Typography>
      <svg xmlns="http://www.w3.org/2000/svg" width="7" height="5" viewBox="0 0 7 5" fill="none">
        <path d="M3.5 5L0.0358988 0.5L6.9641 0.5L3.5 5Z" fill="#454555" />
      </svg>
      {isOpen && (
        <DropdownMenu>
          <DropdownItem onClick={() => handleSelect('created_at')}>
            <Typography size='body_content_medium' color='black'>
              최신순
            </Typography>
          </DropdownItem>
          <DropdownItem onClick={() => handleSelect('MOST_LIKE')}>
            <Typography size='body_content_medium' color='black'>
              추천순
            </Typography>
          </DropdownItem>
        </DropdownMenu>
      )}
    </ToggleContainer>
  );
};

export default PostOrder;
