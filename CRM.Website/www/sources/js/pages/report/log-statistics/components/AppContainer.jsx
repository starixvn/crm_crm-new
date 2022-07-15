import React, { Component, Fragment, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
const DataGrid = lazy(() => import('./DataGrid'));
const Detail = lazy(() => import('./Detail'));
import Chart from './Chart';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
  componentDidMount(){
    this.props.getAllSettings();
    document.title = LangHelper.getResource('LogStatistics');
  }

  componentWillUnmount(){
    this.props.resetState();
  }

  handleCloseChartDialog = () =>{
    this.props.setChartData({ show: false, title: '', data: null});
  };

  render() {
    const {settings, details, chart} = this.props;
    if(settings === null || !settings){
      return null;
    }
    return (
      <Fragment>
        <Filter />
          <Suspense fallback={<div>Loading...</div>}>
            {
              details.show ? <Detail /> : <DataGrid />
            }
          </Suspense>
        {
          chart.show &&
          <Chart chart={chart} onClose={this.handleCloseChartDialog} />
        }
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = state => {
  const { settings, details, chart } = state;
  return { settings, details, chart };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
