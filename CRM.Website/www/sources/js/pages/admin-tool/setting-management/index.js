import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import settingRelationReducer from './settingManagementSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: settingRelationReducer
});

import '@cssroot/pages/admin-tool/setting-management/index.scss';

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='setting-management'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}