import React, { useState } from "react";
import styled from "styled-components";
import { colorMapping } from "../Typography";
import Typography from "../Typography";
import PostCreateDropdown from "./PostCreateDropdown";
import PostCreateButton from "../buttons/PostCreateButton";
import CkeditorBox from "./CkeditorBox";
import FileUploader from "./Fileupload";
const MainContainer = styled.div`
    display: flex;
    height: 902px;
    padding: 0px 34px 34px 34px;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 5px;
`;

const TitleWrapper = styled.div`
display: flex;
padding: 20px 0px 10px 0px;
align-items: center;
align-self: stretch;
border-bottom: 2px solid ${colorMapping.black_gray};
`;

const SelectCategoryWrapper = styled.div`
display: flex;
width: 854px;
padding: 10px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
`;

const InputTitleWrapper = styled.div`
display: flex;
padding: 10px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 10px;
align-self: stretch;
`;

const InputContentWrapper = styled.div`
display: flex;
padding: 0px 10px;
flex-direction: column;
align-items: center;
align-self: stretch;
`;

const SelectCategorycontainer = styled.div`
display: flex;
padding: 10px 0px 10px 0px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 10px;
align-self: stretch;
`;

const SelectCategoryFirstRow = styled.div`
display: flex;
align-items: center;
gap: 20px;
`;

const InputTitleFirstRow = styled.div`
display: flex;
align-items: center;
gap: 20px;
align-self: stretch;
`;
const InputTitleSecondRow = styled.div`
    display: flex;
    padding: 10px 20px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 5px;
    border: 1px solid ${colorMapping.bright_gray};
`
const StyledInput = styled.input`
    flex-grow: 1;
    border: none;
    background-color: transparent;
    color: ${colorMapping.black_gray};
    padding: 0;
    margin: 0;
    font-size: 16px;
    &::placeholder {
        color: ${colorMapping.gray};
    }
    &:focus {
        outline: none;
    }
    &:max-length {
        max-length: 30;  // This will limit the input length
    }
`;

const InputContentFirstRow = styled.div`
display: flex;
padding: 10px 10px 10px 0px;
align-items: center;
gap: 20px;
align-self: stretch;
`;

const InputContentSecondRow = styled.div`
  align-self: stretch;
`

const SubmitWrapper = styled.div`
display: flex;
padding: 0px 10px;
flex-direction: column;
align-items: flex-start;
gap: 10px;
align-self: stretch;
`;


const PostCreateForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [files, setFiles] = useState([]);

    const [titleError, setTitleError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        if (event.target.value.trim() !== '') setTitleError(false);
    };

    const handleContentChange = (newContent) => {
        setContent(newContent);
        if (newContent.trim() !== '') setContentError(false);
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        if (selectedCategory.trim() !== '') setCategoryError(false);
    };

    const validateInputs = () => {
        let isValid = true;
        if (title.trim() === '') {
            setTitleError(true);
            isValid = false;
        }
        if (content.trim() === '') {
            setContentError(true);
            isValid = false;
        }
        if (category.trim() === '') {
            setCategoryError(true);
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = () => {
        if (!validateInputs()) return;

        const postData = {
            category,
            title,
            html_content: content,
            files, 

        };
        console.log(postData);
        // 서버 api로 보내야함
    };

    const isFormValid = title.trim() && content.trim() && category.trim();
    return (
        <MainContainer>
            <Wrapper>
                <TitleWrapper>
                    <Typography size="h1" color="black_gray">게시글 생성</Typography>
                </TitleWrapper>

                <SelectCategoryWrapper>
                    <SelectCategorycontainer>
                        <SelectCategoryFirstRow>
                            <Typography size="h3_medium" color="black_gray">게시판 선택</Typography>
                            <Typography size="body_content_small_thin" color="black_gray" style={{ opacity: 0.8 }}>게시글의 종류에 맞는 게시판에 넣어주세요</Typography>
                        </SelectCategoryFirstRow>
                        <PostCreateDropdown onCategorySelect={handleCategorySelect} />
                        {categoryError && <Typography size="body_content_medium" color="timer_red">게시판을 선택해주세요</Typography>}
                    </SelectCategorycontainer>
                </SelectCategoryWrapper>

                <InputTitleWrapper>
                    <InputTitleFirstRow>
                        <Typography size="h3_medium" color="black_gray">제목</Typography>
                        <Typography size="body_content_small_thin" color="black_gray" style={{ opacity: 0.8 }}>30글자 이하의 제목을 만들어주세요</Typography>
                    </InputTitleFirstRow>
                    <InputTitleSecondRow>
                        <StyledInput
                            type="text"
                            placeholder="e.g: 미적분 과목의 도함수관련 질문입니다."
                            value={title}
                            onChange={handleTitleChange}
                            maxLength="30"  
                        />
                    </InputTitleSecondRow>
                    {titleError && <Typography size="body_content_medium" color="timer_red">제목을 입력해주세요</Typography>}
                </InputTitleWrapper>

                <InputContentWrapper>
                    <InputContentFirstRow>
                        <Typography size="h3_medium" color="black_gray">내용</Typography>
                        <Typography size="body_content_small_thin" color="black_gray" style={{ opacity: 0.8 }}>최소 한글자 이상 적어주세요</Typography>
                    </InputContentFirstRow>
                    <InputContentSecondRow>
                        <CkeditorBox setContent={handleContentChange} />
                        {contentError && <Typography size="body_content_medium" color="timer_red">내용을 입력해주세요</Typography>}
                    </InputContentSecondRow>
                </InputContentWrapper>
                <FileUploader files={files} setFiles={setFiles} />
            </Wrapper>
            <SubmitWrapper>
                <PostCreateButton onClick={handleSubmit} isValid={isFormValid} />
            </SubmitWrapper>
        </MainContainer>
    )
}

export default PostCreateForm;