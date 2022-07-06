import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import remarkSlice from './remarkSlice';
import AppContainer from './components/AppContainer';
import WithNavigation from '@jsroot/components/WithNavigation';

const store = configureStore({
    reducer: remarkSlice
});

import '@cssroot/pages/remark/index.scss';

class index extends React.PureComponent {
    render(){
        const location = this.props.location;
        return(
            <Provider store={store}>
                <div className='remark'>
                    <AppContainer id={!location.state ? null : location.state.toString()}/>
                </div>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;