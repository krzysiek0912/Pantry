import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import RootView from './views/RootView';
import AppContext from './context';
import SingleProductView from './views/SingleIeProductView';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
    };
    addItem = newItem => {
        this.setState((prevState, props) => ({
            items: [...prevState.items, newItem],
        }));
    };
    removeItem = id => {
        this.setState((prevState, props) => ({
            items: prevState.items.filter(item => item.id !== id),
        }));
    };
    render() {
        const contextElements = {
            ...this.state,
            addItem: this.addItem,
            removeItem: this.removeItem,
        };
        return (
            <BrowserRouter>
                <AppContext.Provider value={contextElements}>
                    <StyledWrapper>
                        <div className="container mx-auto px-4 sm:px-8">
                            <div className="py-8">
                                <Switch>
                                    <Route exact path="/" component={RootView} />
                                    <Route path="/add" component={SingleProductView} />
                                    <Route path="/edit/:id" component={SingleProductView} />
                                    <Route path="*" component={RootView} />
                                </Switch>
                            </div>
                        </div>
                    </StyledWrapper>
                </AppContext.Provider>
            </BrowserRouter>
        );
    }
}

export default App;
