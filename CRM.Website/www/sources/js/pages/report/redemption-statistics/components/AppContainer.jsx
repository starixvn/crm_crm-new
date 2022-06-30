import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import Detail from './Detail';

export class AppContainer extends Component {
  componentDidMount(){
    this.props.getAllSettings();
  }

  componentWillUnmount(){
    this.props.resetState();
  }

  render() {
    const {settings, detailPopup} = this.props;
    if(settings === null || !settings){
      return null;
    }
    return (
      <Fragment>
        <Filter />
        {
          detailPopup.show ? <Detail /> : <DataGrid />
        }
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = state => {
  const { settings, detailPopup } = state;
  return { settings, detailPopup };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
