import React from 'react';
import RootTheme from '../theme/RootTheme';
import Heading from '../components/atoms/Heading/Heading';
import SingleIeProduct from '../components/organisms/SingleProduct/SingleProduct';
import { withRouter } from 'react-router';

const SingleIeProductView = ({ match }) => {
    console.log('match', match.path);
    return (
        <>
            <Heading>{match.path === '/add' ? 'Dodaj' : 'Edytuj'} Produkt</Heading>
            <RootTheme>
                <SingleIeProduct></SingleIeProduct>
            </RootTheme>
        </>
    );
};

export default withRouter(SingleIeProductView);
