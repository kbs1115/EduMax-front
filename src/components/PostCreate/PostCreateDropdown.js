import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '../Typography';
import dropdown from '../../assets/dropdown.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border: 1px solid #95A0B1;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DropdownContent = styled.div`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  width: 100%;
  padding: 10px 0 0 0;
`;

const DropdownItem = styled.div`
  padding: 10px 0 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ArrowWrapper = styled.img`
  width: 15px;
  height: 15px;
  flex-shrink: 0;
`;

const PostCreateDropdown = ({ onCategorySelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('게시판을 선택해주세요');

    const toggleDropdown = () => setIsOpen(!isOpen);

    const onOptionClicked = value => () => {
      setSelectedOption(value);
      setIsOpen(false);
      onCategorySelect(value); // Lift state up
  };

    return (
        <Container onClick={toggleDropdown}>
            <ButtonWrapper>
                <Typography size="body_content_thin" color="gray">{selectedOption}</Typography>
                <ArrowWrapper src={dropdown} />
            </ButtonWrapper>
            <DropdownContent isOpen={isOpen}>
                {['질문게시판-국어', '질문게시판-수학', '질문게시판-영어', '질문게시판-탐구',
                    '자료게시판-국어', '자료게시판-수학', '자료게시판-영어', '자료게시판-탐구', '자유게시판'].map(option => (
                        <DropdownItem key={option} onClick={onOptionClicked(option)}>
                            <Typography size="body_content_thin" color="black_gray">{option}</Typography>
                        </DropdownItem>
                    ))}
            </DropdownContent>
        </Container>
    );
};

export default PostCreateDropdown;