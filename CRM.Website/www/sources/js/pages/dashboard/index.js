import React, {PureComponent} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import dashboard from './dashboardSlice';
import AppContainer from './components/AppContainer';
import WithNavigation from '@jsroot/components/WithNavigation';

const store = configureStore({
    reducer: dashboard
});

import '@cssroot/pages/dashboard/index.scss';

class index extends PureComponent {
    render(){
        const location = this.props.location;
        const custId = this.props.location.state !== null ? location.state.id : this.props.custId;
        return(
            <Provider store={store}>
                <AppContainer custId={!custId ? null : custId.toString()}/>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;