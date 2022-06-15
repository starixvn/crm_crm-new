import React, { Component } from 'react';
import Filter from './Filter';
import DataGrid from './DataGrid';
import { Provider } from 'react-redux';
import Store from '@jsroot/common/store';
import reducer from '../reducers/index';
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

export class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.isHost = document.getElementById('is-host') ? document.getElementById('is-host').checked : false;
    }

    render() {
        return (
            <Provider store={store}>
                <Filter isHost={this.isHost} />
                <DataGrid isHost={this.isHost} />
            </Provider>
        );
    }
}

export default AppContainer;
