import React, { Component } from 'react';
import AppContext from '../context';
import { Link } from 'react-router-dom';
import Heading from '../components/atoms/Heading/Heading';
import FormFroduct from '../components/organisms/FormProduct/FormProduct';
import Button from '../components/atoms/Button/Button';

class SingleProductTheme extends Component {
    render() {
        return (
            <AppContext.Consumer>
                {context => {
                    return (
                        <>
                            <Heading>{'Edytuj'} Produkt</Heading>
                            <Link to={'/'}>
                                <Button>Wróć do listy</Button>
                            </Link>
                            <FormFroduct addItem={context.addItem}></FormFroduct>
                        </>
                    );
                }}
            </AppContext.Consumer>
        );
    }
}

export default SingleProductTheme;
