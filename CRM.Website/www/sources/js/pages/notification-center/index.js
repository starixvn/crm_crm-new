import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import notificationCenter from './notificationCenterSlice';
import AppContainer from './components/AppContainer';
import WithNavigation from '@jsroot/components/WithNavigation';
import '@cssroot/pages/notification-center/index.scss';

const store = configureStore({
    reducer: notificationCenter
});

class index extends React.Component {
    render(){
        const location = this.props.location;
        return(
            <Provider store={store}>
                <div className='notification-center'>
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