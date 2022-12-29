import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import communicationLog from './communicationLogSlice';
import AppContainer from './components/AppContainer';
import WithNavigation from '@jsroot/components/WithNavigation';

const store = configureStore({
    reducer: communicationLog
});

import '@cssroot/pages/communication-log/index.scss';

class index extends React.PureComponent {
    render(){
        const location = this.props.location;
        if(!location || !location.state){
            return null;
        }
        return(
            <Provider store={store}>
                <div className='communication-log'>
                    <AppContainer id={location.state.custId} customerInfo={location.state.customerInfo}/>
                </div>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;