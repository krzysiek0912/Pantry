import React from 'react';
import './App.css';
import styled from 'styled-components';
import RootView from './views/RootView';

import SingleProductView from './views/SingleIeProductView';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    min-height: 100vh;
`;

function App() {
    return (
        <StyledWrapper>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/" component={RootView} />
                            <Route path="/add" component={SingleProductView} />
                            <Route path="/edit/:id" component={SingleProductView} />
                            <Route path="*" component={RootView} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        </StyledWrapper>
    );
}

export default App;
