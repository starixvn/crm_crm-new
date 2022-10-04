import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import PropTypes from 'prop-types';
import LangHelper from '@jsroot/common/langHelper';
import CreateForm from '../../CreateForm';

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
        },
        getCustomerDetail: function () {
            // nothing
        }
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllSettings();
        this.props.getBalanceUpday();
        this.props.getCustomerDetail({customerId: this.props.currentCustomer.custId});
        document.title = LangHelper.getResource('AddFeedback');
    }

    componentWillUnmount(){
        this.props.resetState();
     }

    render() {
        const { currentCustomer, settings, balanceUpday, customerDetail, feedbackSubjectTemplates,
                confirmCreateGuestDialog, addFeedbackResult, duplicateFeedbackResult, setFeedbackSubjectTemplates, getFeedbackSubjectTemplates
        } = this.props;
        if (settings === null || balanceUpday === null || customerDetail === null) {
            return null;
        }
        return (
            <CreateForm
                settings={settings} balanceUpday={balanceUpday} customerDetail={customerDetail} feedbackSubjectTemplates={feedbackSubjectTemplates}
                confirmCreateGuestDialog={confirmCreateGuestDialog} setConfirmCreateGuestDialog={this.props.setConfirmCreateGuestDialog} currentCustomer={currentCustomer}
                addFeedbackResult={addFeedbackResult}  verifyUserName={this.props.verifyUserName} getTicketInfoByRef={this.props.getTicketInfoByRef}
                setAddFeedback={this.props.setAddFeedback} duplicateFeedbackResult={duplicateFeedbackResult} addFeedback={this.props.addFeedback}
                getFeedbackSubjectTemplates={getFeedbackSubjectTemplates} setFeedbackSubjectTemplates={setFeedbackSubjectTemplates}
            />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, balanceUpday, customerDetail, feedbackSubjectTemplates,
            confirmCreateGuestDialog, addFeedbackResult, duplicateFeedbackResult } = state;
    return { settings, balanceUpday, customerDetail, feedbackSubjectTemplates,
            confirmCreateGuestDialog, addFeedbackResult, duplicateFeedbackResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);