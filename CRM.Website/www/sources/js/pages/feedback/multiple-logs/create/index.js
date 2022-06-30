import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import createMultipleLogReducer from './createMultipleLogSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: createMultipleLogReducer
});

import '@cssroot/pages/feedback/multiple-logs/create.scss';

export default class index extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <div className='notification-template'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}