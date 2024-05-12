import styled, { keyframes } from 'styled-components';
import React, { useState, useEffect } from "react";

// Spinner animation definition
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled spinner component
const Spinner = styled.div`
  border: 12px solid rgba(0, 0, 0, 0.1); // Increased border thickness for visibility
  border-left-color: #4C6BFF; // Vivid color for the spinner
  border-radius: 50%;
  width: 25px; // Increased size for better visibility
  height: 25px; // Increased size for better visibility
  animation: ${rotate} 2s linear infinite; // Spinner animation

  position: fixed; // Fixed to the viewport
  top: 50%; // Center vertically
  left: 50%; // Center horizontally
  transform: translate(-50%, -50%); // Offset for exact center
`;

// Container that always shows the spinner
const SpinnerContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent background
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Text style for error message
const ErrorMessage = styled.div`
  color: white; // Text color for visibility
  font-size: 16px; // Appropriate font size for readability
  position: fixed;
  top: 70%; // Position slightly below the center
`;

// LoadingSpinner component with timeout for error message
export const LoadingSpinner = () => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowError(true); // Set showError to true after 20 seconds
    }, 20000); // 20000 milliseconds = 20 seconds

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, []);

  return (
    <SpinnerContainer>
      <Spinner />
      {showError && <ErrorMessage>네트워크 혹은 서버 문제가 발생하였습니다</ErrorMessage>}
    </SpinnerContainer>
  );
};

export default LoadingSpinner;