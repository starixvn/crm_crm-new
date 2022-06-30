import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Filter from './Filter';
import DataGrid from './DataGrid';
import FeedbackDetails from '../../deleted-feedback-statistic/components/FeedbackDetails';
import Chart from './Chart';

export class AppContainer extends Component {
    static propTypes = {
        viewCommunicationDialog: PropTypes.shape({ show: PropTypes.bool, chartInfo: PropTypes.object }).isRequired,
        viewChartDialog: PropTypes.shape({ show: PropTypes.bool, chartInfo: {} }).isRequired
    };

    static defaultProps = {
        viewCommunicationDialog: { show: false },
        viewChartDialog: { show: false, chartInfo: {} }
    };

    componentWillUnmount(){
        this.props.resetState();
    }

    handleCloseViewCommunication = () => {
        this.props.setViewCommunicationDialog({ show: false });
    };

    handleCloseViewChart = () => {
        this.props.setViewChartDialog({ show: false });
    };

    render() {
        const { viewCommunicationDialog, viewChartDialog } = this.props;
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
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { viewCommunicationDialog, viewChartDialog } = state;
    return { viewCommunicationDialog, viewChartDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);