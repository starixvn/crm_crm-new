import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import redemption from './redemptionSlice';
import AppContainer from './components/AppContainer';
import WithNavigation from '@jsroot/components/WithNavigation';

const store = configureStore({
    reducer: redemption
});

import '@cssroot/pages/redemption/index.scss';

class index extends React.Component{
    render(){
        return(
            <Provider store={store}>
                <div className='redemption'>
                    <AppContainer id={!location.state ? null : location.state.toString()}/>
                </div>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;