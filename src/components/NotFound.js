import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
`;

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <NotFoundContainer>
            <h1>404 Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
        </NotFoundContainer>
    );
};

export default NotFound;