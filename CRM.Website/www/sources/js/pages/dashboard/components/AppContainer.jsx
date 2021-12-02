import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import DataGridRemark from './DataGridRemark';
import DataGridRedemption from './DataGridRedemption';
import EditRedemptionLog from '../../redemption/components/EditRedemptionLog';
import DataGridCommunication from './DataGridCommunication';
import EditNoOfInquiry from '../../feedback/edit-no-of-inquiry/AppContainer';

export class AppContainer extends Component {
    static propTypes = {
        editRedemptionDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        noOfInquiryDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        editRedemptionDialog: { show: false },
        noOfInquiryDialog: { show: false },
    };

    handleCloseEditRedemptionDialog = isSuccessful => {
        this.props.setEditRedemptionDialog({ show: false });
        if (isSuccessful) {
            this.props.getRedemptionLogs({ customerId: 1754 });
        }
    };

    handleCloseNoInquiryDialog = () => {
        this.props.setNoOfInquiryDialog({ show: false });
    };

    render() {
        const { editRedemptionDialog, status, redemption, noOfInquiryDialog } = this.props;

        return (
            <div>
                <DataGridRemark />
                <DataGridRedemption />
                <DataGridCommunication />
                {
                    editRedemptionDialog.show &&
                    <EditRedemptionLog logId={editRedemptionDialog.redemptionId}
                        onClose={this.handleCloseEditRedemptionDialog}
                        allStatus={status}
                        redemptionLog={redemption}
                        editRedemptionLog={this.props.editRedemption}
                        getLogById={this.props.getRedemptionById}
                        getAllStatus={this.props.getStatus}
                    />
                }
                {
                    noOfInquiryDialog.show &&
                    <EditNoOfInquiry feedbackId={noOfInquiryDialog.feedbackId}
                        onClose={this.handleCloseNoInquiryDialog}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { editRedemptionDialog, status, redemption, noOfInquiryDialog } = state;
    return { editRedemptionDialog, status, redemption, noOfInquiryDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
