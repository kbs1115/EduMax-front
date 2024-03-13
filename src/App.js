import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import QuestionBoard from "./pages/QuestionBoard";
import { DataBoard } from "./pages/DataBoard";
import NoticeBoard from "./pages/NoticeBoard";
import FreeBoard from "./pages/FreeBoard";
import LectureBoard from "./pages/LectureBoard";
import Introduction from "./pages/Introduction";
import SideBar from "./components/SideBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/question" element={<QuestionBoard />} />
        <Route path="/post/data" element={<DataBoard />} />
        <Route path="/post/notice" element={<NoticeBoard />} />
        <Route path="/post/free" element={<FreeBoard />} />
        <Route path="/post/lecture" element={<LectureBoard />} />
        <Route path="/post/intro" element={<Introduction />} />
      </Routes>
    </>
  );
}

export default App;
