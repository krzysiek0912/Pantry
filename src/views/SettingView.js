import React from 'react';
import RootTheme from '../theme/RootTheme';
import Setting from '../components/organisms/Setting/Setting';
import Heading from '../components/atoms/Heading/Heading';

const RootView = () => {
    return (
        <>
            <Heading>Ustawienia</Heading>
            <RootTheme>
                <Setting />
            </RootTheme>
        </>
    );
};

export default RootView;
