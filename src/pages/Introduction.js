import React, { useEffect, useState} from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Thaompeo1 from "../assets/Thaompeo1.png";
import Thaompeo2 from "../assets/Thaompeo2.png";
import intro_books from "../assets/intro_books.png";
import intro_q1_img from "../assets/intro_q1_img.png";
import map from "../assets/map.png";
import intro_q2_img from "../assets/intro_q2_img.png";
import location from "../assets/location.png";
import phone from "../assets/phone.png";
import dropdownclick from "../assets/dropdownclick.png";
import intro_main from "../assets/intro_main.png";
import Typography from '../components/Typography';
import listIcon from '../assets/listIcon.png';
import { colorMapping } from '../components/Typography';

const IntroMainImgContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 750px;
  background: url(${intro_main}) no-repeat center center/cover;
`;

const OverlayText = styled.div`
  position: absolute;
  color: white;
  top: 30%;
  gap = 40px;
  display: inline-flex;
  flex-direction: column;
  gap: 20px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PresidentContainer = styled.div`
  display: flex;
  padding: 200px 0px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  align-self: stretch;
`;

const PresidentContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 52px;
`;

const PresidentContent1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;
`;

const PresidentContent2 = styled.div`
  display: flex;
  width: 773px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PresidentTypo = styled(Typography)`
  line-height: 30px;
  flex: 1 0 0;
  text-align: center;
`;

const CenterTypo = styled(Typography)`
  text-align: center;
`;

const ThaompeoImg = styled.img`
  width: 39px;
  height: 39px;
`;

const BooksImgContainer = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const BooksImg = styled.img`
  width: 100%;
  height: 800px;  /* 세로폭 줄이기 */
  object-fit: cover;
`;

const AboutEdumaxContainer = styled.div`
  position: absolute;
  bottom: -20px;
  right: 0;
  width: 50%;
  padding: 80px;
  background: #F3F4F8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AboutEdumaxContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const AboutEdumaxWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 40px;
`;

const AboutEdumaxTypo = styled(Typography)`
  line-height: 30px;
  width: 100%;
`;

const Q1AndQ2Wrapper = styled.div`
display: flex;
width: 1170px;
flex-direction: column;
align-items: center;
gap: 100px;
`

const Q1mask = styled.div`
  position: relative;
  height: 677px;
  align-self: stretch;
`;

const Q1Img = styled.img`
  position: absolute;
  width: 893.248px;
  height: 431px;
  flex-shrink: 0;
  z-index: 1;
`;

const Q1Wrapper = styled.div`
  position: absolute;
  top: 50%; /* 원하는 위치로 조정하세요 */
  left: 80%; /* 원하는 위치로 조정하세요 */
  transform: translate(-50%, -50%); /* 중간으로 위치 조정 */
  display: flex;
  width: 561.765px;
  padding: 10px 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  background: #FFF;
  z-index: 2;
`;
const Q1Row1 = styled.div`
display: flex;
padding: 10px;
justify-content: center;
align-items: center;
gap: 10px;
`
const Q1Row2 = styled.div`
display: flex;
padding: 10px 20px;
justify-content: center;
align-items: center;
gap: 10px;
`
const Q1Row3 = styled.div`
display: flex;
padding: 40px 10px 10px 10px;
align-items: center;
gap: 10px;
align-self: stretch;
border-top: 1px solid #DFE5EE;
`

const MainWrapper = styled.div`
display: flex;
padding-bottom: 100px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 300px;
align-self: stretch;
background: #FFF;
`
const Q2Mask = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-start;
align-self: stretch;
`

const Q2Img = styled.img`
width: 624.34px;
height: 438px;
`
const Q2Wrapper = styled.div`
display: flex;
width: 533.581px;
padding: 10px 10px 10px 0px;
flex-direction: column;
align-items: flex-start;
gap: 30px;
background: #FFF;
`

