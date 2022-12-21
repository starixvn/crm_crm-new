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
        return(
            <Provider store={store}>
                <div className='dashboard'>
                    <AppContainer 
                        currentCustomer={location.state}
                        custId={location?.state?.custId}
                    />
                </div>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;