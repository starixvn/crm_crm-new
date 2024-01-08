import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import messageNotificationCenter from './messageNotificationCenterSlice';
import AppContainer from './components/AppContainer';
import '@cssroot/pages/message-notification-center/index.scss';

const store = configureStore({
    reducer: messageNotificationCenter
});

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='message-notification-center'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}