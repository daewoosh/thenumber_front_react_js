import React from 'react';
import AppContainer from './AppContainer';
import {App} from './App';
import run from 'bs_react_lib/containers/runner';


run({
    app: (
        <AppContainer>
            <App />
        </AppContainer>
    ), elName: 'root'
});
