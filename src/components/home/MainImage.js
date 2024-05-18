import React from "react";
import styled from "styled-components";
import main_img from "../../assets/main_img.png";
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
align-self: stretch;
`;
const Image = styled.img`
height: 600px;
align-self: stretch;
`;
function MainImage() {
    return (
    <Container>
        <Image src={main_img}></Image>
    </Container>
    )
};
    
    
export default MainImage;