import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import RootView from './views/RootView';
import AppContext from './context';
import {
    getAllProducts,
    addNewProductRequest,
    editProductRequest,
    deleteProductRequest,
} from './firebase';
import SingleProductView from './views/SingleIeProductView';
import ShopListView from './views/ShopListView';
import SettingView from './views/SettingView';
import Modal from './components/molecules/Modal/Modal';
import Button from './components/atoms/Button/Button';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    min-height: 100vh;
`;

class App extends Component {
    state = {
        products: [],
        showModal: false,
        productIdToRemove: null,
        order: 'productName',
        lastEdit: null,
    };

    componentDidMount() {
        getAllProducts(this.state.order, (data) => {
            this.setState((prevState, props) => ({
                products: data,
                lastEdit: Date.now(),
            }));
        });
    }

    toggleModal = (id) => {
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
            productIdToRemove: id,
            lastEdit: Date.now(),
        }));
    };

    addProduct = (newProduct) => {
        addNewProductRequest(newProduct, (id) => {
            this.setState((prevState) => {
                return {
                    products: [
                        ...prevState.products,
                        {
                            ...newProduct,
                            id,
                        },
                    ],
                    lastEdit: Date.now(),
                };
            });
        });
    };

    editProduct = (editProduct) => {
        editProductRequest(editProduct, () => {
            this.setState((prevState, props) => {
                const products = prevState.products.map((product) => {
                    if (product.id === editProduct.id) product = editProduct;
                    return product;
                });
                return { products, lastEdit: Date.now() };
            });
        });
    };

    removeItem = () => {
        deleteProductRequest(this.state.productIdToRemove, () => {
            this.setState(({ products, productIdToRemove }) => {
                return {
                    products: products.filter(({ id }) => id !== productIdToRemove),
                };
            });
            this.toggleModal();
        });
    };

    render() {
        const contextElements = {
            ...this.state,
            addProduct: this.addProduct,
            removeItem: this.removeItem,
            editProduct: this.editProduct,
            toggleModal: this.toggleModal,
        };
        const productToRemove = this.state.products.find((product) => {
            return product.id === this.state.productIdToRemove;
        });
        return (
            <BrowserRouter>
                <AppContext.Provider value={contextElements}>
                    <StyledWrapper>
                        <div className="container mx-auto px-4 sm:px-8">
                            <div className="py-8">
                                <Switch>
                                    <Route exact path="/" component={RootView} />
                                    <Route path="/shoplist" component={ShopListView} />
                                    <Route path="/add" component={SingleProductView} />
                                    <Route path="/edit/:id" component={SingleProductView} />
                                    <Route path="/setting" component={SettingView} />
                                    <Route path="*" component={RootView} />
                                </Switch>
                            </div>
                        </div>
                        <Modal showModal={this.state.showModal}>
                            Potwierdź usunięcie {productToRemove?.productName} w kategorii{' '}
                            {productToRemove?.productCategory}
                            <div>
                                <Button color="red" onClick={this.removeItem}>
                                    Usuń
                                </Button>
                                <Button onClick={this.hideModal}>Anuluj</Button>
                            </div>
                        </Modal>
                    </StyledWrapper>
                </AppContext.Provider>
            </BrowserRouter>
        );
    }
}

export default App;
