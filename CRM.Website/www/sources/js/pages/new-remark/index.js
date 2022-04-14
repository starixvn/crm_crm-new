import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Layout from '@jsroot/components/Layout';
import newRemarkSlice from './newRemarkSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: newRemarkSlice
});

const isHost = document.getElementById('isHost').checked;

ReactDOM.render(
    <Provider store={store}>
        <Layout>
            <AppContainer isHost={isHost}/>
        </Layout>
    </Provider>,
    document.getElementById('app-container'));