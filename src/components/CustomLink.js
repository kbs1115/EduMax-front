import React from "react";
import styled from "styled-components";
import { colorMapping, sizeMapping } from "./Typography";
import { Link } from 'react-router-dom';


export const Container = styled(Link)`
  color: ${(props) => colorMapping[props.color]};
  font-family: "Noto Sans KR";
  font-style: normal;
  line-height: 100%;
  font-style: normal;
  letter-spacing: 0px;
  font-size: ${(props) => sizeMapping[props.size][0]};
  font-weight: ${(props) => props.bold || sizeMapping[props.size][1]};
  text-decoration: none;

`;

function CustomLink({
  children,
  size = "body_content_medium", 
  color = "black_gray", 
  ...rest
}) {
  return (
    <Container size={size} color={color} bold={sizeMapping[size][1]} {...rest}>
      {children}
    </Container>
  );
}
export default CustomLink;