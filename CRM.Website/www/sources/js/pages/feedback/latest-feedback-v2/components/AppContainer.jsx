import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import EditNoOfInquiry from '../../edit-no-of-inquiry/AppContainer';
import EditFeedback from '../../edit-customer-feedback/AppContainer';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';

export class AppContainer extends Component {
    static propTypes = {
        getLatestFeedback: PropTypes.func,
        editNoOfInquiryDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editFeedbackDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        viewRelatedCustomerDialog: { show: false },
        editNoOfInquiryDialog: { show: false },
        editFeedbackDialog: { show: false },
        getLatestFeedback: function () {
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
        getPermission(FunctionKey.CreateUpdateFeedbackAndCustomerInfo).then(response => {
            this.setState({policy: response});
        });
        this.handleInitData();
    }

    componentDidUpdate(prevProps){
        if (prevProps.custId !== this.props.custId) {
            this.handleInitData();
        }
    }

    componentWillUnmount(){
        this.props.resetState();
    }

    handleInitData = () =>{
        if(this.props.custId !== undefined && this.props.custId > 0){
            const params = {...this.props.gridParams, custId: this.props.custId, username: this.props.username};
            this.props.setGridParams(params);
            this.props.getLatestFeedbackByCustId(params);
            document.title = LangHelper.getResource('LatestFeedback');
        } else{
            this.props.getLatestFeedback(this.props.gridParams);
            document.title = LangHelper.getResource('LatestFeedbackv2');
        }
    }

    handleCloseEditNoInquiryDialog = () => {
        this.props.setEditNoOfInquiryDialog({ show: false });
    };

    handleCloseEditFeedbackDialog = isSuccessful => {
        this.props.setEditFeedbackDialog({ show: false });
        if (isSuccessful) {
            this.props.getLatestFeedback(this.props.gridParams);
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
        const {viewRelatedCustomerDialog, editNoOfInquiryDialog, editFeedbackDialog } = this.props;
        return (
            <Fragment>
                <Filter custId={this.props.custId} username={this.props.username}/>
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
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, viewRelatedCustomerDialog, editNoOfInquiryDialog, editFeedbackDialog } = state;
    return { gridParams, viewRelatedCustomerDialog, editNoOfInquiryDialog, editFeedbackDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);