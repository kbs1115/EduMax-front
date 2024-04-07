import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { colorMapping } from "../Typography";
import Typography from "../Typography";
import listIcon from "../../assets/listIcon.png"
const ButtonContainer = styled.button`
display: flex;
padding: 8px 12px;
justify-content: center;
align-items: center;
gap: 5px;
border-radius: 5px;
border: 1px solid ${colorMapping.navy};
background-color: ${colorMapping.navy};
cursor: pointer;
&:hover {
    background: ${colorMapping.brignt_navy};
  }
`;

const ListIconWrapper = styled.img`
width: 12px;
height: 12px;
flex-shrink: 0;
`
const ListButton = ({ category }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/?category=${category}`); // 매핑된거에 맞게 url 보내면될듯합니다.
    };

    return (
        <ButtonContainer onClick={handleClick}>
            <ListIconWrapper src={listIcon} />
            <Typography size="body_content_medium" color="white">목록으로</Typography>
        </ButtonContainer>
    );
};

export default ListButton;