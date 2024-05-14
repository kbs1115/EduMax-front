import React, { useState, useContext } from "react";

import LecturesThumbnail from "../components/home/LecturesThumbnail";
import BestVoteSubject from "../components/home/BestVoteSubject";
import PageFrame from "../components/PageFrame";
import MainImage from "../components/home/MainImage";
import PostCards from "../components/home/PostCards";

export const categoryDict = {
  국어: "KQ",
  수학: "MQ",
  영어: "EQ",
  탐구: "TQ"
}

function Home() {

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
