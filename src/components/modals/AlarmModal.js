import React from "react";
import { useState, useContext } from "react";
import styled from "styled-components";
import { colorMapping } from "../Typography";
import Typography from "../Typography";
import close_button from "../../assets/close_button.svg"
import { ResponseAlarmListA1, ResponseAlarmListA2, ResponseAlarmListA3, ResponseAlarmListB1 } from '../../TestData/AlarmListTestData';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GetAlarms } from "../../apifetchers/fetcher";
import AuthContext from "../../context/AuthProvider";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto; // Allows scrolling within the backdrop if needed
`;
const ModalWrapper = styled.div`
display: inline-flex;
height: 700px;
padding: 20px 0px 0px 0px;
flex-direction: column;
align-items: center;
border-radius: 20px;
background: #FFF;
overflow-y: auto; // Enables scrolling within the modal
  scrollbar-width: thin; // Optional: for styling scrollbars in Firefox
  &::-webkit-scrollbar {
    width: 8px; // Optional: for styling scrollbars in WebKit browsers
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 10px;
  }
`;

const TitleWrapper = styled.div`
display: flex;
padding: 0px 20px 20px 25px;
justify-content: space-between;
align-items: center;
align-self: stretch;
`;

const CloseBtn = styled.img`
width: 20px;
height: 20px;
flex-shrink: 0;
fill:${colorMapping.middle_gray};
cursor: pointer; 
`;

const ContentsWrapper = styled.div`
display: flex;
padding: 10px 5px 0 10px;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const ContentWrapper = styled.div`
Frame 491
display: flex;
padding: 0px 20px;
flex-direction: column;
align-items: flex-start;
cursor: pointer;
border-radius: 20px;
transition: background-color 0.1s ease; // Optional: Smooth transition for background color change

&:hover {
  background-color: #CBDFFF; // Set background color on hover
}
`


const SubjectAndDateWrapper = styled.div`
display: flex;
width: 382px;
padding: 10px 10px 5px 5px;
justify-content: space-between;
align-items: center;
`

const MessageWrapper = styled.div`
display: flex;
width: 402px;
padding: 0px 10px 8px 10px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
border-bottom: 1px solid ${colorMapping.middle_gray};
`
const EmptyMessageWrapper = styled.div`
display: flex;
width: 402px;
padding: 60px 10px;
justify-content: center;
align-items: center;
gap: 20px;
`
const PageNumWrapper = styled.div`
display: inline-flex;
padding: 10px 5px 20px 5px;
align-items: flex-start;
gap: 15px;
`
const PageNum = styled.div`
display: inline-flex;
padding: 10px 10px 10px 10px;
justify-content: center;
align-items: center;
gap: 10px;
user-select: none;
border-radius: 10px;
cursor: pointer;
transition: background-color 0.2s ease; // Optional: Smooth transition for background color change

&:hover {
  background-color: #CBDFFF; // Set background color on hover
}
`;

const EmptyContentWrapper = styled.div`
display: flex;
padding: 10px 5px;
flex-direction: column;
justify-content: center;
align-items: center;
`
const AlarmModal = ({ onClose }) => {

    const truncateNickname = (nickname) => {
        return nickname.length > 10 ? `${nickname.substring(0, 20)}...` : nickname;
    };
    const [alarms, setAlarms] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate(); // Use useNavigate here

    useEffect(() => {
        // Prevent scrolling on mount
        document.body.style.overflow = 'hidden';
        // Restore on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        // Check if user is authenticated
        if (!isAuthenticated) {
            // Show confirmation dialog
            const userChoice = window.confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?');
            if (userChoice) {
                // If user clicks 'OK', navigate to login page
                navigate('/login');
            } else {
                // If user clicks 'Cancel', do nothing and exit
                onClose();
            }
        } else {
            // User is authenticated, proceed to fetch alarms
            const fetchAlarms = async () => {
                try {
                    const response = await GetAlarms(currentPage);
                    setAlarms(response.data);
                } catch (error) {
                    console.error('Failed to fetch alarms:', error);
                }
            };

            fetchAlarms();
        }
    }, [isAuthenticated, navigate, currentPage]);



    const handlePostRedirect = (postId) => {
        onClose(); // Close the modal first
        navigate(`/post/${postId}`); // Then navigate to the post
    };

    const totalPages = alarms ? alarms.total_page_count : 0;
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);



    return (
        <Backdrop onClick={onClose}> {/* Clicking outside the modal will close it */}
            <ModalWrapper onClick={e => e.stopPropagation()}> {/* Prevents modal close when clicking inside */}
                <TitleWrapper>
                    <Typography size="h2" color="black">알림</Typography>
                    <CloseBtn src={close_button} onClick={onClose} />
                </TitleWrapper>
                <ContentsWrapper>
                {alarms && alarms.alarm_list.length > 0 ? (
                        alarms.alarm_list.map((item, index) => (
                            <ContentWrapper key={index} onClick={() => handlePostRedirect(item.post_id)}>
                                <SubjectAndDateWrapper>
                                    <Typography size="body_content_regular" color="black_gray">
                                        <span style={{ fontSize: "14px", fontWeight: "700" }}>{'[댓글]'}</span>
                                    </Typography>
                                    <Typography size="body_content_small" color="gray">{item.created_at}</Typography>
                                </SubjectAndDateWrapper>
                                <MessageWrapper>
                                    <Typography size="body_content_regular" color="black_gray">
                                        <span style={{ color: '#4C6BFF',  fontWeight: "700" }}>{truncateNickname(item.comment_author)}</span> 님이 회원님의
                                    </Typography>
                                    <Typography size="body_content_regular" color="black_gray">
                                        <span style={{ width: '900px',  fontWeight: "700" }}>{truncateNickname(item.post_title)}</span> 게시글에 댓글을 달았습니다.
                                    </Typography>
                                </MessageWrapper>
                            </ContentWrapper>
                        ))
                    ) : (
                        <EmptyContentWrapper>
                            <EmptyMessageWrapper>
                                <Typography size="h3_medium" color="gray">알림이 도착한게 아직 없어요</Typography>
                            </EmptyMessageWrapper>
                        </EmptyContentWrapper>

                    )}
                </ContentsWrapper>
                <PageNumWrapper>
                    {pages.map(page => (
                        <PageNum key={page} onClick={() => setCurrentPage(page)}>
                            <Typography size="h3_medium" color={page === currentPage ? "black_gray" : "gray"}>{page}</Typography>
                        </PageNum>
                    ))}
                </PageNumWrapper>
            </ModalWrapper>
        </Backdrop>
    );
};

export default AlarmModal;