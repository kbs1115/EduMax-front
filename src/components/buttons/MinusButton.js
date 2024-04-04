import React, { useState } from "react";
import styled from "styled-components"
import Typography, { colorMapping } from "../Typography";
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

const MinusButton = ({content= "댓글 숨기기"})=>{
    return(
        <ButtonWrapper>
            <PlusIcon src={minus}/>
            <Typography size="body_content_bold" color="navy">{content}</Typography>
        </ButtonWrapper>
    )
}
export default MinusButton;