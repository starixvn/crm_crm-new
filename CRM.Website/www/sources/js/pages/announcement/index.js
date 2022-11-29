import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import announcementReducer from './announcementSlice';

import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: announcementReducer
});
import '@cssroot/pages/announcement/index.scss';

export default class index extends Component {
    render(){
        return(
            <Provider store={store}>
                <div className='announcement'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}
