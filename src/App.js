import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import RootView from './views/RootView';
import AppContext from './context';
import SingleProductView from './views/SingleIeProductView';
import ShopListView from './views/ShopListView';
import SettingView from './views/SettingView';
import Modal from './components/molecules/Modal/Modal';
import Button from './components/atoms/Button/Button';

const list = [
    {
        id: 1,
        productName: 'Mąka',
        productCategory: 'Produkty suche',
        count: 1,
        minCount: 2,
        unit: 'kg',
    },
    {
        id: 2,
        productName: 'Ryż',
        productCategory: 'Produkty suche',
        count: 2,
        minCount: 2,
        unit: 'kg',
    },
    {
        id: 3,
        productName: 'Woda gazowana',
        productCategory: 'Napoje',
        count: 5,
        minCount: 2,
        unit: 'l',
    },
];
const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    min-height: 100vh;
`;
class App extends Component {
    state = {
        items: list,
        showModal: false,
        productIdToRemove: null,
    };
    toggleModal = (id) => {
        this.setState((prevState, props) => ({
            showModal: !prevState.showModal,
            productIdToRemove: id,
        }));
    };

    hideModal = () => {
        this.setState({ showModal: false });
    };
    addItem = (newItem) => {
        if (newItem.id) {
            this.setState((prevState, props) => {
                const newItems = prevState.items.map((item) => {
                    if (item.id === newItem.id) item = newItem;
                    return item;
                });
                return { items: [...newItems] };
            });
        } else {
            this.setState((prevState, props) => ({
                items: [...prevState.items, newItem],
            }));
        }
    };
    removeItem = (id) => {
        this.setState(({ items, productIdToRemove }) => {
            return {
                items: items.filter((item) => item.id !== productIdToRemove),
            };
        });
        this.toggleModal();
    };
    render() {
        const contextElements = {
            ...this.state,
            addItem: this.addItem,
            removeItem: this.removeItem,
            toggleModal: this.toggleModal,
        };
        const itemToRemove = this.state.items.find((item) => {
            console.log('item', item, this.state.productIdToRemove);
            return item.id === this.state.productIdToRemove;
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
                            Potwierdź usunięcie {itemToRemove?.productName} w kategorii{' '}
                            {itemToRemove?.productCategory}
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
