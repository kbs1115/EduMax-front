import styled from "styled-components";

// 추가할 size, 굵기 조합을 여기 추가하면 됨.
export const sizeMapping = {
  heading1: ["48px", "700"],
  heading2: ["40px", "700"],
  title1: ["38px", "700"],
  title2: ["36px", "700"],
  largeText: ["24px", "700"],
  bodyText: ["20px", "700"],
  mediumText: ["18px", "500"],
  normalText: ["16px", "500"],
  smallText: ["14px", "400"],
  details: ["12px", "400"],
};

const Container = styled.div`
  color: ${(props) => props.color};
  font-family: Pretendard;
  font-style: normal;
  line-height: 100%;
  font-size: ${(props) => sizeMapping[props.size][0]};
  font-weight: ${(props) => props.bold || sizeMapping[props.size][1]};
`;

function Typography({
  children,
  size = "bodyText",
  color = "#141414",
  ...rest
}) {
  return (
    <Container size={size} color={color} bold={sizeMapping[size][1]} {...rest}>
      {children}
    </Container>
  );
}

export default Typography;
