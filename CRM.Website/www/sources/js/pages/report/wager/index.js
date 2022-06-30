import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import wagerReportReducer from './wagerReportSlice';
import AppContainer from './components/AppContainer';
import '@cssroot/pages/report/wager/index.scss';

const store = configureStore({
    reducer: wagerReportReducer
});

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='wager'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}

