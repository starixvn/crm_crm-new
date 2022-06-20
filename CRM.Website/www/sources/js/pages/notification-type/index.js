import React, {PureComponent} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AppContainer from './components/AppContainer';
import notificationTypeReducer from './notificationTypeSlice';
import WithNavigation from '@jsroot/components/WithNavigation';
import '@cssroot/pages/notification-type/index.scss';

const store = configureStore({
    reducer: notificationTypeReducer
});

const isHost = true;

class index extends PureComponent {
    render(){
        const location = this.props.location;
        console.log(location.state.id);
        return(
            <Provider store={store}>
                <AppContainer isHost={isHost} />
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;