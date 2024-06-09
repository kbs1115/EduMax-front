import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import QuestionBoard from './pages/QuestionBoard';
import DataBoard from './pages/DataBoard';
import NoticeBoard from './pages/NoticeBoard';
import FreeBoard from './pages/FreeBoard';
import LectureBoard from './pages/LectureBoard';
import Introduction from './pages/Introduction';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import PostCreatePage from './pages/PostCreatePage';
import EmailModal from './components/modals/FindModal';
import PostDetailPage from './pages/PostDetail';
import MyPage from './pages/MyPage';
import AlarmModal from './components/modals/AlarmModal';
import LectureDetial from './pages/LectureDetail';
import NotFound from './components/NotFound';
import AlertModal from './components/modals/AlertModal';
import Footer from './components/Footer';
import GoogleLoginPage from './pages/GoogleLoginPage';


const queryClient = new QueryClient()

function App() {
  const location = useLocation(); // 현재 경로를 얻기 위해 useLocation 훅 사용

  return (
    <QueryClientProvider client={queryClient}>
      {location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/find' && location.pathname !== "/login/google" &&<NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/question" element={<QuestionBoard />} />
        <Route path="/post/data" element={<DataBoard />} />
        <Route path="/post/notice" element={<NoticeBoard />} />
        <Route path="/post/free" element={<FreeBoard />} />
        <Route path="/post/lecture" element={<LectureBoard />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path="/intro" element={<Introduction />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-post" element={<PostCreatePage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/find" element={<EmailModal isPassword={true} />} />
        <Route path="/post/:postId" element={<PostDetailPage />} />
        <Route path="/post/lecture/:lectureId" element={<LectureDetial />} />
        <Route path="/error" element={<AlertModal message={"에러 모달 디자인 샘플입니다."} />} />
        <Route path="/login/google" element={<GoogleLoginPage />} />
      </Routes>
      {location.pathname !== "/login/google" && <Footer />}
    </QueryClientProvider>
  );
}

export default App;
