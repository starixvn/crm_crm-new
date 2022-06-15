import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Layout from '@jsroot/components/layout-container/index';
import ChangesLogReducer from './changesLogSlice';
import TabContainer from './components/TabContainer';

const store = configureStore({
    reducer: ChangesLogReducer
});

ReactDOM.render(
    <Provider store={store}>
        <Layout>
            <TabContainer />
        </Layout>
    </Provider>,
    document.getElementById('app-container'));