import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Filter from './Filter';
import DataGrid from './DataGrid';
import FeedbackDetails from '../../deleted-feedback-statistic/components/FeedbackDetails';
import Chart from './Chart';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
    static propTypes = {
        viewChartDialog: PropTypes.shape({ show: PropTypes.bool, chartInfo: PropTypes.objectOf(PropTypes.any) }).isRequired,
        viewCommunicationDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        viewChartDialog: { show: false, chartInfo: {} },
        viewCommunicationDialog: { show: false }
    };

    componentDidMount() {
        document.title = LangHelper.getResource('DynamicReport');
    }

    componentWillUnmount(){
        this.props.resetState();
        document.getElementsByTagName('html')[0].style.overflow = null;
    }

    handleCloseViewCommunication = () => {
        this.props.setViewCommunicationDialog({ show: false });
    };

    handleCloseViewChart = () => {
        this.props.setViewChartDialog({ show: false });
    };

    render() {
        const { viewCommunicationDialog, viewChartDialog, gridParams} = this.props;
        return (
            <div>
                <Filter />
                <DataGrid />
                {
                    viewCommunicationDialog.show &&
                    <FeedbackDetails
                        title='CommunicationLogDetail'
                        feedbackId={viewCommunicationDialog.feedbackId}
                        onClose={this.handleCloseViewCommunication}
                    />
                }
                {
                    viewChartDialog.show &&
                    <Chart
                        onClose={this.handleCloseViewChart}
                        chartInfo={viewChartDialog.chartInfo}
                        reportType={gridParams.reportType}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { viewCommunicationDialog, viewChartDialog, gridParams } = state;
    return { viewCommunicationDialog, viewChartDialog, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);