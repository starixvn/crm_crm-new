import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import messageNotificationCenterReducer from './messageNotificationCenterSlice';
import ActionNotification from './components/ActionNotification';
import WithNavigation from '@jsroot/components/WithNavigation';
import '@cssroot/pages/message-notification-center/index.scss';

const store = configureStore({
    reducer: messageNotificationCenterReducer
});

class actionNotification extends Component {
    render(){
        const location = this.props.location;
        return(
            <Provider store={store}>
                <div className='message-notification-center-action'>
                    <ActionNotification actionParam={location?.state || null}/>
                </div>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(actionNotification);
export default FunctionBarWithNavigation;