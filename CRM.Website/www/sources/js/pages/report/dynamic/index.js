import React from "react";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dynamicReportSlice from './dynamicReportSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: dynamicReportSlice
});

import '@cssroot/pages/report/dynamic/index.scss';

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='dynamic'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}
