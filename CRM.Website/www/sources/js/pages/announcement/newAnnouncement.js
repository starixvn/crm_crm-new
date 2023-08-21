import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import announcementReducer from './announcementSlice';
import NewAnnouncement_v2 from './components/NewAnnouncement_v2';

const store = configureStore({
    reducer: announcementReducer
});
import '@cssroot/pages/announcement/index.scss';

export default class newAnnouncement extends Component {
    render(){
        return(
            <Provider store={store}>
                <div className='announcement'>
                    <NewAnnouncement_v2 />
                </div>
            </Provider>
        );
    }
}