const BulletPointTypography = styled(Typography)`
  p {
    position: relative;
    padding-left: 20px;
    margin: 0;
  }

  p::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.6em;
    width: 6px;
    height: 6px;
    background-color: #717B8E; /* 원하는 색상으로 변경 */
    border-radius: 50%;
  }

  .narrow-spacing {
    display: none; /* 좁은 공간에서는 줄바꿈을 숨깁니다 */
  }
`;

const FAQ = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 80px;
`
const FAQContainer = styled.div`
display: flex;
width: 1170px;
flex-direction: column;
align-items: flex-start;
gap: 30px;
`
const QuestionContainer = styled.div`
display: flex;
padding: 50px 30px;
flex-direction: column;
align-items: flex-start;
gap: 10px;
align-self: stretch;
  border-radius: 15px;
  background: #F4F4F6;
  cursor: pointer;
  transition: max-height 0.1s ease;
  max-height: ${(props) => (props.isOpen ? '500px' : '70px')}; /* isOpen 상태에 따라 크기 변경 */
  overflow: hidden;
`;

const QuestionContent = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
align-self: stretch;
`
const DropdownclickImg = styled.img`
  width: 30px;
  height: 30px;
`;

const Answer = styled.div`
  margin-top: 50px;
  display: ${(props) => (props.isOpen ? 'block' : 'none')}; /* isOpen 상태에 따라 표시 */
`;

const QuestionText = styled.div`
  display: flex;
  align-items: center;
`;


const QuestionLabel = styled(Typography)`
  margin-right: 20px; /* 원하는 여백 크기로 조정 */
`;

const WayComeWrapper = styled.div`
display: flex;
width: 1170px;
flex-direction: column;
align-items: center;
gap: 80px;
`
const WayComeContentWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
align-self: stretch;
`
const LocAndPhoneWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 60px;
`
const LocWrapper = styled.div`
display: flex;
align-items: center;
gap: 38px;
`
const Phonewrapper = styled.div`
display: flex;
align-items: center;
gap: 22px;
`
const LocImg = styled.img`
width: 39.5px;
height: 39.5px;
`
const PhoneImg = styled.img`
width: 60.5px;
height: 60.5px;
`
const MapImg = styled.img`
width: 639px;
height: 323px;
border-radius: 15px;
`

const HomebtnWrapper = styled.div`
display: flex;
width: 1170px;
padding: 10px 0px 100px 0px;
justify-content: flex-end;
align-items: center;
gap: 10px;
`
const ButtonContainer = styled.button`
display: flex;
padding: 8px 12px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 5px;
border: 1px solid ${colorMapping.bright_blue};
background-color: ${colorMapping.bright_blue};
cursor: pointer;
&:hover {
    background: ${colorMapping.hover_blue};
  }
`;

