import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import Filter from './Filter';


export class AppContainer extends Component {
  componentDidMount(){
    this.props.getAllSettings();
}
  render() {
    const settings = this.props.settings;
    if(settings === null || !settings){
      return null;
    }
    return (
      <Fragment>
          <Filter />
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
