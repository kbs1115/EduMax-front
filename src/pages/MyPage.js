import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useQuery } from "react-query";
import MyPageSideBar, { mypageMapping } from "../components/MyPageSideBar";
import AuthContext from "../context/AuthProvider";
import PostListButton from "../components/buttons/PostListButton";
import PostTable from "../components/post/PostTable";
import PostOrder from "../components/post/PostOrder";
import PostSearchBar from "../components/post/PostSearchBar";
import PostDropDown from "../components/post/PostDropdown";
import FindModal from "../components/modals/FindModal";
import Typography from "../components/Typography";
import { getMyCommentData, getMyPostData, getMyLikePostData, GetMyPageUser } from "../apifetchers/fetcher";
import LoadingSpinner from "../components/spinner";
import SearchBar from "../components/SearchBar";

const Wrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  gap: 50px;
`;

const BodyOuterWrapper = styled.div`
  width: 920px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  height: 54px;
  box-sizing: border-box;
  padding-bottom: 10px;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  border-bottom: 1px solid #393E46;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 72px;
  gap: 30px;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #DFE5EE;
`;

const InfoNameWrapper = styled.div`
  display: flex;
  width: 92px;
  height: 100%;
  padding: 10px 0px 10px 5px;
  align-items: center;
  justify-content: start;
  box-sizing: border-box;
`;

const EmailInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 5px;
`;

const BodyInnerWrapper = styled.div`
  margin-top: 10px;
  border-top: 2px solid #393E46;
  padding: 30px 0;
`;

const InnerCommentMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const InnerRightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const InfoPage = () => {
  const [isEmailModal, setIsEmailModal] = useState(false);
  const [isPwModal, setIsPwModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await GetMyPageUser();
        setUserData(data.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading user data</div>;

  return (
    <BodyOuterWrapper>
      <TitleWrapper>
        <Typography color="bright_black_gray" size="h2">회원정보</Typography>
        <Typography size="body_content_thin" color="gray">
          회원님의 정보를 안전하게 관리하세요.
        </Typography> 
      </TitleWrapper>
      <ContentWrapper>
        <InfoNameWrapper>
          <Typography size="body_sub_title" color="black_gray">닉네임</Typography>
        </InfoNameWrapper>
        <Typography size="body_content_thin" color="black_gray">{userData.nickname}</Typography>
      </ContentWrapper>
      <ContentWrapper>
        <InfoNameWrapper>
          <Typography size="body_sub_title" color="black_gray">이메일</Typography>
        </InfoNameWrapper>
        <EmailInfoWrapper>
          <Typography size="body_content_thin" color="black_gray">
            {userData.email}
          </Typography>
          <Typography size="body_content_small_thin" color="gray">
            <li>EduMax 인증수단으로 사용되는 이메일은 변경할 수 없습니다.</li>
          </Typography>
        </EmailInfoWrapper>
      </ContentWrapper>
      <ContentWrapper>
        <InfoNameWrapper>
          <Typography size="body_sub_title" color="black_gray">아이디</Typography>
        </InfoNameWrapper>
        <PostListButton
          width="78px"
          height="30px"
          size="body_content_small_thin"
          buttonColor="#717B8E"
          textColor="white"
          onClick={() => setIsEmailModal(true)}>아이디 찾기</PostListButton>
        <FindModal isOpen={isEmailModal} isPassword={false} onClose={() => setIsEmailModal(false)}/>
      </ContentWrapper>
      <ContentWrapper>
        <InfoNameWrapper>
          <Typography size="body_sub_title" color="black_gray">비밀번호</Typography>
        </InfoNameWrapper>
        <PostListButton
          width="90px"
          height="30px"
          size="body_content_small_thin"
          buttonColor="#717B8E"
          textColor="white"
          onClick={() => setIsPwModal(true)}>비밀번호 찾기</PostListButton>
        <FindModal isOpen={isPwModal} isPassword={true} onClose={() => setIsPwModal(false)}/>
      </ContentWrapper>
    </BodyOuterWrapper>
  );
};

const CommentPage = ({page = 1, setPage, category, searchOption, searchWord, setSearchOption, setSearchWord}) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate()

  // created_at or MOST_LIKE
  const [order, setOrder] = useState("created_at")

  const mypost = useQuery(
    category === 'posts' ? ['posts', category, page, searchWord] :
    category === 'comments' ? ['comments', page, searchWord] : 
    ['posts_like', category, page, searchWord],
    category === 'posts' ? () => getMyPostData('AL', searchOption, searchWord, page, order) :
    category === 'comments' ? () => getMyCommentData(page, searchWord) :
    () => getMyLikePostData('AL', searchOption, searchWord, page, order),
    {
      onError: (error) => {
        if (error.response.status === 401){
          alert("로그인이 필요합니다. 로그인을 진행해 주세요")
          logout();
          navigate("/login")
        }
      }
    }
  );

  if (mypost.isLoading) return <LoadingSpinner/>;

  return (
    <BodyOuterWrapper>
      <InnerCommentMenuWrapper>
        <Typography color="black_bright_gray" size="h2">
          {mypageMapping[category]}
        </Typography>
        <InnerRightWrapper>
          {category !== "comments" ? <PostDropDown 
            searchOption={searchOption} 
            setSearchOption={setSearchOption}/> : <></>}
          <PostSearchBar 
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            setPage={setPage}
          />
        </InnerRightWrapper>
      </InnerCommentMenuWrapper>
      <PostTable page={page} setPage={setPage} isComment={category === 'comments'} data={mypost.data}/>
    </BodyOuterWrapper>
  );
}

function MyPage() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("info")

  // AUTHOR, TITLE, CONTENT, TOTAL
  const [searchOption, setSearchOption] = useState("TOTAL")
  // 검색어
  const [searchWord, setSearchWord] = useState("")

  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요한 페이지입니다. 로그인을 먼저 진행해 주세요.")
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Wrapper>
      <MyPageSideBar 
        category={category} 
        setCategory={setCategory}
        setPage={setPage}
        setSearchOption={setSearchOption}
        setSearchWord={setSearchWord}/>
      {category === "info" ? <InfoPage /> : 
        <CommentPage 
          page={page} 
          setPage={setPage} 
          category={category}
          searchOption={searchOption}
          searchWord={searchWord}
          setSearchOption={setSearchOption}
          setSearchWord={setSearchWord}/>}
    </Wrapper>  
  );
}

export default MyPage;
