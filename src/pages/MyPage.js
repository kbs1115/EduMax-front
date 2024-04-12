import React from "react";
import { useState } from "react";
import styled from "styled-components";

import MyPageSideBar, { mypageMapping } from "../components/MyPageSideBar";
import PostListButton from "../components/buttons/PostListButton";
import PostTable from "../components/post/PostTable";
import PostOrder from "../components/post/PostOrder";
import PostSearchBar from "../components/post/PostSearchBar";
import PostDropDown from "../components/post/PostDropdown";
import FindModal from "../components/modals/FindModal";
import Typography from "../components/Typography";

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
`

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
`

const EmailInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: start;
	gap: 5px;
`;

const InfoPage = () => {
	const [isEmailModal, setIsEmailModal] = useState(false);
	const [isPwModal, setIsPwModal] = useState(false);

	return (<BodyOuterWrapper>
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
			<Typography size="body_content_thin" color="black_gray">김병수</Typography>
		</ContentWrapper>
		<ContentWrapper>
			<InfoNameWrapper>
				<Typography size="body_sub_title" color="black_gray">이메일</Typography>
			</InfoNameWrapper>
			<EmailInfoWrapper>
				<Typography size="body_content_thin" color="black_gray">
					bruce1115@naver.com
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
	</BodyOuterWrapper>);
}


function MyPage() {
  const [page, setPage] = useState(1);
	const [category, setCategory] = useState("info")

  return (
    <Wrapper>
      <MyPageSideBar 
				category={category} 
				setCategory={setCategory}
				setPage={setPage}/>
      {category === "info" ? <InfoPage /> : <></>}
    </Wrapper>  
  );
}

export default MyPage;
