import React from 'react';
import RootTheme from '../theme/RootTheme';
import ShopList from '../components/organisms/ShopList/ShopList';
import Heading from '../components/atoms/Heading/Heading';

const ShopListView = () => {
    return (
        <>
            <Heading>Lista Zakupów</Heading>
            <RootTheme>
                <ShopList></ShopList>
            </RootTheme>
        </>
    );
};

export default ShopListView;
