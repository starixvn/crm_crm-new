import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import deletedFeedbackStatisticReducer from './deletedFeedbackStatisticSlice';
import AppContainer from './components/AppContainer';
import '@cssroot/pages/report/deleted-feedback-statistic/index.scss';

const store = configureStore({
    reducer: deletedFeedbackStatisticReducer
});

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='deleted-feedback-statistic'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}