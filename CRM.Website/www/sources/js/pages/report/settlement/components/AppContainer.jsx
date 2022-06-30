import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Chart from './Chart';
import DataGrid from './DataGrid';
import Filter from './Filter';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

export class AppContainer extends PureComponent {
    static propTypes = {
        contentChartPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        contentChartPopup: { show: false }
    };

    componentWillUnmount(){
        this.props.resetState();
    }

    render() {
        return (
            <Fragment>
                <Filter />
                <DataGrid />
                {
                    this.props.contentChartPopup.show && <Chart />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = state => {
  const { contentChartPopup } = state;
  return { contentChartPopup };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
