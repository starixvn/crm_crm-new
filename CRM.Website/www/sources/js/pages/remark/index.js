import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import newRemarkSlice from '../new-remark/newRemarkSlice';
import AppContainer from '../new-remark/components/AppContainer';
import WithNavigation from '@jsroot/components/WithNavigation';

const store = configureStore({
    reducer: newRemarkSlice
});

import '@cssroot/pages/new-remark/index.scss';

class index extends React.Component {
    render(){
        const data = this.props.location.state;
        const hasCreateFeedbackPermission = document.getElementById('hasCreateFeedbackPermission').checked;
        return(
            <Provider store={store}>
                <div className='new-remark'>
                    <AppContainer 
                        isHost={hasCreateFeedbackPermission}
                        customerName={!data ? '' : data.username}
                        custId={!data ? 0 : data.custId}
                        isGuestSearch={!data ? false : data.isGuest}
                    />
                </div>
            </Provider>
        );
    }
}
const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;