import React, { Component } from 'react';
import ToggleButton from '../../atoms/ToggleButton/ToggleButton';
import styled from 'styled-components';

const StyledOptionWrapper = styled.div`
    padding: 15px;
`;

class Setting extends Component {
    state = {
        checked: true,
    };
    toggleCheck = () => {
        this.setState({
            checked: !this.state.checked,
        });
    };
    render() {
        return (
            <div>
                <StyledOptionWrapper>
                    <ToggleButton
                        onClick={this.toggleCheck}
                        checked={this.state.checked}
                        optionTitle={'Ciemne Tło'}
                    ></ToggleButton>{' '}
                </StyledOptionWrapper>
            </div>
        );
    }
}

export default Setting;
