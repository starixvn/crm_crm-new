import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import picAssignmentSlice from './picAssignmentSlice';
import AppContainer from './components/AppContainer';
import '@cssroot/pages/pic-and-headline/pic-assignment/index.scss';

const store = configureStore({
    reducer: picAssignmentSlice
});

// const isHost = document.getElementById('is-host').checked;
// const isReadPicManagement = document.getElementById('is-read-picmanagement').checked;
const isHost = true;
const isReadPicManagement = true;

export default class index extends Component {
    render(){
        return(
            <Provider store={store}>
                <div className='pic-assignment'>
                    <AppContainer isHost={isHost} isReadPicManagement = {isReadPicManagement}/>
                </div>
            </Provider>
        );
    }
}