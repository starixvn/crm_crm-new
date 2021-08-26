import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import DataGrid from './DataGrid';
import EditContactInforms from './EditContactInforms';
import EditInforms from './EditInforms';
import RemovedAccountLogs from './RemovedAccountLogs';
import RemovedAccountLogDetails from './RemovedAccountLogDetails';
import NewInforms from './NewInforms';
import OptionsEdit from './OptionsEdit';

export class AppContainer extends Component {
    static propTypes = {
        getInforms: PropTypes.func,
        editContactInformDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editInformDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        removedLogDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        removedLogDetailDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        newInformDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        optionDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        getInforms: function (){
            // nothing
        },
        editContactInformDialog: { show: false },
        editInformDialog: { show: false },
        removedLogDialog: { show: false },
        removedLogDetailDialog: { show: false },
        newInformDialog: { show: false },
        optionDialog: { show: false }
    };

    componentDidMount() {
        this.props.getInforms();
    }

    handleCloseEditContactInformDialog = () => {
        this.props.getInforms();
        this.props.setEditContactInformDialog({show: false});
    };

    handleCloseEditInformDialog = () => {
        this.props.getInforms();
        this.props.setEditInformDialog({show: false});
    };

    handleCloseRemovedLogDialog = () => {
        this.props.setRemovedLogDialog({show: false});
    };

    handleCloseRemovedLogDetailDialog = () => {
        this.props.setRemovedLogDetailDialog({show: false});
    };

    handleCloseNewInformDialog = () => {
        this.props.setNewInformDialog({show: false});
    };

    render() {
        const { editContactInformDialog, editInformDialog, removedLogDialog, removedLogDetailDialog, newInformDialog, optionDialog } = this.props;

        return (
            <>
                <DataGrid/>
                {
                    optionDialog.show &&
                    <OptionsEdit/>
                }
                {
                    editContactInformDialog.show &&
                    <EditContactInforms
                        titleId={editContactInformDialog.titleId}
                        onClose={this.handleCloseEditContactInformDialog}
                    />
                }
                {
                    editInformDialog.show &&
                    <EditInforms
                        titleId={editInformDialog.titleId}
                        onClose={this.handleCloseEditInformDialog}
                    />
                }
                {
                    removedLogDialog.show &&
                    <RemovedAccountLogs
                        onClose={this.handleCloseRemovedLogDialog}
                    />
                }
                {
                    removedLogDetailDialog.show &&
                    <RemovedAccountLogDetails
                        onClose={this.handleCloseRemovedLogDetailDialog}
                    />
                }
                {
                    newInformDialog.show &&
                    <NewInforms
                        onClose={this.handleCloseNewInformDialog}
                    />
                }
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        editContactInformDialog, editInformDialog, removedLogDialog, removedLogDetailDialog, newInformDialog, optionDialog } = state;
    return {
        editContactInformDialog, editInformDialog, removedLogDialog, removedLogDetailDialog, newInformDialog, optionDialog
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
