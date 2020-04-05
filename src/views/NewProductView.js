import React from 'react';
import RootTheme from '../theme/RootTheme';
import Heading from '../components/atoms/Heading/Heading';
import SingleIeProduct from '../components/organisms/SingleProduct/SingleProduct';

const NewProductView = () => {
    return (
        <>
            <Heading>Dodaj Produkt</Heading>
            <RootTheme>
                <SingleIeProduct isNewItem></SingleIeProduct>
            </RootTheme>
        </>
    );
};

export default NewProductView;
