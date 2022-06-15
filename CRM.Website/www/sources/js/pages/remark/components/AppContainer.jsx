import React, { Component } from 'react';
import Remark from './Remark';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import remarkSlice from '../remarkSlice';
import '@cssroot/pages/remark/index.scss';

const store = configureStore({
    reducer: remarkSlice
});

export class AppContainer extends Component {
    render() {
        return (
            <Provider store={store}>
                <Remark id={this.props.id}/>
            </Provider>
        );
    }
}

export default AppContainer;
