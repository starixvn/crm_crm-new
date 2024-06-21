import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import notificationCenterReducer from './notificationCenterSlice';
import ActionNotification from './components/ActionNotification';
import WithNavigation from '@jsroot/components/WithNavigation';
import '@cssroot/pages/notification-center/index.scss';

const store = configureStore({
    reducer: notificationCenterReducer
});

class actionNotification extends Component {
    render(){
        const location = this.props.location;
        return(
            <Provider store={store}>
                <div className='notification-center-action'>
                    <ActionNotification actionParam={location?.state || null}/>
                </div>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(actionNotification);
export default FunctionBarWithNavigation;