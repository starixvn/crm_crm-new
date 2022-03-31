import React, { Component } from 'react';
import Filter from './Filter';
import DataGrid from './DataGrid';

export class AppContainer extends Component {

    render() {
        return (
            <div>
                <Filter />
            </div>
        );
    }
}

export default AppContainer;