import React, { useState, useContext, useEffect } from "react";

import LecturesThumbnail from "../components/home/LecturesThumbnail";
import BestVoteSubject from "../components/home/BestVoteSubject";
import PageFrame from "../components/PageFrame";
import MainImage from "../components/home/MainImage";
import PostCards from "../components/home/PostCards";
import { requestNotificationPermission } from '../firebase-messaging';
import { registerFCMToken } from '../apifetchers/fetcher';
import AuthContexts from "../context/AuthProvider";

export const categoryDict = {
  국어: "KQ",
  수학: "MQ",
  영어: "EQ",
  탐구: "TQ"
}

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);
  const { isAuthenticated } = useContext(AuthContexts);

  useEffect(() => {
    if (isAuthenticated) {
      handleRequestPermission();
    }
  }, [isAuthenticated]);

  const handleRequestPermission = () => {
    requestNotificationPermission().then(token => {
      if (token) {
        console.log('Received FCM token:', token);
        // Call the function to register the token to the server
        registerFCMToken(token).then(response => {
          console.log('FCM token registered successfully:', response);
        }).catch(error => {
          console.error('Error registering FCM token:', error);
        });
      } else {
        console.log('Failed to get permission or token.');
      }
    }).catch(error => {
      console.error('Error requesting notification permission:', error);
    });
  };
  return (
    <PageFrame>
      <MainImage/>
      <LecturesThumbnail />
      <div style={{ width: "1175px", height: "480px"}}><BestVoteSubject /></div>
      <PostCards />
    </PageFrame>
  )
}

export default Home;
