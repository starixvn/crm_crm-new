import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import manageFeedbackReducer from './manageFeedbackSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: manageFeedbackReducer
});

import '@cssroot/pages/feedback/manage-feedback/index.scss';

const isHost = true;
export default class index extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <div className='manage-feedback'>
                    <AppContainer isHost={isHost} />
                </div>
            </Provider>
        );
    }
}