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
import uid from 'uid';

const db = firebase.firestore();

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
    };
    componentDidMount() {
        db.collection('products')
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

    hideModal = () => {
        this.setState({ showModal: false });
    };
    addProduct = (newProduct) => {
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true,
        });
        const ref = db.collection('products').doc();
        const id = ref.id;
        // ref.set({ ...newItem, id }).then(function (docRef) {
        //     console.log('Document written with ID: ', docRef);
        // });
        const productsRef = db
            .collection('products')
            .add({
                ...newProduct,
                id,
            })
            .then(function (docRef) {
                console.log('Document written with ID: ', docRef.id);
            });

        // if (newItem.id) {
        //     this.setState((prevState, props) => {
        //         const newItems = prevState.items.map((item) => {
        //             if (item.id === newItem.id) item = newItem;
        //             return item;
        //         });
        //         return { items: [...newItems] };
        //     });
        // } else {
        //     this.setState((prevState, props) => ({
        //         items: [...prevState.items, newItem],
        //     }));
        // }
    };
    removeItem = (id) => {
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
