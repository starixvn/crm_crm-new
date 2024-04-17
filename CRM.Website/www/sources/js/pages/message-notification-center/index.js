import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import messageNotificationCenter from './messageNotificationCenterSlice';
import AppContainer from './components/AppContainer';
import WithNavigation from '@jsroot/components/WithNavigation';
import '@cssroot/pages/message-notification-center/index.scss';

const store = configureStore({
    reducer: messageNotificationCenter
});

class index extends React.Component {
    render(){
        const location = this.props.location;
        return(
            <Provider store={store}>
                <div className='message-notification-center'>
                    <AppContainer
                        isLoadGrid={location?.state?.isLoadGrid || null}
                        filterParams={location?.state?.filterParams || null}
                    />
                </div>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;