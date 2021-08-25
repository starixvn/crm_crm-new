import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import EditNoOfInquiry from '../../edit-no-of-inquiry/AppContainer';
import EditFeedback from '../../edit-customer-feedback/AppContainer';
import EditMultipleReviewAndStatus from './EditMultipleReviewAndStatus';
import EditMultipleLogs from './EditMultipleLogs';

export class AppContainer extends Component {
    static propTypes = {
        getAllSettings: PropTypes.func
    };

    static defaultProps = {
        getAllSettings: function () {
            // nothing
        }
    };

    componentDidMount() {
        this.props.getAllSettings();
    }

    handleCloseEditNoInquiryDialog = () => {
        this.props.setEditNoOfInquiryDialog({ show: false });
    };

    handleCloseEditFeedbackDialog = isSuccessful => {
        this.props.setEditFeedbackDialog({ show: false });
        if (isSuccessful) {
            this.props.getGridFeedbacks(this.props.gridParams);
        }
    };

    handleCloseMultipleEditStatusDialog = isSuccessful => {
        this.props.setEditMultipleLogStatusDialog({ show: false });
        if (isSuccessful) {
            this.props.getGridFeedbacks(this.props.gridParams);
        }
    };

    handleCloseMultipleEditLog = isSuccessful => {
        this.props.setEditMultipleLogDialog({ show: false });
        if (isSuccessful) {
            this.props.getGridFeedbacks(this.props.gridParams);
        }
    };

    render() {
        const { isHost, editNoOfInquiryDialog, editFeedbackDialog, editMultipleLogStatusDialog, editMultipleLogDialog } = this.props;
        return (
            <Fragment>
                <Filter />
                <DataGrid isHost={isHost} />
                {
                    editNoOfInquiryDialog.show &&
                    <EditNoOfInquiry feedbackId={editNoOfInquiryDialog.feedbackId}
                        onClose={this.handleCloseEditNoInquiryDialog}
                    />
                }
                {
                    editFeedbackDialog.show &&
                    <EditFeedback feedbackId={editFeedbackDialog.feedbackId}
                        onClose={this.handleCloseEditFeedbackDialog}
                    />
                }
                {
                    editMultipleLogStatusDialog.show &&
                    <EditMultipleReviewAndStatus feedbackIds={editMultipleLogStatusDialog.feedbackIds}
                        statuses={this.props.settings.statuses}
                        onClose={this.handleCloseMultipleEditStatusDialog}
                    />
                }
                {
                    editMultipleLogDialog.show &&
                    <EditMultipleLogs feedbackArr={editMultipleLogDialog.feedbackArr}
                        onClose={this.handleCloseMultipleEditLog}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        settings, editNoOfInquiryDialog,
        editFeedbackDialog, editMultipleLogStatusDialog, gridParams,
        editMultipleLogDialog
    } = state;
    return {
        settings, editNoOfInquiryDialog,
        editFeedbackDialog, editMultipleLogStatusDialog, gridParams,
        editMultipleLogDialog
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);