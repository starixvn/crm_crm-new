import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import PropTypes from 'prop-types';
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
        this.props.getCustomerDetail({customerId: this.props.id});
        
    }

    render() {
        const { settings, balanceUpday, customerDetail, feedbackSubjectTemplates, confirmCreateGuestDialog, addCustomerFeedbackResult } = this.props;
        if (settings === null || balanceUpday === null || customerDetail === null) {
            return null;
        }
        return (
            <CreateForm
                settings = {settings} balanceUpday= {balanceUpday} customerDetail={customerDetail} feedbackSubjectTemplates = {feedbackSubjectTemplates}
                confirmCreateGuestDialog = {confirmCreateGuestDialog} addCustomerFeedbackResult = {addCustomerFeedbackResult}
            />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, balanceUpday, customerDetail, feedbackSubjectTemplates, confirmCreateGuestDialog, addCustomerFeedbackResult } = state;
    return { settings, balanceUpday, customerDetail, feedbackSubjectTemplates, confirmCreateGuestDialog, addCustomerFeedbackResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);