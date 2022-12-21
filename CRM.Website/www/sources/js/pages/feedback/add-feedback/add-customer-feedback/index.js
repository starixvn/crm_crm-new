import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import addCustomerFeedbackReducer from './addCustomerFeedbackSlice';
import AppContainer from './components/AppContainer';
import WithNavigation from '@jsroot/components/WithNavigation';

const store = configureStore({
    reducer: addCustomerFeedbackReducer
});
import '@cssroot/pages/feedback/add-feedback/index.scss';

export class index extends React.PureComponent {
    render(){
        const location = this.props.location;
        if(!location || !location.state){
            return null;
        }
        return(
            <Provider store={store}>
                  <div className='add-feedback'>
                    <AppContainer currentCustomer={location.state} />
                  </div>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;