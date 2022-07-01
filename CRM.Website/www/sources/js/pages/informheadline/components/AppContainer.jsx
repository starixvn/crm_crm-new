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
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';

export class AppContainer extends Component {
    static propTypes = {
        getInforms: PropTypes.func,
        editContactInformDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editInformDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        removedLogDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        removedLogDetailDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        newInformDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        getInforms: function (){
            // nothing
        },
        editContactInformDialog: { show: false },
        editInformDialog: { show: false },
        removedLogDialog: { show: false },
        removedLogDetailDialog: { show: false },
        newInformDialog: { show: false }
    };

    constructor(props) {
        super(props);
        this.state = {
            contactPolicy: null,
            searchPolicy: null,
            hasHostPermission: null
        };
    }

    componentDidMount(){
        getPermission(FunctionKey.InformHeadlineContact).then(response => {
            this.setState({contactPolicy: response});
        });
        getPermission(FunctionKey.InformHeadlineSearch).then(response => {
            this.setState({searchPolicy: response});
        });
        getPermission(FunctionKey.InformHeadlineContact).then(response => {
            this.setState({hasHostPermission: response});
        });
    }

    componentWillUnmount(){
        this.props.resetState();
     }

    handleCloseEditContactInformDialog = () => {
        this.props.setGridParams({pageIndex: 1, pageSize: 100});
        this.props.setContactInforms(null);
        this.props.setEditedInforms([]);
        this.props.resultEditContactInforms && this.props.getInforms();
        this.props.setResultEditContactInforms(null);
        this.props.setEditContactInformDialog({show: false});
    };

    handleCloseEditInformDialog = () => {
        this.props.setGridParams({pageIndex: 1, pageSize: 100});
        this.props.setEditInforms(null);
        this.props.setEditedInforms([]);
        this.props.resultEditInforms && this.props.getInforms();
        this.props.setResultEditInforms(null);
        this.props.setEditInformDialog({show: false});
        this.props.setFilterData({ values: {}, errors: {} });
    };

    handleCloseRemovedLogDialog = () => {
        this.props.setRemovedLogDialog({show: false});
    };

    handleCloseRemovedLogDetailDialog = () => {
        this.props.setRemovedLogDetailDialog({show: false});
    };

    handleCloseNewInformDialog = () => {
        this.props.setGridParams({pageIndex: 1, pageSize: 100});
        this.props.setNewInforms(null);
        this.props.setEditedInforms([]);
        this.props.setNewInformDialog({show: false});
        this.props.setFilterData({ values: {}, errors: {} });
    };

    render() {
        const {contactPolicy, searchPolicy, hasHostPermission} = this.state;
        if(!contactPolicy || !searchPolicy || !hasHostPermission){
            return null;
        }
        const { editContactInformDialog, editInformDialog, removedLogDialog, removedLogDetailDialog, newInformDialog } = this.props;

        return (
            <>
                <DataGrid contactPolicy={contactPolicy} searchPolicy={searchPolicy}/>
                {
                    editContactInformDialog.show &&
                    <EditContactInforms
                        hasHostPermission={hasHostPermission}
                        titleId={editContactInformDialog.titleId}
                        status={editContactInformDialog.status}
                        onClose={this.handleCloseEditContactInformDialog}
                    />
                }
                {
                    editInformDialog.show &&
                    <EditInforms
                        hasHostPermission={hasHostPermission}
                        searchPolicy={searchPolicy}
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
                        hasHostPermission={hasHostPermission}
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
        editContactInformDialog, editInformDialog, removedLogDialog, removedLogDetailDialog,
        newInformDialog, resultEditContactInforms, resultEditInforms
    } = state;
    return {
        editContactInformDialog, editInformDialog, removedLogDialog, removedLogDetailDialog,
        newInformDialog, resultEditContactInforms, resultEditInforms
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
