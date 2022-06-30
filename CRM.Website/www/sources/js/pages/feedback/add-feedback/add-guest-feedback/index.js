import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import addGuestFeedbackReducer from './addGuestFeedbackSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: addGuestFeedbackReducer
});

import '@cssroot/pages/feedback/add-feedback/index.scss';

export default class index extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <div className='add-feedback'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}