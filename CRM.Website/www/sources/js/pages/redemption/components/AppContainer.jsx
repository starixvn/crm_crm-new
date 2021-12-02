import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import DataGrid from './DataGrid';
import Filter from './Filter';
import EditRedemptionLog from './EditRedemptionLog';
import CreateRedemptionLog from './CreateRedemptionLog';

export class AppContainer extends Component {
    static propTypes = {
        editRedemptionDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        createRedemptionDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        editRedemptionDialog: { show: false },
        createRedemptionDialog: { show: false }
    };

    handleCloseEditRedemptionDialog = isSuccessful => {
        this.props.setEditRedemptionDialog({ show: false });
        if (isSuccessful) {
            this.props.getLogsByCustomerId(this.props.gridParams);
        }
    };

    handleCloseCreateRedemptionDialog = isSuccessful => {
        this.props.setCreateRedemptionDialog({ show: false });
        if (isSuccessful) {
            this.props.getLogsByCustomerId(this.props.gridParams);
        }
    };

    render() {
        const { editRedemptionDialog, createRedemptionDialog, redemptionLog, allStatus } = this.props;
        return (
            <div>
                <Filter />
                <DataGrid />
                {
                    editRedemptionDialog.show &&
                    <EditRedemptionLog logId={editRedemptionDialog.logId}
                        onClose={this.handleCloseEditRedemptionDialog}
                        redemptionLog={redemptionLog}
                        allStatus={allStatus}
                        getLogById={this.props.getLogById}
                        getAllStatus={this.props.getAllStatus}
                        editRedemptionLog={this.props.editRedemptionLog}
                    />
                }
                {
                    createRedemptionDialog.show &&
                    <CreateRedemptionLog logId={createRedemptionDialog.logId}
                        onClose={this.handleCloseCreateRedemptionDialog}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editRedemptionDialog, createRedemptionDialog, redemptionLog, allStatus } = state;
    return { gridParams, editRedemptionDialog, createRedemptionDialog, redemptionLog, allStatus };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
