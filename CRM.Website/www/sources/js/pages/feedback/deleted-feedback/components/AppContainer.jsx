import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import EditFeedback from '../../edit-customer-feedback/AppContainer';
import LangHelper from '@jsroot/common/langHelper';
import Filter from './Filter';
import DataGrid from './DataGrid';

export class AppContainer extends Component {
    static propTypes = {
        getAllSettings: PropTypes.func,
        getDeletedFeedback: PropTypes.func,
        editFeedbackDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        getAllSettings: function (){
            // nothing
        },
        getDeletedFeedback: function (){
            // nothing
        },
        editFeedbackDialog: { show: false },
        viewRelatedCustomerDialog: { show: false }
    };

    componentDidMount() {
        this.props.getAllSettings();
        document.title = LangHelper.getResource('DeletedFeedbackv2');
    }

    componentWillUnmount(){
        this.props.resetState();
     }

    handleCloseEditFeedbackDialog = isSuccessful => {
        this.props.setEditFeedbackDialog({ show: false });
        if (isSuccessful) {
            this.props.getDeletedFeedback(this.props.gridParams);
        }
    };

    handleCloseViewRelatedCustomerDialog = () => {
        this.props.setViewRelatedCustomerDialog({ show: false });
    };

    render() {
        const { editFeedbackDialog, viewRelatedCustomerDialog } = this.props;
        return (
            <div>
                <Filter/>
                <DataGrid/>
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
                    editFeedbackDialog.show &&
                    <EditFeedback feedbackId={editFeedbackDialog.feedbackId}
                        onClose={this.handleCloseEditFeedbackDialog}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, gridParams, editFeedbackDialog, viewRelatedCustomerDialog } = state;
    return { settings, gridParams, editFeedbackDialog, viewRelatedCustomerDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
