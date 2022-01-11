import React, { Component, Fragment } from 'react';
import Filter from './Filter';
// import DataGrid from './DataGrid';

export class AppContainer extends Component {
  render() {
    return (
      <Fragment>
           <Filter />
           {/* <DataGrid /> */}
      </Fragment>
);
  }
}

export default AppContainer;
