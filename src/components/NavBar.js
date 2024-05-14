import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import AlarmModal from "./modals/AlarmModal";
import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";
import { colorMapping } from "./Typography";
import CustomLink from "./CustomLink";
import AuthContext from "../context/AuthProvider";

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
  border-bottom: 2px solid ${colorMapping.bright_blue};
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
  gap: 53px; // Fixed spacing between items
`;

const MenuLink = styled(CustomLink)`
  transition: color 0.5s ease; // Add this line
  padding: 10px 0 10px 0;
  &:hover
`;

const SecondaryNavigation = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  gap: 20px; // Spacing between tabs
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

const NavBar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'))
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
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
    <Header>
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
              to={`/post/${item}`}
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
    </Header>
  );
};

export default NavBar;
