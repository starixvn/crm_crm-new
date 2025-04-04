import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button } from 'react-bootstrap';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import Filter from './Filter';
import DataGrid from './DataGrid';
import Details from './Details';
import Chart from './Chart';
import RatingDataGrid from './RatingDataGrid';

export class AppContainer extends Component {
    componentDidMount() {
        document.title = LangHelper.getResource('FeedbackStatisticsv2');
    }
    componentWillUnmount() {
        this.props.resetState();
    }

    handleCloseDetailDialog = () => {
        this.props.setOpenDetailPopup({ show: false });
    };

    handleCloseViewRelatedCustomerDialog = () => {
        this.props.setViewRelatedCustomerDialog({ show: false });
    };

    handleCloseChartDialog = () => {
        this.props.setOpenChartPopup({ show: false, chartInfo: null });
    };

    renderDataGrid = (type) => {
        if (type === 12 || type === 13) {
            return <RatingDataGrid />;
        }

        return <DataGrid />;
    };

    render() {
        const { detailPopup, viewRelatedCustomerDialog, chart, gridParams } = this.props;

        return (
            <Fragment>
                <Filter />
                {this.renderDataGrid(gridParams.type)}
                {detailPopup.show && <Details onClose={this.handleCloseDetailDialog} />}
                {viewRelatedCustomerDialog.show && (
                    <SweetModalDialog
                        size="lg"
                        title={LangHelper.getResource('RelatedCustomer')}
                        contents={<div>{viewRelatedCustomerDialog.relatedCustomers}</div>}
                        buttons={[
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={this.handleCloseViewRelatedCustomerDialog}
                            >
                                {LangHelper.getResource('Close')}
                            </Button>,
                        ]}
                        onClose={this.handleCloseViewRelatedCustomerDialog}
                    />
                )}
                {chart.show && (
                    <Chart chartInfo={chart.chartInfo} onClose={this.handleCloseChartDialog} />
                )}
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(ActionCreators, dispatch);
const mapStateToProps = (state) => {
    const { detailPopup, viewRelatedCustomerDialog, chart, gridParams } = state;
    return { detailPopup, viewRelatedCustomerDialog, chart, gridParams };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
