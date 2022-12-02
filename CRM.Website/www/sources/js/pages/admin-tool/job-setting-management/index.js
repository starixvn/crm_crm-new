import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import jobSettingManagementReducer from './jobSettingManagementSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: jobSettingManagementReducer
});

import '@cssroot/pages/admin-tool/job-setting-management/index.scss';

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='job-setting-management'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}