import React from "react";
import styled from "styled-components";

// 추가할 size, 굵기 조합을 여기 추가하면 됨.
export const sizeMapping = {
  heading1: ["48px", "700"],
  h2: ["24px", "500"],
  h3_bold: ["18px", "700"],
  h3_medium: ["18px", "500"],
  h1: ["32px", "500"],
  light_h1 : ["32px", "400"],
  logo: ["26px", "500"],
  body_content_regular: ["13px", "500"],
  body_content_bold:["14px", "700"],
  body_content_medium: ["14px", "500"],
  body_content_thin: ["14px", "400"],
  body_content_small: ["12px", "500"],
  body_content_small_thin :["12px", "400"],
  body_sub_title: ["16px", "500"],
  signup_small_logo: ["20px", "500"],
};

export const colorMapping = {
  navy: "#4A5BAB",
  brignt_navy: "#2B42B0",
  nav_tab: "#333437", // 네비바 탭 색깔
  black_gray: "#393E46", // 목차색,네비바 상단 글자색
  blue: "#045DEB", // 사이트색
  gray: "#A8AAAE", // 글쓴이,날짜
  blue_gray: "#F3F4F8", // 사이트배경색
  container: "#DFE5EE", // 컨테이너색
  timer_red: "#ED6E6E",
  bright_gray:"#95A0B1", //회색보다 연한
  middle_gray:"#B6C0D5", //회원가입
  purple_blue: "#91A5FF", //신기한색
  bright_black_gray: "#4D4E52", //회색
  bright_blue: "#4C6BFF", // 남색 대체색
  hover_blue: "#002CFF",
  orange: "#F79502",
  white :"#FFFFFF",
  red: "#FF0000",
  warning_red: "#FF4747",
  ok_message: "#5E59FF"
};

const Container = styled.div`
  color: ${(props) => colorMapping[props.color]};
  font-family: "Noto Sans KR";
  font-style: normal;
  line-height: normal;
  font-style: normal;
  letter-spacing: 0px;
  font-size: ${(props) => sizeMapping[props.size][0]};
  font-weight: ${(props) => props.bold || sizeMapping[props.size][1]};
`;

function Typography({
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

export default Typography;
