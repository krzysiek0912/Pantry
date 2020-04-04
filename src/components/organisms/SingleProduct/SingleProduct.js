import React, { Component } from 'react';
import AppContext from '../../../context';
import FormFroduct from '../FormProduct/FormProduct';
import { withRouter } from 'react-router';

class SingleProduct extends Component {
    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    const idParams = parseFloat(this.props.match.params.id);
                    const productToEdit = context.items.find(
                        ({ id }) => idParams === parseFloat(id),
                    );

                    return (
                        <>
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

export default withRouter(SingleProduct);
