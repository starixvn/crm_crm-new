import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import wagerReportReducer from './wagerReportSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: wagerReportReducer
});

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app-container'));
