import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import feedbackSubject from './feedbackSubjectSlide';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: feedbackSubject
});

import '@cssroot/pages/admin-tool/feedback-subject/index.scss';

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='feedback-subject'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}