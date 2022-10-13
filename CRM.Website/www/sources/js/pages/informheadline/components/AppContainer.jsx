import React, { Component, Suspense,  lazy} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
const DataGrid = lazy(() => import('./DataGrid'));
const EditContactInforms = lazy(() => import('./EditContactInforms'));
const EditInforms = lazy(() => import('./EditInforms'));
const RemovedAccountLogs = lazy(() => import('./RemovedAccountLogs'));
const RemovedAccountLogDetails = lazy(() => import('./RemovedAccountLogDetails'));
const NewInforms = lazy(() => import('./NewInforms'));
import LangHelper from '@jsroot/common/langHelper';

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

    async componentDidMount() {
        await Promise.all([this.props.getInforms(), this.props.getAllSettings(), this.props.getPermissions()]);
        document.title = LangHelper.getResource('InformHeadlines');
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

        const { editContactInformDialog, editInformDialog, removedLogDialog,
                removedLogDetailDialog, newInformDialog, allSettings, permissions } = this.props;
        if (!allSettings || !permissions) {
            return null;
        }

        return (
            <>
                <Suspense fallback={<div />}>
                    <DataGrid/>
                </Suspense>
                {
                    editContactInformDialog.show &&
                    <Suspense fallback={<div />}>
                        <EditContactInforms
                            titleId={editContactInformDialog.titleId}
                            status={editContactInformDialog.status}
                            onClose={this.handleCloseEditContactInformDialog}
                        />
                    </Suspense>
                }
                {
                    editInformDialog.show &&
                    <Suspense fallback={<div />}>
                        <EditInforms
                            titleId={editInformDialog.titleId}
                            onClose={this.handleCloseEditInformDialog}
                        />
                    </Suspense>
                }
                {
                    removedLogDialog.show &&
                    <Suspense fallback={<div />}>
                        <RemovedAccountLogs
                            onClose={this.handleCloseRemovedLogDialog}
                        />
                    </Suspense>
                }
                {
                    removedLogDetailDialog.show &&
                    <Suspense fallback={<div />}>
                        <RemovedAccountLogDetails
                            onClose={this.handleCloseRemovedLogDetailDialog}
                        />
                    </Suspense>
                }
                {
                    newInformDialog.show &&
                    <Suspense fallback={<div />}>
                        <NewInforms
                            onClose={this.handleCloseNewInformDialog}
                        />
                    </Suspense>
                }
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        editContactInformDialog, editInformDialog, removedLogDialog, removedLogDetailDialog,
        newInformDialog, resultEditContactInforms, resultEditInforms, allSettings, permissions
    } = state;
    return {
        editContactInformDialog, editInformDialog, removedLogDialog, removedLogDetailDialog,
        newInformDialog, resultEditContactInforms, resultEditInforms, allSettings, permissions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
