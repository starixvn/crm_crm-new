import React, { Component } from 'react';
import DataGrid from './DataGrid';
import Filter from './Filter';

export class AppContainer extends Component {
    render() {
        return (
            <div className="col-md-10">
                <Filter />
                <DataGrid />
            </div>
        );
    }
}

export default AppContainer;
