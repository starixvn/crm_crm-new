import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Layout from '@jsroot/components/Layout';
import manageFeedbackReducer from './manageFeedbackSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: manageFeedbackReducer
});

const isHost = document.getElementById('IsHost').checked;

ReactDOM.render(
    <Provider store={store}>
        <Layout>
            <AppContainer isHost={isHost} />
        </Layout>
    </Provider>,
    document.getElementById('app-container'));