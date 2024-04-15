import React, { Component, Fragment } from 'react';
import Filter from './Filter';
import DataGrid from './DataGrid';
import ActionNotification from './ActionNotification';
import AffectedTicket from './AffectedTicket';

export class AppContainer extends Component {
    render() {
        return (
            <Fragment>
                <Filter />
                <DataGrid isHost={true}/>
                {/* <ActionNotification /> */}
                {/* <AffectedTicket isCredit/> */}
            </Fragment>
        );
    }
}

export default AppContainer;