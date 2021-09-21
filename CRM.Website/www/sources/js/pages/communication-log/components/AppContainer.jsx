import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Filter from './Filter';
import DataGrid from './DataGrid';
import EditNoOfInquiry from '../../feedback/edit-no-of-inquiry/AppContainer';
import EditCommunicationLog from './EditCommunicationLog';

export class AppContainer extends Component {
    static propTypes = {
        editNoOfInquiryDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editCommunicationDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        editNoOfInquiryDialog: { show: false },
        editCommunicationDialog: { show: false }
    };

    handleCloseEditNoInquiryDialog = () => {
        this.props.setEditNoOfInquiryDialog({ show: false });
    };

    handleCloseEditCommunicationDialog = isSuccessful => {
        this.props.getAllStatus({ isEdit: false });
        this.props.setEditCommunicationDialog({ show: false });
        if (isSuccessful) {
            this.props.getLogsByCustomerId(this.props.gridParams);
        }
    };

    render() {
        const { editNoOfInquiryDialog, editCommunicationDialog } = this.props;
        return (
            <div className="col-md-10">
                <Filter/>
                <DataGrid/>
                {
                    editNoOfInquiryDialog.show &&
                    <EditNoOfInquiry feedbackId={editNoOfInquiryDialog.feedbackId}
                        onClose={this.handleCloseEditNoInquiryDialog}
                    />
                }
                {
                    editCommunicationDialog.show &&
                    <EditCommunicationLog feedbackId={editCommunicationDialog.feedbackId}
                        onClose={this.handleCloseEditCommunicationDialog}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editNoOfInquiryDialog, editCommunicationDialog } = state;
    return { gridParams, editNoOfInquiryDialog, editCommunicationDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
