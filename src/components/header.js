import React ,{ useState }from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import searchIcon from '../assets/nav_search_icon.png';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    // Implement your logic to handle the submission, e.g., redirecting to a search results page
    console.log('Submitting:', inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="검색..."
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      <SearchIcon
        src={searchIcon}
        alt="Search"
        onClick={handleSubmit}
        style={{ cursor: 'pointer' }} // Make the icon appear clickable
      />
    </SearchContainer>
  );
};

const Navbar = () => {
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
          {['질문게시판', '자료게시판', '자유게시판', '선생님강의', '공지사항', '학원소개'].map((item, index) => (
            <MenuLink
              key={index}
              to={`/post/${item}`}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
              style={{
                color: hoveredLink && hoveredLink !== item ? '#A8AAAE' : '#333437',
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

export default Navbar;
const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  margin-top: 20px;
  border-bottom: 2px solid #045DEB; // Bottom stroke color and thickness
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
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #333437;
  text-decoration: none;
  letter-spacing: 0px;
  transition: color 0.5s ease; // Add this line
  padding 10px 0 10px 0;
  &:hover {
    color: #A8AAAE; // Specify the hover color if needed
  }
`;

const SecondaryNavigation = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  gap: 20px; // Spacing between tabs
`;
const NavItem = styled(Link)`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  font-weight:700;
  color: #393E46;
  text-decoration: none;
  letter-spacing:0px;
  &:hover {
    text-decoration: underline;
  }
`;
const SearchContainer = styled.div`
  position: relative;
  width: 284px;
  height: 29px;
  background-color: #F3F4F8;
  border-radius: 15px;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 100%;
  padding: 0 0px 0 20px; // Right padding to make room for the icon
  border: none;
  border-radius: 15px;
  background-color: transparent;
  outline: none;

  ::placeholder {
    color: #A3A3A3;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px; // Adjust the size as needed
  height: 14px; // Adjust the size as needed
`;
