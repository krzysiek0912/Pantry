import React, { Component } from 'react';
import AppContext from '../../../context';
import FormProduct from '../FormProduct/FormProduct';
import { withRouter } from 'react-router';
class SingleProduct extends Component {
    render() {
        return (
            <AppContext.Consumer>
                {(context) => {
                    const idParams = this.props.match.params.id;
                    const productToEdit = context.products.find(({ id }) => idParams === id);

                    return (
                        <>
                            <FormProduct
                                product={productToEdit}
                                addProduct={context.addProduct}
                                editProduct={context.editProduct}
                                toggleModal={context.toggleModal}
                            ></FormProduct>
                        </>
                    );
                }}
            </AppContext.Consumer>
        );
    }
}

export default withRouter(SingleProduct);
