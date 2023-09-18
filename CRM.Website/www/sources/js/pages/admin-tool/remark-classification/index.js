import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import remarkClassificationReducer from './remarkClassificationSlice';
import AppContainer from './components/AppContainer';
import '@cssroot/pages/admin-tool/remark-classification/index.scss';

const store = configureStore({
    reducer: remarkClassificationReducer
});

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='remark-classification'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
};