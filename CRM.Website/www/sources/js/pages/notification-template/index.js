import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import notificationTemplateReducer from './notificationTemplateSlice';

import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: notificationTemplateReducer
});

import '@cssroot/pages/notification-template/index.scss';

const isHost = true;
export default class index extends Component {
    render(){
        return(
            <Provider store={store}>
                <div className='notification-template'>
                    <AppContainer isHost={isHost} />
                </div>
            </Provider>
        );
    }
}
