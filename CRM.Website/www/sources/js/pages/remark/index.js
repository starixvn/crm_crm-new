import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import newRemarkSlice from '../new-remark/newRemarkSlice';
import AppContainer from '../new-remark/components/AppContainer';
import WithNavigation from '@jsroot/components/WithNavigation';
import LangHelper from '@jsroot/common/langHelper';

const store = configureStore({
    reducer: newRemarkSlice
});

import '@cssroot/pages/new-remark/index.scss';

class index extends React.Component {
    componentDidMount(){
        document.title = LangHelper.getResource('CRMSystem');
    }
    render(){
        const data = this.props.location?.state;
        if(!data){
            return null;
        }
        const hasCreateFeedbackPermission = document.getElementById('hasCreateFeedbackPermission').checked;
        return(
            <Provider store={store}>
                <div className='new-remark'>
                    <AppContainer 
                        isHost={hasCreateFeedbackPermission}
                        customerName={data.username}
                        custId={data.custId}
                        isGuestSearch={data.isGuest}
                        isSearchAll={true}
                    />
                </div>
            </Provider>
        );
    }
}
const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;