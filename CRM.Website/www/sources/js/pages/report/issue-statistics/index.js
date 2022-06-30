import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import issueStatisticsReducer from './issueStatisticsSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: issueStatisticsReducer
});
import '@cssroot/pages/report/issue-statistics/index.scss';

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='issue-statistics'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}