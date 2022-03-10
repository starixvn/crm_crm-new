import React, { Component } from 'react';
import Filter from './Filter';
import DataGrid from './DataGrid';

export class AppContainer extends Component {
    render() {
        return (
            <div>
                <Filter id={this.props.id}/>
                <DataGrid />
            </div>
        );
    }
}

export default AppContainer;
