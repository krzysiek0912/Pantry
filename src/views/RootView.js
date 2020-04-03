import React from 'react';
import RootTheme from '../theme/RootTheme';
import ItemsList from '../components/organisms/ItemsList/ItemsList';

const RootView = () => {
    return (
        <RootTheme>
            <ItemsList></ItemsList>
        </RootTheme>
    );
};

export default RootView;
