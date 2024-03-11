import React from 'react';
import '../navbar.css'; // Ensure that the path to your CSS file is correct
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/">
            <img src='logo192.png' alt="에듀맥스 로고" />
          </Link>
        </div>
        <div className="edumax-container">
          <Link to="/">EduMax</Link>
        </div>
      </div>
      <nav className="menu-items">
        <Link to="/post/question-board">질문게시판</Link>
        <Link to="/post/data-board">자료게시판</Link>
        <Link to="/post/free-board">자유게시판</Link>
        <Link to="/post/lecture-board">선생님강의</Link>
        <Link to="/post/notice-board">공지사항</Link>
        <Link to="/introduction">학원소개</Link>
      </nav>
    </header>
  );
};

export default Navbar;