import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import QuestionBoard from './pages/QuestionBoard'; 
import {DataBoard} from './pages/DataBoard';
import NoticeBoard from './pages/NoticeBoard';
import FreeBoard from './pages/FreeBoard';
import LectureBoard from './pages/LectureBoard';
import Introduction from './pages/Introduction';
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/질문게시판" element={<QuestionBoard />} />
                <Route path="/post/자료게시판" element={<DataBoard />} />
                <Route path="/post/공지사항" element={<NoticeBoard />} />
                <Route path="/post/자유게시판" element={<FreeBoard />} />
                <Route path="/post/선생님강의" element={<LectureBoard />} />
                <Route path="/학원소개" element={<Introduction />} />
            </Routes> 
        </BrowserRouter>
    );
};

export default Router;