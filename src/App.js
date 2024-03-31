import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import QuestionBoard from './pages/QuestionBoard';
import { DataBoard } from './pages/DataBoard';
import NoticeBoard from './pages/NoticeBoard';
import FreeBoard from './pages/FreeBoard';
import LectureBoard from './pages/LectureBoard';
import Introduction from './pages/Introduction';
import LoginPage from './pages/LoginPage';
import PostCreatePage from './pages/PostCreatePage';

function App() {
  const location = useLocation(); // 현재 경로를 얻기 위해 useLocation 훅 사용

  return (
    <>
      {location.pathname !== '/login' && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/question" element={<QuestionBoard />} />
        <Route path="/post/data" element={<DataBoard />} />
        <Route path="/post/notice" element={<NoticeBoard />} />
        <Route path="/post/free" element={<FreeBoard />} />
        <Route path="/lecture" element={<LectureBoard />} />
        <Route path="/intro" element={<Introduction />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-post" element={<PostCreatePage />} />
      </Routes>
    </>
  );
}

export default App;
