import React, { Component, Fragment } from 'react';
import Filter from './Filter';
import DataGrid from './DataGrid';
import PicFilter from './PicFilter';
import PicDataGrid from './PicDataGrid';
export default class AppContainer extends Component {
    render() {
        return (
            this.props.tab === 1 ?
            <Fragment>
                <Filter />
                <DataGrid />
            </Fragment>
            :
            <Fragment>
                <PicFilter />
                <PicDataGrid />
            </Fragment>
        );
    }
}