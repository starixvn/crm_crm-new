import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import manageFeedbackReducer from '../manage-feedback-v2/manageFeedbackSlice';
import AppContainer from '../manage-feedback-v2/components/AppContainer';
import WithNavigation from '@jsroot/components/WithNavigation';

const store = configureStore({
    reducer: manageFeedbackReducer
});

import '@cssroot/pages/feedback/manage-feedback/index.scss';

class index extends React.Component{
    render(){
        const location = this.props.location;
        return(
            <Provider store={store}>
                <div className='manage-feedback'>
                    <AppContainer currentCustomer={location.state} />
                </div>
            </Provider>
        );
    }
}
const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;