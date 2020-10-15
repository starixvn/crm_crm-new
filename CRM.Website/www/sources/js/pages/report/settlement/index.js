import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import settlementReportReducer from './settlementReportSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: settlementReportReducer
});

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app-container'));