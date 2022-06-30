import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import customerInfoDetail from './customerInfoDetailSlice';
import AppContainer from './components/AppContainer';
import WithNavigation from '@jsroot/components/WithNavigation';

const store = configureStore({
    reducer: customerInfoDetail
});

import '@cssroot/pages/customer/customer-info-detail/index.scss';

class index extends React.PureComponent {
    render(){
        const location = this.props.location;
        console.log(location);
        return(
            <Provider store={store}>
                  <div className='customer-info-detail'>
                    <AppContainer id={!location.state ? null : location.state.toString()}/>
                  </div>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;