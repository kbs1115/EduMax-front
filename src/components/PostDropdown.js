import React, { useState } from "react";
import styled from "styled-components";
import Typography from "./Typography";
import dropdownclick from "../assets/dropdownclick.png"

const DropdownContainer = styled.div`
  width: 145px;
  position: relative;
  user-select: none;
`;

const DropdownHeader = styled.div`
  height: 40px;
  border-radius: 15px;
  border: 1px solid #A8AAAE;
  background-color: #FFF;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
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
  background-color: #FFF;
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`;

const options = ["전체", "제목", "내용", "제목 + 내용", "글쓴이"];

const PostDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("전체");

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggling}>
        <Typography size="body_content_medium">{selectedOption}</Typography>
        <DropdownArrow src={dropdownclick}/>
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map(option => (
            <DropdownItem key={option} onClick={onOptionClicked(option)}>
              <Typography size="body_content_medium">{option}</Typography>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default PostDropDown;
