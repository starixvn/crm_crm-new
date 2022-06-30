import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import summaryReportReducer from './summaryReportSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: summaryReportReducer
});

import '@cssroot/pages/report/summary/index.scss';


export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='summary'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}
