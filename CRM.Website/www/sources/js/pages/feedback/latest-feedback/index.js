import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import latestFeedback from '../latest-feedback-v2/latestFeedbackSlide';
import AppContainer from '../latest-feedback-v2/components/AppContainer';
import WithNavigation from '@jsroot/components/WithNavigation';

const store = configureStore({
    reducer: latestFeedback
});

import '@cssroot/pages/feedback/latest-feedback.scss';

class index extends React.Component{
    render(){
        const location = this.props.location;
        if(!location || !location.state){
            return null;
        }
        return(
            <Provider store={store}>
                <div className='latest-feedback'>
                    <AppContainer custId={location.state.custId} username={location.state.username}/>
                </div>
            </Provider>
        );
    }
}
const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;