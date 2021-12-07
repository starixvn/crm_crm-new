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
import EditCommunicationLog from '../../communication-log/components/EditCommunicationLog';
import CreateCommunicationLog from '../../communication-log/components/CreateCommunicationLog';
import CustomerInfoVerify from './CustomerInfoVerify';
import EditCustomerInfoVerify from './EditCustomerInfoVerify';

export class AppContainer extends Component {
    static propTypes = {
        editRedemptionDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        noOfInquiryDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editCommunicationDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        createCommunicationDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editCustomerVerifyDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        editRedemptionDialog: { show: false },
        noOfInquiryDialog: { show: false },
        editCommunicationDialog: { show: false },
        createCommunicationDialog: { show: false },
        editCustomerVerifyDialog: { show: false }
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

    handleCloseEditCommunicationDialog = isSuccessful => {
        this.props.setEditCommunicationDialog({ show: false });
        if (isSuccessful) {
            this.props.getCommunicationLogs({ customerId: 1754 });
        }
    };

    handleCloseCreateCmnDiaLog = isSuccessful => {
        this.props.setCreateCommunicationDialog({ show: false });
        if (isSuccessful) {
            this.props.getCommunicationLogs({ customerId: 1754 });
        }
    };

    handleCloseEditCustomerVerify = isSuccessful => {
        this.props.setEditCustomerVerifyDialog({ show: false });
        if (isSuccessful) {
            this.props.getCustomerInfoVerify({ customerId: 1754 });
        }
    };

    render() {
        const {
            editRedemptionDialog, noOfInquiryDialog, editCommunicationDialog,
            createCommunicationDialog, editCustomerVerifyDialog
        } = this.props;

        return (
            <div>
                <div className="d-flex justify-content-between">
                    <div className="dataGrid-remark"><DataGridRemark /></div>
                    <div className="information"><CustomerInfoVerify /></div>
                </div>
                <DataGridRedemption />
                <DataGridCommunication />
                {
                    editRedemptionDialog.show &&
                    <EditRedemptionLog logId={editRedemptionDialog.redemptionId}
                        onClose={this.handleCloseEditRedemptionDialog}
                    />
                }
                {
                    noOfInquiryDialog.show &&
                    <EditNoOfInquiry feedbackId={noOfInquiryDialog.feedbackId}
                        onClose={this.handleCloseNoInquiryDialog}
                    />
                }
                {
                    editCommunicationDialog.show &&
                    <EditCommunicationLog feedbackId={editCommunicationDialog.id}
                        onClose={this.handleCloseEditCommunicationDialog}
                    />
                }
                {
                    createCommunicationDialog.show &&
                    <CreateCommunicationLog
                        onClose={this.handleCloseCreateCmnDiaLog}
                        item={createCommunicationDialog.item}
                        options={createCommunicationDialog.options}
                    />
                }
                {
                    editCustomerVerifyDialog.show &&
                    <EditCustomerInfoVerify
                        onClose={this.handleCloseEditCustomerVerify}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        editRedemptionDialog, noOfInquiryDialog, editCommunicationDialog,
        createCommunicationDialog, editCustomerVerifyDialog
    } = state;
    return {
        editRedemptionDialog, noOfInquiryDialog, editCommunicationDialog,
        createCommunicationDialog, editCustomerVerifyDialog
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
