import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import PicManagementReducer from './picManagementSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: PicManagementReducer
});

import '@cssroot/pages/pic-and-headline/management/index.scss';

export default class index extends Component {
    render(){
        return(
            <Provider store={store}>
                <div className='pic-management'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}