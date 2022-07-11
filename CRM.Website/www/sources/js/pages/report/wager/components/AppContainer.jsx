import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
  componentDidMount(){
    document.title = LangHelper.getResource('WagersRelatedReport');
  }
  componentWillUnmount(){
    this.props.resetState();
  }

  render() {
    const { gridData} = this.props;

    return (
      <Fragment>
        <Filter/>
        {
          gridData === null || gridData === undefined ? null : <DataGrid />
        }
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = state => {
  const {gridData } = state;
  return {gridData };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);