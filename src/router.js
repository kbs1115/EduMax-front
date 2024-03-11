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
                <Route path="/post/question-board" element={<QuestionBoard />} />
                <Route path="/post/data-board" element={<DataBoard />} />
                <Route path="/post/notice-board" element={<NoticeBoard />} />
                <Route path="/post/free-board" element={<FreeBoard />} />
                <Route path="/post/lecture-board" element={<LectureBoard />} />
                <Route path="/introduction" element={<Introduction />} />
            </Routes> 
        </BrowserRouter>
    );
};

export default Router;