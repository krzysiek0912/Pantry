import React from 'react';
import AppContext from '../context';
import RootTheme from '../theme/RootTheme';
import Setting from '../components/organisms/Setting/Setting';
import Heading from '../components/atoms/Heading/Heading';

const RootView = () => {
    return (
        <AppContext.Consumer>
            {({ updateSettings }) => {
                return (
                    <>
                        <Heading>Ustawienia</Heading>
                        <RootTheme>
                            <Setting updateSettings={updateSettings} />
                        </RootTheme>
                    </>
                );
            }}
        </AppContext.Consumer>
    );
};

export default RootView;
