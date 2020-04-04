import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    div {
        padding: 15px 0;
    }
`;
const Modal = (props) => {
    const { showModal, children } = props;
    const showHideClassName = showModal ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
            <StyledSection className="modal-main">{children}</StyledSection>
        </div>
    );
};

export default Modal;
