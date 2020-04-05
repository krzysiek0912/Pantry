import React, { Component } from 'react';
import { getOneSettingRequest, editSettingRequest, getAllSettingRequest } from '../../../firebase';
import ToggleButton from '../../atoms/ToggleButton/ToggleButton';
import styled from 'styled-components';

const StyledOptionWrapper = styled.div`
    padding: 15px;
`;

class Setting extends Component {
    state = {
        checkedDarkTheme: true,
        theme: 'dark',
        timeToUpdate: 10000,
        settingIsLoaded: false,
    };

    componentDidMount() {
        getAllSettingRequest((settings) => {
            this.setState((prevState) => ({
                ...settings,
                settingIsLoaded: !prevState.settingIsLoaded,
            }));
        });
    }
    handleChange = ({ target: { value } }) => {
        const timeToUpdate = parseInt(value);
        editSettingRequest('timeToUpdate', timeToUpdate, () => {
            this.setState({ timeToUpdate });
            this.props.updateSettings({ timeToUpdate });
        });
        console.log('time to update hande', timeToUpdate);
        this.props.updateSettings({ ...timeToUpdate });
    };
    toggleCheckDarkTheme = () => {
        editSettingRequest('checkedDarkTheme', !this.state.checkedDarkTheme, () => {
            this.setState((prevState) => ({ checkedDarkTheme: !prevState.checkedDarkTheme }));
        });
        // this.props.updateSettings(!this.state.checkedDarkTheme);
    };
    render() {
        const { settingIsLoaded, timeToUpdate, checkedDarkTheme } = this.state;
        return !settingIsLoaded ? null : (
            <div>
                <StyledOptionWrapper>
                    <ToggleButton
                        onClick={this.toggleCheckDarkTheme}
                        checked={checkedDarkTheme}
                        optionTitle={'Ciemne Tło'}
                    ></ToggleButton>
                </StyledOptionWrapper>
                <StyledOptionWrapper>
                    <select value={timeToUpdate} onChange={this.handleChange}>
                        <option value={1 * 1000}>1 minuta( do testów )</option>
                        <option value={60 * 60 * 1000}>60 minut</option>
                        <option value={24 * 60 * 60 * 1000}>1 dzień</option>
                    </select>
                </StyledOptionWrapper>
            </div>
        );
    }
}

export default Setting;
