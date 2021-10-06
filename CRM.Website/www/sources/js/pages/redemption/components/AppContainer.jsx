import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import DataGrid from './DataGrid';
import Filter from './Filter';
import EditRedemptionLog from './EditRedemptionLog';

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
            this.props.getLogsByCustomerId(this.props.gridParams);
        }
    };

    render() {
        const { editRedemptionDialog } = this.props;
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
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editRedemptionDialog } = state;
    return { gridParams, editRedemptionDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
