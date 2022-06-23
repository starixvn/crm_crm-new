import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ChangesLogReducer from './changesLogSlice';
import TabContainer from './components/TabContainer';
import '@cssroot/pages/pic-and-headline/changes-log/index.scss';

const store = configureStore({
    reducer: ChangesLogReducer
});

export default class index extends Component {
    render(){
        return(
            <Provider store={store}>
                <div className='change-logs'>
                    <TabContainer />
                </div>
            </Provider>
        );
    }
}