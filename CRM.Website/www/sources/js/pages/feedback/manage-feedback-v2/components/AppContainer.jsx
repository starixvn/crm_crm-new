import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button } from 'react-bootstrap';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import Filter from './Filter';
import DataGrid from './DataGrid';
import EditNoOfInquiry from '../../edit-no-of-inquiry/AppContainer';
import EditFeedback from '../../edit-customer-feedback/AppContainer';
import EditMultipleReviewAndStatus from './EditMultipleReviewAndStatus';
import EditMultipleLogs from './EditMultipleLogs';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';

export class AppContainer extends Component {
    static propTypes = {
        getAllSettings: PropTypes.func
    };

    static defaultProps = {
        getAllSettings: function () {
            // nothing
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            policy: null
        };
    }

    componentDidMount() {
        this.props.getAllSettings();
        getPermission(FunctionKey.CreateUpdateFeedbackAndCustomerInfo).then(response => {
            this.setState({policy: response});
        });
        document.title = LangHelper.getResource('ManageFeedback');
    }

    componentWillUnmount(){
        this.props.resetState();
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

    handleCloseViewRelatedCustomerDialog = () => {
        this.props.setViewRelatedCustomerDialog({ show: false });
    };

    render() {
        if(!this.state.policy){
            return null;
        }
        const isHost = this.state.policy === Policy.Host;
        const { editNoOfInquiryDialog, editFeedbackDialog, editMultipleLogStatusDialog, editMultipleLogDialog, viewRelatedCustomerDialog, currentCustomer } = this.props;
        return (
            <Fragment>
                <Filter currentCustomer={currentCustomer}/>
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
                {
                    viewRelatedCustomerDialog.show &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('RelatedCustomer')}
                        contents={
                            <div>{viewRelatedCustomerDialog.relatedCustomers}</div>
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleCloseViewRelatedCustomerDialog}>
                                {LangHelper.getResource('Close')}
                            </Button>
                        ]}
                        onClose={this.handleCloseViewRelatedCustomerDialog}
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
        editMultipleLogDialog, viewRelatedCustomerDialog
    } = state;
    return {
        settings, editNoOfInquiryDialog,
        editFeedbackDialog, editMultipleLogStatusDialog, gridParams,
        editMultipleLogDialog, viewRelatedCustomerDialog
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);