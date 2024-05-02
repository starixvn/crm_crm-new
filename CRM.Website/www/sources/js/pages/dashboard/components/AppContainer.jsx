import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import LastFiveSpecialRemarkDataGrid from './LastFiveSpecialRemarkDataGrid';
import DataGridRedemption from './DataGridRedemption';
import EditRedemptionLog from '../../redemption/components/EditRedemptionLog';
import DataGridCommunication from './DataGridCommunication';
import EditNoOfInquiry from '../../feedback/edit-no-of-inquiry/AppContainer';
import EditCommunicationLog from '../../communication-log/components/EditCommunicationLog';
import CreateCommunicationLog from '../../communication-log/components/CreateCommunicationLog';
import CustomerInfoVerify from './CustomerInfoVerify';
import EditCustomerInfoVerify from './EditCustomerInfoVerify';
import LastRemarkDataGrid from './LastRemarkDataGrid';
import LangHelper from '@jsroot/common/langHelper';
import { IsRemoveDatagridRedemption, IsRemoveVerify, Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';

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

    constructor(props) {
        super(props);
        this.state = {
            remarksPolicy: null
        };
    }

    componentDidMount() {
        document.title = LangHelper.getResource('CRMSystem');
        getPermission(FunctionKey.Remarks, true).then(async response => {
            await this.setState({ remarksPolicy: response });
        });
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    handleCloseEditRedemptionDialog = isSuccessful => {
        this.props.setEditRedemptionDialog({ show: false });
        if (isSuccessful) {
            this.props.getRedemptionLogs({ customerId: this.props.custId });
        }
    };

    handleCloseNoInquiryDialog = () => {
        this.props.setNoOfInquiryDialog({ show: false });
    };

    handleCloseEditCommunicationDialog = isSuccessful => {
        this.props.setEditCommunicationDialog({ show: false });
        if (isSuccessful) {
            this.props.getCommunicationLogs({ customerId: this.props.custId });
        }
    };

    handleCloseCreateCmnDiaLog = isSuccessful => {
        this.props.setCreateCommunicationDialog({ show: false });
        if (isSuccessful) {
            this.props.getCommunicationLogs({ customerId: this.props.custId });
        }
    };

    handleCloseEditCustomerVerify = isSuccessful => {
        this.props.setEditCustomerVerifyDialog({ show: false });
        if (isSuccessful) {
            this.props.getCustomerInfoVerify({ customerId: this.props.custId });
        }
    };

    renderRemark = () => {
        const { currentCustomer, custId } = this.props;
        const hasReadSitePermission = document.getElementById('hasReadSitePermission').checked;
        if (!hasReadSitePermission) {
            return null;
        }

        if (currentCustomer.isCreditSite) {
            return this.state.remarksPolicy >= Policy.Read ? <div><LastRemarkDataGrid custId={parseInt(custId, 10)} currentCustomer={currentCustomer} /></div> : null;
        }

        return <div><LastFiveSpecialRemarkDataGrid id={custId} /></div>;
    }
    render() {
        const hasCreateFeedbackPermission = document.getElementById('hasCreateFeedbackPermission').checked;
        const hasReadFeedbackPermission = document.getElementById('hasReadFeedbackPermission').checked;

        if (!this.props.custId) {
            return (
                <div className='alert-boxer'>
                    <span className="fa fa-exclamation-triangle pr-2" aria-hidden="true" />
                    <span>Please search customer first!</span>
                </div>
            );
        }

        const {
            custId, editRedemptionDialog, noOfInquiryDialog, editCommunicationDialog,
            createCommunicationDialog, editCustomerVerifyDialog, currentCustomer
        } = this.props;
        return (
            <>
                <div>
                    {
                        this.renderRemark()
                    }
                    {
                        !IsRemoveVerify &&
                        <div className="information"><CustomerInfoVerify id={custId} /></div>
                    }
                </div>
                {
                    !IsRemoveDatagridRedemption &&
                    <DataGridRedemption id={custId} />
                }
                {
                    hasReadFeedbackPermission && <DataGridCommunication id={custId} isHost={hasCreateFeedbackPermission} />
                }
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
                        id={createCommunicationDialog.custId}
                        onClose={this.handleCloseCreateCmnDiaLog}
                        options={createCommunicationDialog.options}
                        customerInfo={currentCustomer?.customerInfo}
                    />
                }
                {
                    editCustomerVerifyDialog.show &&
                    <EditCustomerInfoVerify
                        isHost={hasCreateFeedbackPermission}
                        id={custId}
                        onClose={this.handleCloseEditCustomerVerify}
                    />
                }
            </>
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