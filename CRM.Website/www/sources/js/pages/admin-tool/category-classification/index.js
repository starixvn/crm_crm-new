import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import categoryClassificationReducer from './categoryClassificationSlice';
import AppContainer from './components/AppContainer';
import '@cssroot/pages/admin-tool/category-classification/index.scss';

const store = configureStore({
    reducer: categoryClassificationReducer
});

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='category-classification'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
};