import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import announcementReducer from './announcementSlice';
import WithNavigation from '@jsroot/components/WithNavigation';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: announcementReducer
});
import '@cssroot/pages/announcement/index.scss';

class index extends Component {
    render(){
        const location = this.props.location;
        return(
            <Provider store={store}>
                <div className='announcement'>
                    <AppContainer
                        isLoadGrid={location?.state?.isLoadGrid || null}
                        filterParams={location?.state?.filterParams || null}
                    />
                </div>
            </Provider>
        );
    }
}

const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;