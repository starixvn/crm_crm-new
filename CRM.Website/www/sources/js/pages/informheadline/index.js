import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Layout from '@jsroot/components/Layout';
import informHeadline from './informHeadlineSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: informHeadline
});

const contactPolicy = document.getElementById('ContactPolicy');
const searchPolicy = document.getElementById('SearchPolicy');
ReactDOM.render(
    <Provider store={store}>
        <Layout>
            <AppContainer 
                contactPolicy={contactPolicy}
                searchPolicy={searchPolicy}
            />
        </Layout>
    </Provider>,
    document.getElementById('app-container'));