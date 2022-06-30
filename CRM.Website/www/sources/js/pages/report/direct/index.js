import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import directReportReducer from './directCustomerSlice';
import AppContainer from './components/AppContainer';
import '@cssroot/pages/report/direct/index.scss';

const store = configureStore({
    reducer: directReportReducer
});

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='direct'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}