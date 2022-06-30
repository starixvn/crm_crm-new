import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import settlementReportReducer from './settlementReportSlice';
import AppContainer from './components/AppContainer';
import '@cssroot/pages/report/settlement/index.scss';

const store = configureStore({
    reducer: settlementReportReducer
});

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='settlement'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}