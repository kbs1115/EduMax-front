import React from 'react';
import styled from 'styled-components';
import Typography, { colorMapping } from '../Typography';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 45px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid ${colorMapping.bright_blue};
  background: ${colorMapping.bright_blue};
  &:hover {
    background: ${colorMapping.hover_blue};
  }
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 300px; 
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 60px; /* 첫 번째 행과 두 번째 행의 간격 설정 */
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px; /* 두 요소 사이의 간격 */
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 40px;
  cursor: pointer;
  color: ${colorMapping.gray};
  &:hover {
    color: ${colorMapping.middle_gray};
  }
`;

const ErrorModal = ({ message, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <Typography size='body_content_medium' color='black_gray'>{message}</Typography>
          <ConfirmBtn onClick={onClose}>
            <Typography size='body_content_medium' color='white'>확인</Typography>
          </ConfirmBtn>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ErrorModal;
