import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import communicationsettingReducer from './communicationsettingSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: communicationsettingReducer
});

import '@cssroot/pages/admin-tool/communication-setting/index.scss';

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='communication-setting'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}