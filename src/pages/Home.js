import React from "react";
import LecturesThumbnail from "../components/home/LecturesThumbnail";
import BestVoteSubject from "../components/home/BestVoteSubject";
import PostCards from "../components/home/PostCards";
import PageFrame from "../components/PageFrame";
import MainImage from "../components/home/MainImage";



function Home() {

  return (
    <PageFrame>
      <MainImage/>
      <LecturesThumbnail />
      <BestVoteSubject />
      <PostCards />
    </PageFrame>
  )
}

export default Home;
