import React, { useState } from "react";
import styled from "styled-components";
import Typography from "../Typography";
import dropdownclick from "../../assets/dropdownclick.png"

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

const options = ["TOTAL", "TITLE", "CONTENT", "AUTHOR"];
const optionMapping = {
  TOTAL : "전체",
  TITLE : "제목",
  CONTENT : "내용",
  AUTHOR : "글쓴이"
}

const PostDropDown = ({ searchOption, setSearchOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = value => () => {
    setSearchOption(value);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={toggling}>
        <Typography size="body_content_medium">{optionMapping[searchOption]}</Typography>
        <DropdownArrow src={dropdownclick}/>
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map(option => (
            <DropdownItem key={option} onClick={onOptionClicked(option)}>
              <Typography size="body_content_medium">{optionMapping[option]}</Typography>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default PostDropDown;
