import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 10px 40px;
    cursor: pointer;
    margin-right: 10px;
    display: inline-block;
`;
const Button = ({ color = 'green', children, onClick }) => {
    return (
        <StyledButton
            onClick={onClick}
            className={`bg-${color}-200 opacity-80 relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight`}
        >
            {children}
        </StyledButton>
    );
};

export default Button;
