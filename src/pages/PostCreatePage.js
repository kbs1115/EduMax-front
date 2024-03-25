import React from "react";
import styled from "styled-components";
import PostCreateForm from "../components/PostCreate/PostCreateForm";

const Wrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: center;
  gap: 50px;
`;



function PostCreatePage() {
    return (
        <Wrapper>
            <PostCreateForm />
        </Wrapper>
    )
};
export default PostCreatePage;