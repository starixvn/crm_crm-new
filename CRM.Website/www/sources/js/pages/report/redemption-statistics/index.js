import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import redemptionStatisticsReducer from './redemptionStatisticsSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: redemptionStatisticsReducer
});

import '@cssroot/pages/report/redemption-statistics/index.scss';

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='redemption-statistics'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}
