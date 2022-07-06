import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import newRemarkSlice from './newRemarkSlice';
import AppContainer from './components/AppContainer';
import LastFiveRemarkDataGrid from './components/LastFiveRemarkDataGrid';
import WithNavigation from '@jsroot/components/WithNavigation';

const store = configureStore({
    reducer: newRemarkSlice
});

// const isHost = document.getElementById('isHost').checked;
// const customerName = document.getElementById('customerName').value;
// const custId = document.getElementById('custId').value;
// const isGuest = document.getElementById('isGuest').checked;
// const isLastFiveRemark = document.getElementById('isLastFiveRemark').checked;
// ReactDOM.render(
//     <Provider store={store}>
//         <Layout>
//             {
//                 isLastFiveRemark ?
//                 <LastFiveRemarkDataGrid 
//                     custId={custId}
//                 /> :
//                 <AppContainer 
//                     isHost={isHost}
//                     customerName={customerName}
//                     custId={custId}
//                     isGuestSearch={isGuest}
//                     isLastFiveRemark={isLastFiveRemark}
//                 />
//             }
//         </Layout>
//     </Provider>,
//     document.getElementById('app-container'));
import '@cssroot/pages/new-remark/index.scss';

class index extends React.Component {
    render(){
        const data = this.props.location.state;
        const hasCreateFeedbackPermission = document.getElementById('hasCreateFeedbackPermission').checked;
        return(
            <Provider store={store}>
                <div className='new-remark'>
                    {
                        data.isLastFiveRemark ?
                        <LastFiveRemarkDataGrid 
                            custId={data.custId}
                        /> :
                        <AppContainer 
                            isHost={hasCreateFeedbackPermission}
                            customerName=''
                            custId={0}
                            isGuestSearch={false}
                        />
                    }
                </div>
            </Provider>
        );
    }
}
const FunctionBarWithNavigation = WithNavigation(index);
export default FunctionBarWithNavigation;