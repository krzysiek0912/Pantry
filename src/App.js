import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import RootView from './views/RootView';
import AppContext from './context';
import firebase from './firebase';
import SingleProductView from './views/SingleIeProductView';
import ShopListView from './views/ShopListView';
import SettingView from './views/SettingView';
import Modal from './components/molecules/Modal/Modal';
import Button from './components/atoms/Button/Button';

const db = firebase.firestore();
const productColection = db.collection('products');

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
        productColection
            .orderBy(this.state.order)
            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data());
                this.setState((prevState, props) => ({
                    products: data,
                }));
            });
    }

    toggleModal = (id) => {
        this.setState((prevState, props) => ({
            showModal: !prevState.showModal,
            productIdToRemove: id,
        }));
    };

    addProduct = (newProduct) => {
        const ref = productColection.doc();
        const id = ref.id;

        if (!newProduct.id) {
            productColection.add({
                ...newProduct,
                id,
            });

            this.setState((prevState, props) => {
                const newProductsArray = [
                    ...prevState.products,
                    {
                        ...newProduct,
                        id,
                    },
                ];
                // FIXME: Sortowanie
                // const property = this.state.order;
                // const productsSort = newProductsArray.sort(function (a, b, property) {
                //     var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
                //     return (a, b) => (a.productName > b.productName ? 1 : -1);
                // });
                // console.log('sorting products', productsSort);
                return {
                    products: newProductsArray,
                };
            });
        } else {
            this.setState((prevState, props) => {
                const products = prevState.products.map((product) => {
                    if (product.id === newProduct.id) product = newProduct;
                    return product;
                });
                return products;
            });
        }
    };

    editProduct = (editProduct) => {
        productColection
            .where('id', '==', editProduct.id)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.update(editProduct);
                });
            });
        this.setState((prevState, props) => {
            const products = prevState.products.map((product) => {
                if (product.id === editProduct.id) product = editProduct;
                return product;
            });
            return { products, lastEdit: Date.now() };
        });
    };

    removeItem = () => {
        productColection
            .where('id', '==', this.state.productIdToRemove)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });

        this.setState(({ products, productIdToRemove }) => {
            return {
                products: products.filter((product) => product.id !== productIdToRemove),
            };
        });
        this.toggleModal();
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
