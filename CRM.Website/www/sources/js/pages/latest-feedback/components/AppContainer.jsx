import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import PropTypes from 'prop-types';
import DataGrid from './DataGrid';
import EditNoInquiries from './QuickUpdateFeedback';
import EditFeedback from './UpdateFeedback';

export class AppContainer extends Component {
    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        getLatestFeedback: PropTypes.func,
        editNoInquiriesDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editFeedbackDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
    };

    static defaultProps = {
        isHost: false,
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

    render() {
        return (
            <Fragment>
                <Filter />
                <DataGrid isHost={this.props.isHost} />
                {
                    this.props.editNoInquiriesDialog.show &&
                    <EditNoInquiries
                        onClose={this.handleCloseEditNoInquiriesDialog}
                        onSuccess={this.handleEditNoInquiriesSuccess}
                    />
                }
                {
                    this.props.editFeedbackDialog.show &&
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
    const { gridParams, editNoInquiriesDialog, editFeedbackDialog } = state;
    return { gridParams, editNoInquiriesDialog, editFeedbackDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);