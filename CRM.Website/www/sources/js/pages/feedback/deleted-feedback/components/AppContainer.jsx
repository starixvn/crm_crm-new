import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import EditFeedback from '../../edit-customer-feedback/AppContainer';
import Filter from './Filter';
import DataGrid from './DataGrid';

export class AppContainer extends Component {
    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        editFeedbackDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        isHost: false,
        editFeedbackDialog: { show: false }
    };

    componentDidMount() {
        this.props.getAllSettings();
    }

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
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, gridParams, editFeedbackDialog } = state;
    return { settings, gridParams, editFeedbackDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
