import React, { useState } from 'react';
import styled from 'styled-components';
import searchIcon from '../../assets/nav_search_icon.png'; // Adjust this path to the correct location

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #F3F4F8;
  border-radius: 15px;
  width: 360px;
  height: 40px;
  padding: 0 20px;
`;

const Input = styled.input`
  flex: 1;
  background-color: transparent;
  border: none;
  height: 100%;
  margin-right: 20px;
  &:focus {
    outline: none;
  }
`;

const IconWrapper = styled.div`
  width: 22px;
  height: 22px;
  cursor: pointer;
  opacity: 50%;
  background-image: url(${searchIcon});
  background-size: cover;
  background-repeat: no-repeat;
`;

const PostSearchBar = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <SearchBarContainer>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
      />
      <IconWrapper onClick={() => console.log(inputValue)} />
    </SearchBarContainer>
  );
};

export default PostSearchBar;
