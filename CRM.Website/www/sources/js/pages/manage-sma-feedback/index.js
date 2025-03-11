import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import smaFeedback from './smaFeedbackSlice';
import AppContainer from './components/AppContainer';
import '@cssroot/pages/sma-feedback/index.scss';

const store = configureStore({
    reducer: smaFeedback
});

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='sma-feedback'>
                    <AppContainer/>
                </div>
            </Provider>
        );
    }
};