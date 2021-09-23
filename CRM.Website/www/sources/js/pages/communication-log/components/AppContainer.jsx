import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Filter from './Filter';
import DataGrid from './DataGrid';
import EditNoOfInquiry from '../../feedback/edit-no-of-inquiry/AppContainer';
import EditCommunicationLog from './EditCommunicationLog';
import InsertCommunicationLog from './InsertCommunicationLog';

export class AppContainer extends Component {
    static propTypes = {
        editNoOfInquiryDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editCommunicationDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        insertCommunicationDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        editNoOfInquiryDialog: { show: false },
        editCommunicationDialog: { show: false },
        insertCommunicationDialog: { show: false }
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

    handleCloseInsertCommunicationDiaLog = () => {
        this.props.setInsertCommunicationDialog({ show: false });
    };

    render() {
        const { editNoOfInquiryDialog, editCommunicationDialog, insertCommunicationDialog } = this.props;
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
                {
                    insertCommunicationDialog.show &&
                    <InsertCommunicationLog
                        onClose={this.handleCloseInsertCommunicationDiaLog}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editNoOfInquiryDialog, editCommunicationDialog, insertCommunicationDialog } = state;
    return { gridParams, editNoOfInquiryDialog, editCommunicationDialog, insertCommunicationDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
