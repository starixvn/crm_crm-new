import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import Chart from './Chart';

export class AppContainer extends Component {
  componentDidMount(){
    this.props.getAllSettings();
  }

  handleCloseChartDialog = () =>{
    this.props.setChartData({ show: false, data: null});
  };

  render() {
    const {settings, chart} = this.props;
    if(settings === null || !settings){
      return null;
    }
    return (
      <Fragment>
          <Filter />
          <DataGrid />
          {
            chart.show &&
            <Chart 
                chartInfo={chart.chartInfo}
                onClose={this.handleCloseChartDialog}
            />
          }
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = state => {
    const { settings, chart } = state;
    return { settings, chart };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
