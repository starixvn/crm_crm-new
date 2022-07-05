import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import feedbackStatisticReducer from './feedbackStatisticSlice';
import AppContainer from './components/AppContainer';
import Layout from '@jsroot/components/Layout';

const store = configureStore({
    reducer: feedbackStatisticReducer
});

ReactDOM.render(
    <Provider store={store}>
        <Layout>
            <AppContainer />
        </Layout>
    </Provider>,
    document.getElementById('app-container'));