const ListIconWrapper = styled.img`
width: 12px;
height: 12px;
flex-shrink: 0;
`
const HomeButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/`); 
    };

    return (
        <ButtonContainer onClick={handleClick}>
            <ListIconWrapper src={listIcon} />
            <Typography size="body_content_medium" color="white">홈으로</Typography>
        </ButtonContainer>
    );
};


function Introduction() {
  useEffect(() => {
    AOS.init();
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <IntroMainImgContainer>
        <OverlayText data-aos="fade" data-aos-duration="2000">
          <CenterTypo size="light_h1dot5" color="white">학습의 경계를 알지 못하는 곳</CenterTypo>
          <CenterTypo size="h0_regular" color="white">이곳은 <Typography size="h0_bold" color="white" as="span">에듀맥스</Typography> 입니다</CenterTypo>
        </OverlayText>
      </IntroMainImgContainer>
      <MainContainer>
        <PresidentContainer data-aos="fade" data-aos-duration="1000" data-aos-offset="600">
          <ThaompeoImg src={Thaompeo1} />
          <PresidentContent>
            <PresidentContent1>
              <Typography size='h1' color='black_gray'>에듀맥스 입시학원  신성균 원장 </Typography>
            </PresidentContent1>
            <PresidentContent2>
              <PresidentTypo size='body_sub_title_regular' color='black_gray'>
                20년이넘는시간동안 입시를 연구하고 입시를 잘치르기위해 학생들과 함께 하며 에듀맥스 학원을 운영하였습니다.
                오직 광고 한 번 없이 소문만으로 22년동안 10,000명이 넘는 학생들과 함께 연구하고 완성한 입시의 길을 여러분께 전해드립니다.
                소중한 학생 시기에 함께 옆에서 달리며 바른길로 잘 갈 수 있도록 최선을 다합니다.
                모르는 것이 많아서 이곳에 왔지만 모르는 것이 없는 상태로 나갈수있도록 가르치겠습니다.
                <br /><br />
                믿고 찾아주셔서 감사합니다
              </PresidentTypo>
            </PresidentContent2>
          </PresidentContent>
          <ThaompeoImg src={Thaompeo2} />
        </PresidentContainer>
        <MainWrapper>
          <AboutEdumaxWrapper>
            <BooksImgContainer>
              <BooksImg src={intro_books} />
              <AboutEdumaxContainer data-aos="fade-up">
                <AboutEdumaxContentContainer >
                  <CenterTypo size="light_h1" color="bright_black_gray">
                    <Typography size="h1_bold" color="bright_black_gray" as="span">에듀맥스</Typography>는 어떤 곳 인가요?
                  </CenterTypo>
                  <AboutEdumaxTypo size='body_sub_title' color='bright_black_gray'>
                    <Typography size="body_sub_title_bold" color="bright_black_gray" as="span">" EDU + MAX "</Typography>
                    이름 그대로 학생들을 가르치기 위해 탄생한 학원 에듀맥스는<br />
                    10년 이상 동안 수원 권선동에서 1만명이 넘는 학생들을 배출한 최고 수준의 단과 학원입니다.<br />
                    진도를 위한 단과 수업과 개별맞춤형 개인 보강 수업을 합쳐서<br />
                    학생들에게 최적의 수업을 하기 위해 항상 노력하는 열정적인 선생님들이 단 한번도 변경되지 않고<br />
                    학생들과 십년 동안 함께 하였습니다
                  </AboutEdumaxTypo>
                </AboutEdumaxContentContainer>
              </AboutEdumaxContainer>
            </BooksImgContainer>
          </AboutEdumaxWrapper>
          <Q1AndQ2Wrapper>
            <Q1mask data-aos="fade-left" data-aos-duration="500" data-aos-offset="400">
              <Q1Img src={intro_q1_img} />
              <Q1Wrapper>
                <Q1Row1>
                  <Typography size='h2' color='dark_clay'>Q1.</Typography>
                </Q1Row1>
                <Q1Row2>
                  <Typography size='h3_bold' color='bright_black_gray'>원장님의 교육철학이 있을까요?</Typography>
                </Q1Row2>
                <Q1Row3>
                  <Typography size='body_sub_title' color='dark_clay'>
                    <p>학원은 학생들이 지금의 자신보다 더 발전된 능력을<br class="narrow-spacing" />길러갈 수 있는 초석이 되어야합니다.</p>
                    <p>지난 20여년간 영어를 가르치는 강사로서 학생들의 숨겨진 재능이 지금보다<br class="narrow-spacing" />더 발전되어 학습능력을 길러갈수있도록 노력해왔습니다.</p>
                    <p>'기회는 일어나는 것이 아니라 만들어지는 것이다'라는 말이 있습니다.<br class="narrow-spacing" />에듀맥스는 학생들의 발전과 원하는 결과를 위해 함께 달리면 최선을 다할 최고의 학원이 되어줄것입니다.</p>
                  </Typography>
                </Q1Row3>
              </Q1Wrapper>
            </Q1mask>
            <Q2Mask data-aos="fade-right" data-aos-duration="500" data-aos-offset="100">
              <Q2Wrapper>
                <Q1Row1>
                  <Typography size='h2' color='dark_clay'>Q2.</Typography>
                </Q1Row1>
                <Q1Row2>
                  <Typography size='h3_bold' color='bright_black_gray'>에듀맥스만의 장점은 무엇인가요?</Typography>
                </Q1Row2>
                <Q1Row3>
                  <BulletPointTypography size='body_sub_title' color='dark_clay'>
                    <p>과목 선택의 폭이 넓어진 학생들을 위해 전문성을 갖춘 선생님들과 함께하고 있습니다.</p><br></br>
                    <p>학교별 내신수업, 주기적 모의고사, 수능 N수반으로 다양한 커리큘럼이 준비되어있습니다.</p><br></br>
                    <p>다른 학원은 강의 또는 개별 수업을 분리하여 진행하지만 저희 학원은 강의와 개별보강을 모두 종합시켜 성적과 관련없이 학생들의 수준에 맞는 학습이 가능합니다.</p>
                  </BulletPointTypography>
                </Q1Row3>
              </Q2Wrapper>
              <Q2Img src={intro_q2_img} />
            </Q2Mask>
          </Q1AndQ2Wrapper>
          <FAQ>
            <Typography size="h1_bold" data-aos-duration="500" color="bright_black_gray">자주 하는 질문  </Typography>
            <FAQContainer data-aos="zoom-in-left" data-aos-duration="800">

              {questions.map((question, index) => (
                <QuestionContainer
                  key={index}
                  onClick={() => handleToggle(index)}
                  isOpen={openIndex === index}

                >
                  <QuestionContent >
                    <QuestionText>
                      <QuestionLabel size="h2_bold" color="bright_blue">Q.</QuestionLabel>
                      <Typography size='h3_bold' color='bright_black_gray'>{question.text}</Typography>
                    </QuestionText>
                    <DropdownclickImg src={dropdownclick} />
                  </QuestionContent>

                  <Answer isOpen={openIndex === index}>
                    <QuestionText>
                      <QuestionLabel size="h2_bold" color="bright_blue">A.</QuestionLabel>
                      <Typography size='h3_bold' color='bright_black_gray'>{question.answer}</Typography>
                    </QuestionText>

                  </Answer>
                </QuestionContainer>
              ))}
            </FAQContainer>
          </FAQ>
          <WayComeWrapper>
            <Typography size='h1_bold' color='bright_black_gray'>오시는길</Typography>
            <WayComeContentWrapper>
              <MapImg src={map} />
              <LocAndPhoneWrapper>
                <LocWrapper>
                  <LocImg src={location} />
                  <Typography size='signup_small_logo' color='bright_black_gray'>경기도 수원시 권선구 권광로 68  (권선동,6층) </Typography>
                </LocWrapper>
                <Phonewrapper>
                  <PhoneImg src={phone} />
                  <Typography size='signup_small_logo' color='bright_black_gray'>031-238-2261 </Typography>
                </Phonewrapper>
              </LocAndPhoneWrapper>
            </WayComeContentWrapper>
          </WayComeWrapper>
        </MainWrapper>
        <HomebtnWrapper>
          <HomeButton/>
        </HomebtnWrapper>
      </MainContainer >
    </>
  );
}

export default Introduction;

const questions = [
  {
    text: '학교별로 수업이 분반되어 있나요?',
    answer: '네, 저희 학원은 학교별로 수업이 분반되어 맞춤형 교육을 제공합니다.'
  },
  {
    text: '내신이 아닌 수능을 위주로 공부하는 학생들을 위한 시스템이 마련되어있나요?',
    answer: '네, 저희 학원은 정기적으로 모의고사를 시행해 n수 반이 아니더라도 학생 개개인의 맞춤 상담 및 커리큘럼이 마련되어있습니다.'
  },
  {
    text: 'n수생을 위한 반이 있나요?',
    answer: '네, n수생을 위한 별도의 반이 준비되어 있습니다.'
  }
];