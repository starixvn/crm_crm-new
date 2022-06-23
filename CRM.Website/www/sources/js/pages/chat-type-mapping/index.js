import React, {Component} from 'react';
import { Provider } from 'react-redux';

import Store from '@jsroot/common/store';
import AppContainer from './components/AppContainer';
import reducer from './reducers/index';
import '@cssroot/pages/chat-type-mapping/index.scss';

const store = Store.createStore(reducer, {
    gridData: { data: null, totalItems: 0 },
    updateActiveStatusResult: null,
    insertPersonalMappingData: { isShow: false },
    insertPersonalMappingResult: null,
    updatePersonalMappingData: { isShow: false, data: null },
    updatePersonalMappingResult: null,
    updateGroupMappingData: { isShow: false, data: null },
    updateGroupMappingResult: null,
    recipients: [],
    groupHeadline: [],
    letstalkVerification: { isBotRemoved: false, recipients: [] }
});

export default class index extends Component {
    render(){
        return(
            <Provider store={store}>
                <div className='chat-type-mapping'>
                    <AppContainer />
                </div>
            </Provider>
        );
    }
}