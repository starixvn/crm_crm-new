import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Layout from '@jsroot/components/Layout';
import settingRelationReducer from './settingManagementSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: settingRelationReducer
});
const isHost = document.getElementById('is-host').checked;

ReactDOM.render(
    <Provider store={store}>
        <Layout>
            <AppContainer isHost={isHost}/>
        </Layout>
    </Provider>,
    document.getElementById('app-container'));