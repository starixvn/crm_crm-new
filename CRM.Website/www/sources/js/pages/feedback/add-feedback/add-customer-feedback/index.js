import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Layout from '@jsroot/components/Layout';
import addCustomerFeedbackReducer from './addCustomerFeedbackSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: addCustomerFeedbackReducer
});

const id = document.getElementById('id').value;
const name = document.getElementById('name').value;

ReactDOM.render(
    <Provider store={store}>
        <Layout>
            <AppContainer id={id} name={name}/>
        </Layout>
    </Provider>,
    document.getElementById('app-container'));