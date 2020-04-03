import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    margin: 10px 0 10px;
`;
const Heading = ({ children }) => {
    return (
        <StyledWrapper>
            <h2 className="text-2xl font-semibold leading-tight">{children}</h2>
        </StyledWrapper>
    );
};

export default Heading;
