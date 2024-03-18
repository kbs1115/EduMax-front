import React from "react";
import LecturesThumbnail from "../components/home/LecturesThumbnail";
import PageFrame from "../components/PageFrame";
import MainImage from "../components/home/MainImage";


function Home() {

  return (
    <PageFrame>
      <MainImage/>
      <LecturesThumbnail />
    </PageFrame>
  )
}

export default Home;
