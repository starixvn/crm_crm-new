import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import EditFeedback from '@jsroot/pages/feedback/edit-customer-feedback/AppContainer';
import LangHelper from '@jsroot/common/langHelper';
import Filter from './Filter';
import DataGrid from './DataGrid';

export class AppContainer extends Component {
handleCloseEditFeedbackDialog = isSuccessful => {
    this.props.setEditFeedbackDialog({ show: false });
    if (isSuccessful) {
        this.props.getDeletedFeedbackStatistic(this.props.gridParams);
    }
};

handleCloseViewRelatedCustomerDialog = () => {
    this.props.setViewRelatedCustomerDialog({ show: false });
};
  render() {
    const { editFeedbackDialog, viewRelatedCustomerDialog } = this.props;
    return (
      <Fragment>
           <Filter />
           <DataGrid />
           {
              viewRelatedCustomerDialog.show &&
              <SweetModalDialog size="lg"
                  title={LangHelper.getResource('RelatedCustomer')}
                  contents={<div>{viewRelatedCustomerDialog.relatedCustomers}</div>}
                  buttons={[
                      <Button variant="primary" size="sm" 
                          onClick={this.handleCloseViewRelatedCustomerDialog}>
                          {LangHelper.getResource('Close')}
                      </Button>
                  ]}
                  onClose={this.handleCloseViewRelatedCustomerDialog}
              />
           }
           {
              editFeedbackDialog.show &&
              <EditFeedback 
                  feedbackId={editFeedbackDialog.feedbackId}
                  onClose={this.handleCloseEditFeedbackDialog}
                  isDeletedFeedbackView
              />
           }
      </Fragment>
);
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { editFeedbackDialog, viewRelatedCustomerDialog, gridParams } = state;
    return { editFeedbackDialog, viewRelatedCustomerDialog, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
