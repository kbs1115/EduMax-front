import React, { useState, useContext, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AlarmModal from "./modals/AlarmModal";
import logo from "../assets/logo.png";
import { colorMapping } from "./Typography";
import CustomLink from "./CustomLink";
import AuthContext from "../context/AuthProvider";
import LectureNavBar from "./LectureNavBar"; // Import LectureNavBar

export const boardMapping = {
  question: "질문게시판",
  data: "자료게시판",
  free: "자유게시판",
  lecture: "선생님강의",
  notice: "공지사항",
  intro: "학원소개",
};

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  margin-top: 20px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
`;

const TopRow = styled.div`
  display: flex;
  width: 1170px;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const InnerTopRow = styled.div`
  display: flex;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 169px;
  height: 41px;
`;

const MenuItems = styled.nav`
  display: flex;
  width: 1170px;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const InnerMenuItems = styled.div`
  display: flex;
  align-items: center;
  gap: 53px;
`;

const MenuLink = styled(CustomLink)`
  transition: color 0.5s ease;
  padding: 10px 0 10px 0;
`;

const SecondaryNavigation = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  gap: 20px;
`;

const NavItem = styled(CustomLink)`
  &:after {
    display: block;
    content: '';
    border-bottom: solid 1px ${colorMapping.black_gray}; 
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
    transform-origin: 0% 50%;
  }
  &:hover:after {
    transform: scaleX(1);
  }
`;

const dropDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  animation: ${dropDown} 0.3s ease-out;
  z-index: 1000;
`;

const NavBar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'))
  const [hoveredLink, setHoveredLink] = useState(null);
  const [showLectureNavBar, setShowLectureNavBar] = useState(false);
  const navBarRef = useRef(null);
  const [navBarHeight, setNavBarHeight] = useState(0);

  useEffect(() => {
    if (navBarRef.current) {
      setNavBarHeight(navBarRef.current.offsetHeight);
    }
  }, []);

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
    if (link === 'lecture') {
      setShowLectureNavBar(true);
    }
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
    setShowLectureNavBar(false);
  };

  const handleLogOut = () => {
    logout();
    setIsAuthenticated("false");
    navigate('/');
  }

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <Header ref={navBarRef}>
      <TopRow>
        <InnerTopRow>
          <LogoContainer>
            <Link to="/">
              <LogoImage src={logo} alt="에듀맥스 로고" />
            </Link>
          </LogoContainer>
        </InnerTopRow>
        <SecondaryNavigation>
          {isAuthenticated === "true" ? <div onClick={handleLogOut}><NavItem size="body_content_medium" color="black_gray">로그아웃</NavItem></div> :
          <NavItem size="body_content_medium" color="black_gray" to={`/login`}>로그인</NavItem>}
          <NavItem size="body_content_medium" color="black_gray" to={`/signup`}>회원가입</NavItem>
          <NavItem onClick={toggleModal}>알림</NavItem>
          <NavItem size="body_content_medium" color="black_gray" to={`/mypage`}>마이페이지</NavItem>
        </SecondaryNavigation>
      </TopRow>
      <MenuItems>
        <InnerMenuItems>
          {Object.keys(boardMapping).map((item, index) => (
            <MenuLink
              key={index}
              to={item === 'intro' ? `/intro` : `/post/${item}`}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
              size="body_sub_title"
              color="nav_tab"
              style={{
                color:
                  hoveredLink && hoveredLink !== item ? colorMapping.gray : colorMapping.nav_tab,
              }}
            >
              {boardMapping[item]}
            </MenuLink>
          ))}
        </InnerMenuItems>
      </MenuItems>
      {showModal && <AlarmModal onClose={toggleModal} />}
      {showLectureNavBar && (
        <ModalWrapper
          style={{ top: `${navBarHeight-2}px` }}  // Add some extra space
          onMouseEnter={() => setShowLectureNavBar(true)}
          onMouseLeave={handleMouseLeave}
        >
          <LectureNavBar onClose={() => setShowLectureNavBar(false)} />
        </ModalWrapper>
      )}
    </Header>
  );
};

export default NavBar;
