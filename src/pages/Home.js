import React from "react";
import LecturesThumbnail from "../components/home/LecturesThumbnail";
import BestVoteSubject from "../components/home/BestVoteSubject";
import PageFrame from "../components/PageFrame";
import MainImage from "../components/home/MainImage";



function Home() {

  return (
    <PageFrame>
      <MainImage/>
      <LecturesThumbnail />
      <BestVoteSubject />
    </PageFrame>
  )
}

export default Home;
