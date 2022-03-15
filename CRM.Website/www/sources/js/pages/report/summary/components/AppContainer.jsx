import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';

export class AppContainer extends Component {
    componentDidMount(){
      this.props.getAllSetting();
    }
  
    handleCloseChartDialog = () =>{
      this.props.setChartData({ show: false, title: '', data: null});
    };
  
    render() {
      const {allSettingData} = this.props;
      if(allSettingData === null || !allSettingData){
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
  const { allSettingData} = state;
  return { allSettingData };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);