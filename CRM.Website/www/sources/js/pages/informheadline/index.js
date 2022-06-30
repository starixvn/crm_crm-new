import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import informHeadline from './informHeadlineSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: informHeadline
});

import '@cssroot/pages/informHeadline/index.scss';

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='inform-headline'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}