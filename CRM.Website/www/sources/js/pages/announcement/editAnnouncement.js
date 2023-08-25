import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import announcementReducer from './announcementSlice';
import ActionAnnouncement from './components/ActionAnnouncement';
import WithNavigation from '@jsroot/components/WithNavigation';

const store = configureStore({
    reducer: announcementReducer
});
import '@cssroot/pages/announcement/index.scss';

class editAnnouncement extends Component {
    render(){
        const location = this.props.location;
        return(
            <Provider store={store}>
                <div className='announcement'>
                    <ActionAnnouncement actionParam={location?.state || null}/>
                </div>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(editAnnouncement);
export default FunctionBarWithNavigation;