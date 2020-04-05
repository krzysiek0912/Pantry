import React from 'react';
import styled from 'styled-components';

const StyledWrapperMessageBox = styled.div`
    margin-top: 15px;
    margin-bottom: 5px;
`;

const MessageBox = ({ title, children, color = 'red', onClick, noClose }) => {
    return (
        <StyledWrapperMessageBox
            className={`bg-${color}-200 text-${color}-700 px-6 py-4 rounded-lg relative mb-5`}
        >
            <div className="mr-4">
                {title ? (
                    <>
                        <strong className="font-bold">{title} </strong>
                        <br />
                    </>
                ) : null}
                <span className="block sm:inline">{children}</span>
            </div>

            {!noClose && (
                <span
                    onClick={onClick}
                    className={`cursor-pointer absolute top-0 bottom-0 right-0 hover:bg-${color}-100 hover:text-red-600 w-10 h-10 rounded-full inline-flex items-center justify-center mt-2 mr-3`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </span>
            )}
        </StyledWrapperMessageBox>
    );
};

export default MessageBox;
