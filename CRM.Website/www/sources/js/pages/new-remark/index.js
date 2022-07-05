// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import newRemarkSlice from './newRemarkSlice';
// import AppContainer from './components/AppContainer';
// import LastFiveRemarkDataGrid from './components/LastFiveRemarkDataGrid';

// const store = configureStore({
//     reducer: newRemarkSlice
// });

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