import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AppContainer from './components/AppContainer';
import notificationTypeReducer from './notificationTypeSlice';
import '@cssroot/pages/notification-type/index.scss';

const store = configureStore({
    reducer: notificationTypeReducer
});

export default class index extends Component {
    render(){
        return(
            <Provider store={store}>
                <div className='notification-type'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}