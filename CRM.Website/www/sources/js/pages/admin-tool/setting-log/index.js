import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import settingLogReducer from './settingLogSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: settingLogReducer
});

import '@cssroot/pages/admin-tool/setting-log/index.scss';

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='setting-log'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}