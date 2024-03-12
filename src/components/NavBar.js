import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import logo from "../assets/logo.png";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  margin-top: 20px;
  border-bottom: 2px solid #045deb; // Bottom stroke color and thickness
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

const MenuLink = styled(Link)`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #333437;
  text-decoration: none;
  letter-spacing: 0px;
  transition: color 0.5s ease; // Add this line
  padding: 10px 0 10px 0;
  &:hover {
    color: #a8aaae; // Specify the hover color if needed
  }
`;

const SecondaryNavigation = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  gap: 20px; // Spacing between tabs
`;

const NavItem = styled(Link)`
  font-family: "Noto Sans KR", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #393e46;
  text-decoration: none;
  letter-spacing: 0px;
  &:hover {
    text-decoration: underline;
  }
`;

const NavBar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleMouseEnter = (link) => {
    setHoveredLink(link);
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
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
          <NavItem to="/login">로그인</NavItem>
          <NavItem to="/signup">회원가입</NavItem>
          <NavItem to="/notifications">알림</NavItem>
          <NavItem to="/my-page">마이페이지</NavItem>
        </SecondaryNavigation>
      </TopRow>
      <MenuItems>
        <InnerMenuItems>
          {[
            "질문게시판",
            "자료게시판",
            "자유게시판",
            "선생님강의",
            "공지사항",
            "학원소개",
          ].map((item, index) => (
            <MenuLink
              key={index}
              to={`/post/${item}`}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
              style={{
                color:
                  hoveredLink && hoveredLink !== item ? "#A8AAAE" : "#333437",
              }}
            >
              {item}
            </MenuLink>
          ))}
        </InnerMenuItems>
        <SearchBar />
      </MenuItems>
    </Header>
  );
};

export default NavBar;
