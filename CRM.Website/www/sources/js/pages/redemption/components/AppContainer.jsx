import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import DataGrid from './DataGrid';
import Filter from './Filter';
import EditRedemptionLog from './EditRedemptionLog';
import InsertRedemptionLog from './InsertRedemptionLog';

export class AppContainer extends Component {
    static propTypes = {
        editRedemptionDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        insertRedemptionDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        editRedemptionDialog: { show: false },
        insertRedemptionDialog: { show: false }
    };

    handleCloseEditRedemptionDialog = isSuccessful => {
        this.props.setEditRedemptionDialog({ show: false });
        if (isSuccessful) {
            this.props.getLogsByCustomerId(this.props.gridParams);
        }
    };

    handleCloseInsertRedemptionDialog = isSuccessful => {
        this.props.setInsertRedemptionDialog({ show: false });
        if (isSuccessful) {
            this.props.getLogsByCustomerId(this.props.gridParams);
        }
    };

    render() {
        const { editRedemptionDialog, insertRedemptionDialog } = this.props;
        return (
            <div className="col-md-10">
                <Filter />
                <DataGrid />
                {
                    editRedemptionDialog.show &&
                    <EditRedemptionLog logId={editRedemptionDialog.logId}
                        onClose={this.handleCloseEditRedemptionDialog}
                    />
                }
                {
                    insertRedemptionDialog.show &&
                    <InsertRedemptionLog logId={insertRedemptionDialog.logId}
                        onClose={this.handleCloseInsertRedemptionDialog}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editRedemptionDialog, insertRedemptionDialog } = state;
    return { gridParams, editRedemptionDialog, insertRedemptionDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
