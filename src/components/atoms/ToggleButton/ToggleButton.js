import React from 'react';
import styled from 'styled-components';

const StyledWrapperOption = styled.span`
    display: flex;
`;
const StyledOnWrapper = styled.span`
    background: #38c172;
`;
const StyledOption = styled.div`
    display: inline-block;
    margin-left: 10px;
`;

const ToggleButton = ({ checked, onClick, optionTitle = 'On/Off' }) => {
    return (
        <StyledWrapperOption onClick={onClick}>
            {!checked ? (
                <>
                    <span className="border rounded-full border-grey flex items-center cursor-pointer w-12 justify-start">
                        <span className="rounded-full border w-6 h-6 border-grey shadow-inner bg-white shadow"></span>
                    </span>
                </>
            ) : (
                <>
                    <StyledOnWrapper className="border rounded-full border-green flex items-center cursor-pointer w-12 bg-green justify-end">
                        <span className="rounded-full border w-6 h-6 border-grey shadow-inner bg-white shadow"></span>
                    </StyledOnWrapper>
                </>
            )}
            <StyledOption>{optionTitle}</StyledOption>
        </StyledWrapperOption>
    );
};

export default ToggleButton;
