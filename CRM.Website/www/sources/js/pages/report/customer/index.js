import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import customerReportSlice from './customerReportSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: customerReportSlice
});
import '@cssroot/pages/report/customer/index.scss';

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='report-customer'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}