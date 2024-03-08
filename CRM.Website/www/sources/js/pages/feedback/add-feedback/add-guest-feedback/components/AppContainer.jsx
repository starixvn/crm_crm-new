import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import PropTypes from 'prop-types';
import CreateForm from '../../CreateForm';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
    static propTypes = {
        getAllSettings: PropTypes.func,
        getBalanceUpday: PropTypes.func
    };

    static defaultProps = {
        getAllSettings: function () {
            // nothing
        },
        getBalanceUpday: function () {
            // nothing
        }
    };

    componentDidMount() {
        this.props.getAllSettings();
        this.props.getBalanceUpday();
        this.props.getCustomerDetail({customerId: this.props.currentCustomer.custId});
        document.title = LangHelper.getResource('AddGuestFeedback');
    }

    componentWillUnmount(){
        this.props.resetState();
     }

    render() {
        const { settings, balanceUpday, customerDetail, feedbackSubjectTemplates, confirmCreateGuestDialog, addFeedbackResult, getFeedbackSubjectTemplates, setFeedbackSubjectTemplates } = this.props;
        if (settings === null || balanceUpday === null || customerDetail === null) {
            return null;
        }
        return (
            <CreateForm
                settings={settings} balanceUpday={balanceUpday} customerDetail={customerDetail} feedbackSubjectTemplates={feedbackSubjectTemplates}
                confirmCreateGuestDialog={confirmCreateGuestDialog} addFeedbackResult={addFeedbackResult} verifyUserName={this.props.verifyUserName}
                getTicketInfoByRef={this.props.getTicketInfoByRef} setAddFeedback={this.props.setAddFeedback} addFeedback={this.props.addFeedback}
                setConfirmCreateGuestDialog={this.props.setConfirmCreateGuestDialog} getFeedbackSubjectTemplates={getFeedbackSubjectTemplates}
                setFeedbackSubjectTemplates={setFeedbackSubjectTemplates}
            />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, balanceUpday, feedbackSubjectTemplates, customerDetail, confirmCreateGuestDialog, addFeedbackResult } = state;
    return {
        settings, balanceUpday, feedbackSubjectTemplates, customerDetail, confirmCreateGuestDialog, addFeedbackResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);