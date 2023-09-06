import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import announcementReducer from './announcementSlice';
import NewAnnouncement from './components/NewAnnouncement';
import WithNavigation from '@jsroot/components/WithNavigation';

const store = configureStore({
    reducer: announcementReducer
});
import '@cssroot/pages/announcement/index.scss';

class newAnnouncement extends Component {
    render(){
        const location = this.props.location;
        return(
            <Provider store={store}>
                <div className='announcement'>
                    <NewAnnouncement filterParams={location?.state || null}/>
                </div>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(newAnnouncement);
export default FunctionBarWithNavigation;
