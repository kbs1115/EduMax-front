import React, { useState, useEffect } from "react";
import styled from "styled-components";
import eng_lec_img1 from "../../assets/thumnail1.jpg";
import eng_lec_img2 from "../../assets/thumnail2.jpg";
import eng_lec_img3 from "../../assets/thumnail3.jpg";
import eng_lec_img4 from "../../assets/thumnail4.jpg";
import lecture_logo from "../../assets/lecture_logo.png";
import { Link } from 'react-router-dom'; // Import Link
import { colorMapping } from "../Typography";
import Typography from "../Typography";

const SecondRowContainer = styled.div`
display: flex;
padding-top: 20px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 40px;
align-self: stretch;
min-height: 201px; /* 최소 높이 추가 */
`;


const BottomRowWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
max-width: 1170px;
`;

const LectureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-bottom: 1px solid transparent; /* Initial border set to transparent */
  transition: border-color 0.3s; /* Transition effect applied to border color */
  border-radius: 8px;
  &:hover {
 
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const Thumbnail = styled.img`
  width: 246px; 
  height: 139px;
  border-radius: 8px 8px 0 0;
  border: 1px solid var(--${colorMapping.navy});
  background: url(${props => props.src}) lightgray -5.467px -2.343px / 103.81% 141.573% no-repeat;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const DiscriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  padding: 0 0 10px 5px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit; // Ensures that the link color is inherited from the parent and does not change

  &:visited {
    color: inherit; // Prevents color change on visited links
  }
`;

const FirstRowContainer = styled.div`
display: flex;
width: 1170px;
align-items: center;
gap: 50px;
padding-top: 100px;
`;

const FirstColWrapper = styled(Link)`
display: flex;
width: 193px;
align-items: center;
gap: 10px;
flex-shrink: 0;
text-decoration: none;
color: inherit; // Ensures that the link color is inherited from the parent and does not change

&:visited {
  color: inherit; // Prevents color change on visited links
}
`;

const PlayIconWrapper = styled.div`
display: flex;
padding: 10px 0px;
flex-direction: column;
align-items: flex-start;
gap: 10px;
`;

const PlayIcon = styled.img`
width: 23.113px;
height: 21.184px;
`;
const SecondColWrapper = styled.div`
display: flex;
align-items: center;
gap: 50px;
`;
const ClickableTypography = styled(Typography)`
  cursor: pointer;
  color: ${props => props.isActive ? 'inherit' : 'gray'};
`;
const lectureData = {
  Korean: [

  ],
  Math: [

  ],
  // 나중에 path 바꿔야함. 이미지도 바꿔야함 너무 구림
  English: [{ img: eng_lec_img1, title: '수동태의 기본개념 1편', instructor: '영어 신성균 선생님', path: 'post/lecture/140' },
  { img: eng_lec_img2, title: '호주머니 어법-48', instructor: '영어 신성균 선생님', path: 'post/lecture/123' },
  { img: eng_lec_img3, title: '호주머니 어법-should의 생략', instructor: '영어 신성균 선생님', path: 'post/lecture/139' },
  { img: eng_lec_img4, title: '호주머니 어법-종속절,관계사,복합관계사', instructor: '영어 신성균 선생님', path: 'post/lecture/84' },]
};

const categories = ["Korean", "Math", "English"]; // Move categories outside the component

const LecturesThumbnail = () => {
  const [category, setCategory] = useState("English");

  useEffect(() => {
    const cycleCategories = () => {
      setCategory((currentCategory) => {
        const currentIndex = categories.indexOf(currentCategory);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
    };

    const intervalId = setInterval(cycleCategories, 8000); // Change category every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  return (
    <>
      <FirstRowContainer>
        <FirstColWrapper to={"/lecture?category=EN"}>
          <PlayIconWrapper>
            <PlayIcon src={lecture_logo}></PlayIcon>
          </PlayIconWrapper>
          <Typography size="body_sub_title" color="black_gray">에듀맥스 선생님 강의</Typography>
        </FirstColWrapper>
        <SecondColWrapper>
          {/* Use ClickableTypography instead of Typography and pass the isActive prop */}
          <ClickableTypography size="body_sub_title" onClick={() => setCategory("Korean")} isActive={category === "Korean"}>국어</ClickableTypography>
          <ClickableTypography size="body_sub_title" onClick={() => setCategory("Math")} isActive={category === "Math"}>수학</ClickableTypography>
          <ClickableTypography size="body_sub_title" onClick={() => setCategory("English")} isActive={category === "English"}>영어</ClickableTypography>
        </SecondColWrapper>
      </FirstRowContainer>

      <SecondRowContainer>
        <BottomRowWrapper>
          {lectureData[category].map((lecture, index) => (
            <StyledLink to={lecture.path} key={index}>
              <LectureContainer>
                <Thumbnail src={lecture.img}></Thumbnail>
                <DiscriptionWrapper>
                  <Typography size="body_content_regular" color="#000000">{lecture.title}</Typography>
                  <Typography size="body_content_small" color="bright_blue">{lecture.instructor}</Typography>
                </DiscriptionWrapper>
              </LectureContainer>
            </StyledLink>
          ))}
        </BottomRowWrapper>
      </SecondRowContainer>
    </>
  )
}

export default LecturesThumbnail;