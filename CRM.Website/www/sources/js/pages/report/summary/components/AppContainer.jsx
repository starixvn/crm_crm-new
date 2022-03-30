import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';


export class AppContainer extends Component {
    componentDidMount(){
      this.props.getAllSetting();
    }

    constructor(props) {
      super(props);
  }
    render() {
      const demo = this.state;
      const {allSettingData, gridData} = this.props;
      if(allSettingData === null || !allSettingData){
        return null;
      }
      return (
        <Fragment>
          <Filter />
          {
            gridData != null ? <DataGrid/> : null
          }

        </Fragment>
      );
    }
  }

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = state => {
  const { allSettingData, gridData, contentChartPopup} = state;
  return { allSettingData, gridData, contentChartPopup };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);