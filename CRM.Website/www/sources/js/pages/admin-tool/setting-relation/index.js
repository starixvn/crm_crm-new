import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import settingRelationReducer from './settingRelationSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: settingRelationReducer
});

import '@cssroot/pages/admin-tool/setting-relation/index.scss';

export default class index extends React.Component {
    render(){
        return(
            <Provider store={store}>
                <div className='setting-relation'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}