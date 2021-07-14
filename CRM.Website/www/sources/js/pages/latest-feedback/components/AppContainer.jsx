import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import EditNoInquiries from './EditNoInquiries';
import EditFeedback from './EditFeedback';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        getLatestFeedback: PropTypes.func,
        editNoInquiriesDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editFeedbackDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
    };

    static defaultProps = {
        isHost: false,
        viewRelatedCustomerDialog: { show: false },
        editNoInquiriesDialog: { show: false },
        editFeedbackDialog: { show: false },
        getLatestFeedback: function () {
            // nothing
        },
        getAllSettings: function () {
            // nothing
        }
    };

    componentDidMount() {
        this.props.getLatestFeedback(this.props.gridParams);
        this.props.getAllSettings();
    };

    handleCloseEditNoInquiriesDialog = () => {
        this.props.setEditNoInquiriesDialog({ show: false });
        this.props.setEditNoInquiriesResult(null);
    };

    handleEditNoInquiriesSuccess = () => {
        this.handleCloseEditNoInquiriesDialog();
    };

    handleCloseEditFeedbackDialog = () => {
        this.props.setEditFeedbackDialog({ show: false });
        this.props.setEditFeedbackResult(null);
    };

    handleEditFeedbackSuccess = () => {
        this.handleCloseEditFeedbackDialog();
        this.props.getLatestFeedback(this.props.gridParams);
    };

    handleCloseViewRelatedCustomerDialog = () => {
        this.props.setViewRelatedCustomerDialog({ show: false });
    };

    render() {
        const { isHost, viewRelatedCustomerDialog, editNoInquiriesDialog, editFeedbackDialog } = this.props;
        return (
            <Fragment>
                <Filter />
                <DataGrid isHost={isHost} />
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
                {
                    editNoInquiriesDialog.show &&
                    <EditNoInquiries
                        onClose={this.handleCloseEditNoInquiriesDialog}
                        onSuccess={this.handleEditNoInquiriesSuccess}
                    />
                }
                {
                    editFeedbackDialog.show &&
                    <EditFeedback
                        onClose={this.handleCloseEditFeedbackDialog}
                        onSuccess={this.handleEditFeedbackSuccess}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, viewRelatedCustomerDialog, editNoInquiriesDialog, editFeedbackDialog } = state;
    return { gridParams, viewRelatedCustomerDialog, editNoInquiriesDialog, editFeedbackDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);