import React, { useState } from "react";
import styled from "styled-components";
import searchIcon from "../assets/nav_search_icon.png";

const SearchContainer = styled.div`
  position: relative;
  width: 284px;
  height: 29px;
  background-color: #f3f4f8;
  border-radius: 15px;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 100%;
  padding: 0 0px 0 20px; // Right padding to make room for the icon
  border: none;
  border-radius: 15px;
  background-color: transparent;
  outline: none;

  ::placeholder {
    color: #a3a3a3;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px; // Adjust the size as needed
  height: 14px; // Adjust the size as needed
`;

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    // Implement your logic to handle the submission, e.g., redirecting to a search results page
    console.log("Submitting:", inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="검색..."
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      <SearchIcon
        src={searchIcon}
        alt="Search"
        onClick={handleSubmit}
        style={{ cursor: "pointer" }} // Make the icon appear clickable
      />
    </SearchContainer>
  );
};

export default SearchBar;
