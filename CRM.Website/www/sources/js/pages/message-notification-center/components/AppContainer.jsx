import React, { Component, Fragment } from 'react';
import Filter from './Filter';
import DataGrid from './DataGrid';

export class AppContainer extends Component {
    render() {
        return (
            <Fragment>
                <Filter />
                <DataGrid isHost={true}/>
            </Fragment>
        );
    }
}

export default AppContainer;