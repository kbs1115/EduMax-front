import React, { useState, useRef } from 'react';
import styled from "styled-components";
import Typography from "../Typography";
import { colorMapping } from "../Typography";
import file_image from "../../assets/file_image.png";

const FileWrapper = styled.div`
display: flex;
padding: 10px;
flex-direction: column;
justify-content: center;
align-items: flex-start;
gap: 10px;
align-self: stretch;
`;

const FileWrapperrFirstRow = styled.div`
display: flex;
padding: 10px 0px;
align-items: center;
gap: 20px;
align-self: stretch;
`;
const FileWrapperSecondRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  gap: 10px;
  align-self: stretch;
  border-radius: 5px;
  border: 1px solid ${props => props.isDragOver ? '#4A5BAB' : colorMapping.bright_gray};
  cursor: pointer;
  &:hover,
  &:focus {
    border-color: #4A5BAB;
    border-width: 2px;
  }
  ${props => props.$isDragOver && `
    border-color: #4A5BAB;
    border-width: 2px;
  `}
`
const FileItem = styled.div`
display: flex;
padding: 10px 10px;
align-items: center;
gap: 20px;
align-self: stretch;
justify-content: space-between;
  border: 1px solid ${colorMapping.bright_gray}
`;

const DeleteButton = styled.button`
  background: ${colorMapping.white};
  color: ${colorMapping.navy};
  border: none;
  padding: 5px 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const DescriptionWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const FileImage = styled.img`
width: 30px;
height: 30px;
flex-shrink: 0;
`
const Textwrapper = styled.div`
display: flex;
padding: 10px;
justify-content: center;
align-items: center;
gap: 10px;
`
const FileUploader = ({files, setFiles }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        addFiles(newFiles);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const newFiles = Array.from(e.dataTransfer.files);
        addFiles(newFiles);
    };

    const addFiles = (newFiles) => {
        let updatedFiles = [...files, ...newFiles];
        let totalSize = updatedFiles.reduce((acc, file) => acc + file.size, 0);
    
        if (totalSize > 20 * 1024 * 1024) {
            setError('최대 20MB 의 파일을 업로드 할 수 있습니다.');
            // Don't set the files to updatedFiles if the total exceeds 20MB
        } else {
            setFiles(updatedFiles);
            setError(''); // Clear the error if the total size is within the limit
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        setIsDragOver(false);
    };

    const deleteFile = (fileName) => {
        setFiles(files.filter(file => file.name !== fileName));
    };

    return (
        <FileWrapper>
            <FileWrapperrFirstRow>
                <Typography size="h3_medium" color="black_gray">파일 업로드</Typography>
                <Typography size="body_content_small_thin" color="black_gray" style={{ opacity: 0.8 }}>
                    <span style={{ color: '#4A5BAB' }}>최대 20MB</span> 의 파일을 업로드 할 수 있어요
                </Typography>
            </FileWrapperrFirstRow>
            <FileWrapperSecondRow
                onClick={() => fileInputRef.current.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                isDragOver={isDragOver}
            >
                <input
                    type="file"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
                <DescriptionWrapper>
                    <FileImage src={file_image} />
                    <Textwrapper>
                        <Typography size="body_content_regular" color="gray">
                            드래그 앤 드롭 또는 <span style={{ color: '#4A5BAB' }}>클릭</span>하여 파일을 업로드 하세요
                        </Typography>
                    </Textwrapper>
                    {error && <Typography size="body_content_regular" color="red">{error}</Typography>}
                </DescriptionWrapper>
            </FileWrapperSecondRow>

            {files.map((file, index) => (
                <FileItem key={index}>
                    {file.name}
                    <DeleteButton onClick={() => deleteFile(file.name)}>X</DeleteButton>
                </FileItem>
            ))}
        </FileWrapper>
    )
}
export default FileUploader;