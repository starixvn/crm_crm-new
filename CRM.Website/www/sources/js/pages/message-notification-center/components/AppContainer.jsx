import React, { Component, Fragment } from 'react';
import Filter from './Filter';
import DataGrid from './DataGrid';
import ActionNotification from './ActionNotification';

export class AppContainer extends Component {
    render() {
        return (
            <Fragment>
                <Filter />
                {/* <DataGrid isHost={true}/> */}
                <ActionNotification />
            </Fragment>
        );
    }
}

export default AppContainer;