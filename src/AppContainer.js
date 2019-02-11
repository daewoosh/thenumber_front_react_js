import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './_reducers';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(thunk));

const AppContainer = ({ children }) => {
    return (

        <Provider store={store}>
            {children}
        </Provider>

    );
};



export default AppContainer;