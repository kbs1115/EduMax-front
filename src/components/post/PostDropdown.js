import React, { useState } from "react";
import styled, { css } from "styled-components";
import Typography from "../Typography";
import dropdownclick from "../../assets/dropdownclick.png";

const DropdownContainer = styled.div`
  width: 145px;
  position: relative;
  user-select: none;
`;

const DropdownHeader = styled.div`
  height: 40px;
  border-radius: 15px;
  border: none;
  background-color: #F7F7F8;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  ${({ isOpen }) =>
    isOpen &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
`;

const DropdownArrow = styled.img`
  width: 11px;
  height: 11px;
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #F7F7F8;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0);
  z-index: 100;
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  background-color: #F7F7F8;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }

  &:first-child {
    ${({ isOpen }) =>
      isOpen &&
      css`
        border-radius: 0;
      `}
  }

  &:last-child {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }
`;

const options = ["TOTAL", "TITLE", "CONTENT", "AUTHOR"];
const optionMapping = {
  TOTAL: "전체",
  TITLE: "제목",
  CONTENT: "내용",
  AUTHOR: "글쓴이"
};

const PostDropDown = ({ searchOption, setSearchOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSearchOption(value);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownHeader isOpen={isOpen} onClick={toggling}>
        <Typography size="body_content_medium" color="black_gray">{optionMapping[searchOption]}</Typography>
        <DropdownArrow src={dropdownclick} />
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem key={option} isOpen={isOpen} onClick={onOptionClicked(option)}>
              <Typography size="body_content_medium" color="black_gray">{optionMapping[option]}</Typography>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default PostDropDown;
