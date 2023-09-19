import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Filter from './Filter';
import DataGrid from './DataGrid';
import EditNoOfInquiry from '../../feedback/edit-no-of-inquiry/AppContainer';
import EditCommunicationLog from './EditCommunicationLog';
import CreateCommunicationLog from './CreateCommunicationLog';
import { FunctionKey } from '@jsroot/common/constants';
import { getPermission, hasHostPermissionOnCurrentCustomer } from '@jsroot/common/shareScripts';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
    static propTypes = {
        editNoOfInquiryDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editCommunicationDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        createCommunicationDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        editNoOfInquiryDialog: { show: false },
        editCommunicationDialog: { show: false },
        createCommunicationDialog: { show: false }
    };

    constructor(props) {
        super(props);
        this.state = {
            customerInfoPolicy: null
        };
    }

    componentDidMount(){
        getPermission(FunctionKey.CreateUpdateFeedback).then(response => {
            this.setState({customerInfoPolicy: response});
        });
        document.title = LangHelper.getResource('CRMSystem');
    }

    componentWillUnmount(){
        this.props.resetState();
    }

    handleCloseEditNoInquiryDialog = () => {
        this.props.setEditNoOfInquiryDialog({ show: false });
    };

    handleCloseEditCommunicationDialog = isSuccessful => {
        this.props.setEditCommunicationDialog({ show: false });
        if (isSuccessful) {
            this.props.getLogsByCustomerId(this.props.gridParams);
        }
    };

    handleCloseCreateCommunicationDiaLog = isSuccessful => {
        this.props.setCreateCommunicationDialog({ show: false });
        if (isSuccessful) {
            this.props.setGridParams({ ...this.props.gridParams, pageIndex: 1, pageSize: 100 });
            this.props.getLogsByCustomerId(this.props.gridParams);
        }
    };

    render() {
        const { editNoOfInquiryDialog, editCommunicationDialog, createCommunicationDialog, customerInfo } = this.props;
        const {customerInfoPolicy} = this.state;
        if(!customerInfoPolicy){
            return null;
        }

        const hasHostLicensee = document.getElementById('hasHostLicenseePermission').checked;
        const hasHostCredit = document.getElementById('hasHostCreditPermission').checked;
        const canCreateLog = hasHostPermissionOnCurrentCustomer(hasHostCredit, hasHostLicensee, customerInfo.customerType);

        return (
            <div>
                <Filter id={this.props.id}/>
                <DataGrid canCreateCommunicationLog={canCreateLog} />
                {
                    editNoOfInquiryDialog.show &&
                    <EditNoOfInquiry feedbackId={editNoOfInquiryDialog.feedbackId}
                        onClose={this.handleCloseEditNoInquiryDialog}
                    />
                }
                {
                    editCommunicationDialog.show &&
                    <EditCommunicationLog feedbackId={editCommunicationDialog.feedbackId}
                        onClose={this.handleCloseEditCommunicationDialog}
                    />
                }
                {
                    createCommunicationDialog.show &&
                    <CreateCommunicationLog
                        id={this.props.id}
                        customerInfo={customerInfo}
                        isBaseInsert
                        onClose={this.handleCloseCreateCommunicationDiaLog}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editNoOfInquiryDialog, editCommunicationDialog, createCommunicationDialog } = state;
    return { gridParams, editNoOfInquiryDialog, editCommunicationDialog, createCommunicationDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
