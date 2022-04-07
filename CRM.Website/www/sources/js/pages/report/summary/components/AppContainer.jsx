import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import PropTypes from 'prop-types';
import Filter from './Filter';
import DataGrid from './DataGrid';
import Chart from './Chart';

export class AppContainer extends Component {
  static propTypes = {
    contentChartPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired
  };

  static defaultProps = {
    contentChartPopup: { show: false }
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllSetting();
  }

  render() {
    const { allSettingData, gridData, contentChartPopup } = this.props;
    if (allSettingData === null || !allSettingData) {
      return null;
    }
    return (
      <Fragment>
        <Filter />
        {
          gridData === null ? null : <DataGrid />
        }
        {
          contentChartPopup.show && <Chart />
        }
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = state => {
  const { allSettingData, gridData, contentChartPopup } = state;
  return { allSettingData, gridData, contentChartPopup };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);