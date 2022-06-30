import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import deletedFeedback from './deletedFeedbackSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: deletedFeedback
});

import '@cssroot/pages/feedback/deleted-feedback/index.scss';

export default class index extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <div className='deleted-feedback'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}