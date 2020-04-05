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
    getOneSettingRequest,
    editSettingRequest,
    getAllSettingRequest,
} from './firebase';
import EditProductView from './views/EditProductView';
import NewProductView from './views/NewProductView';
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
        order: 'productName',

        isUpdated: true,
        showAlert: true,
        settings: {
            lastUpdate: null,
            timeToUpdate: 10000,
            darkTheme: true,
        },
        isLoaded: false,
    };

    componentDidMount() {
        getAllProducts(this.state.order, (data) => {
            this.setState((prevState, props) => ({
                products: data,
            }));
        });
        getAllSettingRequest((newSettings) => {
            this.setState((prevState) => ({
                settings: { ...newSettings, lastUpdate: newSettings.lastUpdate.toMillis() },
                isLoaded: true,
            }));
        });
    }
    updateSettings = (newSettings) => {
        this.setState((prevState) => ({
            settings: {
                ...prevState.settings,
                ...newSettings,
            },
        }));
        console.log('newSettings', newSettings);
    };
    hideAlert = () => {
        this.setState((prevState) => ({
            showAlert: false,
        }));
    };
    toggleModal = (id) => {
        this.setState((prevState) => ({
            showModal: !prevState.showModal,
            productIdToRemove: id,
        }));
        editSettingRequest('lastUpdate', new Date());
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
                    settings: {
                        ...prevState.settings,
                        lastUpdate: Date.now(),
                    },
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
                return {
                    products,
                    settings: {
                        ...prevState.settings,
                        lastUpdate: Date.now(),
                    },
                };
            });
            editSettingRequest('lastUpdate', new Date());
        });
    };

    removeItem = () => {
        deleteProductRequest(this.state.productIdToRemove, () => {
            this.setState(({ products, productIdToRemove, settings }) => {
                return {
                    products: products.filter(({ id }) => id !== productIdToRemove),
                    settings: {
                        ...settings,
                        lastUpdate: Date.now(),
                    },
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
            hideAlert: this.hideAlert,
            updateAlert: this.updateAlert,
            updateSettings: this.updateSettings,
        };
        const { isLoaded, products, productIdToRemove } = this.state;
        const productToRemove = products.find(({ id }) => {
            return id === productIdToRemove;
        });
        return (
            <BrowserRouter>
                <AppContext.Provider value={contextElements}>
                    {isLoaded && (
                        <StyledWrapper>
                            <div className="container mx-auto px-4 sm:px-8">
                                <div className="py-8">
                                    <Switch>
                                        <Route exact path="/" component={RootView} />
                                        <Route path="/shoplist" component={ShopListView} />
                                        <Route path="/add" component={NewProductView} />
                                        <Route path="/edit/:id" component={EditProductView} />
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
                    )}
                </AppContext.Provider>
            </BrowserRouter>
        );
    }
}

export default App;
