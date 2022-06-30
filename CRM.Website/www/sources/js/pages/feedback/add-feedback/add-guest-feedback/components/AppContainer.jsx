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
        }
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllSettings();
        this.props.getBalanceUpday();
    }

    componentWillUnmount(){
        this.props.resetState();
     }

    render() {
        const {settings,balanceUpday, feedbackSubjectTemplates, confirmCreateGuestDialog, addFeedbackResult } = this.props;
        if (settings === null || balanceUpday === null) {
            return null;
        }
        return (
            <CreateForm
                settings={settings} balanceUpday={balanceUpday} customerDetail={null} feedbackSubjectTemplates={feedbackSubjectTemplates}
                confirmCreateGuestDialog={confirmCreateGuestDialog} addFeedbackResult={addFeedbackResult} verifyUserName={this.props.verifyUserName}
                getTicketInfoByRef={this.props.getTicketInfoByRef} setAddFeedback={this.props.setAddFeedback} addFeedback={this.props.addFeedback}
                setConfirmCreateGuestDialog={this.props.setConfirmCreateGuestDialog}
            />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, balanceUpday, feedbackSubjectTemplates, confirmCreateGuestDialog, addFeedbackResult } = state;
    return {
        settings, balanceUpday, feedbackSubjectTemplates, confirmCreateGuestDialog, addFeedbackResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);