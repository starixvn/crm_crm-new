import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Layout from '@jsroot/components/Layout';
import customerInfoDetail from './customerInfoDetailSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: customerInfoDetail
});

const id = document.getElementById('id').value;

ReactDOM.render(
    <Provider store={store}>
        <Layout>
            <AppContainer id={id}/>
        </Layout>
    </Provider>,
    document.getElementById('app-container'));