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

export class AppContainer extends Component {
  handleCloseDetailDialog = () =>{
    this.props.setOpenDetailPopup({ show: false});
  };

  handleCloseChartDialog = () =>{
    this.props.setOpenDetailPopup({ show: false});
  };

  handleCloseViewRelatedCustomerDialog = () => {
    this.props.setViewRelatedCustomerDialog({ show: false });
  };

  render() {
    const {detailPopup, viewRelatedCustomerDialog} = this.props;
    return (
        <Fragment>
            <Filter />
            <DataGrid />
            {
              detailPopup.show &&
              <Details onClose={this.handleCloseDetailDialog}/>
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
    const { detailPopup, viewRelatedCustomerDialog } = state;
    return { detailPopup, viewRelatedCustomerDialog };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

