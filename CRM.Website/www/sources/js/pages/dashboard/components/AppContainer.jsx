import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import DataGridRemark from './DataGridRemark';
import DataGridRedemption from './DataGridRedemption';
import EditRedemptionLog from '../../redemption/components/EditRedemptionLog';

export class AppContainer extends Component {
    static propTypes = {
        editRedemptionDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        editRedemptionDialog: { show: false }
    };

    handleCloseEditRedemptionDialog = isSuccessful => {
        this.props.setEditRedemptionDialog({ show: false });
        if (isSuccessful) {
            this.props.getRedemptionLogs({ customerId: 1754 });
        }
    };

    render() {
        const { editRedemptionDialog, status, redemption } = this.props;

        return (
            <div>
                <DataGridRemark />
                <DataGridRedemption />
                {
                    editRedemptionDialog.show &&
                    <EditRedemptionLog logId={editRedemptionDialog.redemptionId}
                        onClose={this.handleCloseEditRedemptionDialog}
                        allStatus={status}
                        redemptionLog={redemption}
                        editRedemptionLog={this.props.editRedemption}
                        getLogById={this.props.getRedemptionById}
                        getAllStatus={this.props.getStatus}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { editRedemptionDialog, status, redemption } = state;
    return { editRedemptionDialog, status, redemption };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
