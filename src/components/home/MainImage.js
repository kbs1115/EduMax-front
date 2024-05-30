import React, { useState, useEffect } from "react";
import styled from "styled-components";
import main_img1 from "../../assets/main_img1.png";
import main_img2 from "../../assets/main_img2.png";
import Typography from "../Typography";

const IntroMainImgContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 700px;
  overflow: hidden;
  background: #000;
`;

const ImageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const OverlayText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: -10%; /* 중앙보다 위로 올리기 위해 음수 값으로 설정 */
  color: white;
  gap: 25px; /* text1과 text2 사이의 간격을 30px로 설정 */
`;

const CenterTypo1 = styled(Typography)`
  text-align: center;
`;

const CenterTypo2 = styled(Typography)`
  text-align: center;
  letter-spacing: 3px;
`;

const images = [
  {
    src: main_img1,
    text1: "최고의 강의와 질답 시스템",
    text2: "왜 에듀맥스 인가?",
  },
  {
    src: main_img2,
    text1: "10000명이 검증한 강의",
    text2: "문법은? 호주머니어법!",
  },
];

function MainImage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <IntroMainImgContainer>
      {images.map((image, i) => (
        <ImageContainer
          key={i}
          isVisible={index === i}
          style={{
            backgroundImage: `url(${image.src})`,
          }}
        >
          {index === i && (
            <OverlayText>
              <CenterTypo1 size="medium_28px" color="white">
                {image.text1}
              </CenterTypo1>
              <CenterTypo2 size="heading1_regular" color="white">
                {image.text2}
              </CenterTypo2>
            </OverlayText>
          )}
        </ImageContainer>
      ))}
    </IntroMainImgContainer>
  );
}

export default MainImage;
