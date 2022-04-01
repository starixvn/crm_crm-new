import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';

export class AppContainer extends Component {
  componentDidMount(){
    this.props.getAllSettings();
  }

  render() {
    const {settings} = this.props;
    if(settings === null || !settings){
      return null;
    }
    return (
      <Fragment>
        <Filter />
        <DataGrid />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = state => {
  const { settings } = state;
  return { settings };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
