import React from "react";
import SideBar from "../components/SideBar";
import PostListButton from "../components/buttons/PostListButton";
import PostTable from "../components/PostTable";
import PostOrder from "../components/PostOrder";

function QuestionBoard() {
  return (
  <>
   <PostListButton 
    width="98px" 
    height="43px" 
    size="body_content_medium" 
    buttonColor="#4A5BAB" 
    textColor="white"
   >
    글쓰기
   </PostListButton>
   <PostOrder />
  </>  
  );
}

export default QuestionBoard;

