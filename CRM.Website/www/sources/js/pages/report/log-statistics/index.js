import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Layout from '@jsroot/components/layout-container/index';
import logStatisticsReducer from './logStatisticsSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: logStatisticsReducer
});

import '@cssroot/pages/report/log-statistics/index.scss';

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='log-statistics'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}
