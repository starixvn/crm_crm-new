import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Layout from '@jsroot/components/layout-container/index';
import issueStatisticsReducer from './issueStatisticsSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: issueStatisticsReducer
});

ReactDOM.render(
    <Provider store={store}>
        <Layout>
            <AppContainer />
        </Layout>
    </Provider>,
    document.getElementById('app-container'));