import React, { Component } from 'react';
import AppContext from '../context';
import { Link } from 'react-router-dom';
import Heading from '../components/atoms/Heading/Heading';
import FormFroduct from '../components/organisms/FormProduct/FormProduct';
import Button from '../components/atoms/Button/Button';
import { withRouter } from 'react-router';
class SingleProductTheme extends Component {
    render() {
        return (
            <AppContext.Consumer>
                {context => {
                    const idParams = parseFloat(this.props.match.params.id);
                    const productToEdit = context.items.find(
                        ({ id }) => idParams === parseFloat(id),
                    );

                    return (
                        <>
                            <Heading>{'Edytuj'} Produkt</Heading>
                            <Link to={'/'}>
                                <Button>Wróć do listy</Button>
                            </Link>
                            <FormFroduct
                                product={productToEdit}
                                addItem={context.addItem}
                            ></FormFroduct>
                        </>
                    );
                }}
            </AppContext.Consumer>
        );
    }
}

export default withRouter(SingleProductTheme);
