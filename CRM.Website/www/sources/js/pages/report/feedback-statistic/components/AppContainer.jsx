import React, { Component, Fragment } from 'react';
import Filter from './Filter';
import DataGrid from './DataGrid';

export default class AppContainer extends Component {
  render() {
    return (
        <Fragment>
            <Filter />
            <DataGrid />
        </Fragment>
    );
  }
}

