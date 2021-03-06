import React from 'react';
import RootTheme from '../theme/RootTheme';
import ItemsList from '../components/organisms/ItemsList/ItemsList';
import Heading from '../components/atoms/Heading/Heading';

const RootView = () => {
    return (
        <>
            <Heading>Lista Produktów</Heading>
            <RootTheme>
                <ItemsList></ItemsList>
            </RootTheme>
        </>
    );
};

export default RootView;
