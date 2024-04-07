import React, { useState } from "react";
import styled from "styled-components"
import Typography, { colorMapping } from "../Typography";
import plus from "../../assets/plus.png"
import minus from "../../assets/minus.png"

const ButtonWrapper=styled.div`
display: flex;
align-items: center;
gap: 5px;
`
const PlusIcon=styled.img`
width: 15px;
height: 15px;
`

const PlusButton = ({content="댓글 더보기"})=>{
    return(
        <ButtonWrapper>
            <PlusIcon src={plus}/>
            <Typography size="body_content_bold" color="navy">{content}</Typography>
        </ButtonWrapper>
    )
}
export default PlusButton;