import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import EditNoOfInquiry from '../../edit-no-of-inquiry/AppContainer';
import EditFeedback from '../../edit-customer-feedback/AppContainer';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import Filter from './Filter';
import DataGrid from './DataGrid';

export class AppContainer extends Component {
    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        editNoOfInquiryDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editFeedbackDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
    };

    static defaultProps = {
        isHost: false,
        editNoOfInquiryDialog: { show: false },
        editFeedbackDialog: { show: false },
        getAllSettings: function () {
            // nothing
        }
    };
    
    componentDidMount() {
        this.props.getAllSettings();
    };

    handleCloseEditFeedbackDialog = isSuccessful => {
        this.props.setEditFeedbackDialog({ show: false });
        if (isSuccessful) {
            this.props.getDeletedFeedback(this.props.gridParams);
        }
    };

    render() {
        const { isHost, editFeedbackDialog} = this.props;
        return (
            <>
                <Filter/>
                <DataGrid isHost={isHost}/>
                {
                    editFeedbackDialog.show &&
                    <EditFeedback feedbackId={editFeedbackDialog.feedbackId}
                        onClose={this.handleCloseEditFeedbackDialog}
                    />
                }
            </>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    return { 
        settings: state.settings,
        editFeedbackDialog: state.editFeedbackDialog
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
