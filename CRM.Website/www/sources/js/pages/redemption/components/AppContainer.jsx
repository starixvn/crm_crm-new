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
        const { editRedemptionDialog, createRedemptionDialog } = this.props;
        return (
            <div>
                <Filter id={this.props.id}/>
                <DataGrid />
                {
                    editRedemptionDialog.show &&
                    <EditRedemptionLog logId={editRedemptionDialog.logId}
                        onClose={this.handleCloseEditRedemptionDialog}
                    />
                }
                {
                    createRedemptionDialog.show &&
                    <CreateRedemptionLog logId={createRedemptionDialog.logId}
                        id={this.props.id}
                        onClose={this.handleCloseCreateRedemptionDialog}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editRedemptionDialog, createRedemptionDialog } = state;
    return { gridParams, editRedemptionDialog, createRedemptionDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
