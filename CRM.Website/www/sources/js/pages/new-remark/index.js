import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import newRemarkSlice from './newRemarkSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: newRemarkSlice
});
import '@cssroot/pages/new-remark/index.scss';

class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='new-remark'>
                    {
                        <AppContainer 
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
export default index;