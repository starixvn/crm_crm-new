import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import actionLog from './actionLogSlice';
import AppContainer from './components/AppContainer';
import WithNavigation from '@jsroot/components/WithNavigation';

const store = configureStore({
    reducer: actionLog
});

import '@cssroot/pages/action-log/index.scss';

class index extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <div className='action-log'>
                    <AppContainer id={!location.state ? null : location.state.toString()}/>
                </div>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;