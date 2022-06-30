import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import feedbackStatisticReducer from './feedbackStatisticSlice';
import AppContainer from './components/AppContainer';
import '@cssroot/pages/report/feedback-statistic/index.scss';

const store = configureStore({
    reducer: feedbackStatisticReducer
});

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='feedback-statistic'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}