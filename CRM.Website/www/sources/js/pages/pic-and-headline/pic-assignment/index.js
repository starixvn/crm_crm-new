import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import Layout from '@jsroot/components/Layout';
import picAssignmentSlice from './picAssignmentSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: picAssignmentSlice
});

const isHost = document.getElementById('is-host').checked;
const isReadPicManagement = document.getElementById('is-read-picmanagement').checked;

ReactDOM.render(
    <Provider store={store}>
        <Layout>
            <AppContainer isHost={isHost} isReadPicManagement = {isReadPicManagement}/>
        </Layout>
    </Provider>,
    document.getElementById('app-container'));