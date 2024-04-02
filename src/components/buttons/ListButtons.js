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
border: 1px solid ${colorMapping.middle_gray};
background-color: white;
cursor: pointer;
`;

const ListIconWrapper = styled.img`
width: 12px;
height: 12px;
flex-shrink: 0;
`
const ListButton = ({ category }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${category}`); // 매핑된거에 맞게 url 보내면될듯합니다.
    };

    return (
        <ButtonContainer onClick={handleClick}>
            <ListIconWrapper src={listIcon} />
            <Typography size="body_content_medium" color="black_gray">목록으로</Typography>
        </ButtonContainer>
    );
};

export default ListButton;