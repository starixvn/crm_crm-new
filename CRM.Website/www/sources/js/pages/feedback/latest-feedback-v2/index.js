import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import latestFeedback from './latestFeedbackSlide';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: latestFeedback
});

import '@cssroot/pages/feedback/latest-feedback.scss';

export default class index extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <div className='latest-feedback'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}