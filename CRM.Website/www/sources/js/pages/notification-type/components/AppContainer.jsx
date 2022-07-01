import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import NewNotificationType from './NewNotificationType';
import EditNotificationType from './EditNotificationType';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import LangHelper from '@jsroot/common/langHelper';
import { toast } from 'react-toastify';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';


export class AppContainer extends Component {
    static defaultProps = {
        createNotificationTypePopup: { show: false},
        editNotificationTypePopup: { show: false},
        deleteNotificationTypePopup: { show: false }
    };

    constructor(props) {
        super(props);
        this.state = {
            policy: null
        };
    }
    componentDidMount(){
        getPermission(FunctionKey.NotificationType).then(response => {
            this.setState({policy: response});
        });
    }

    componentWillUnmount(){
        this.props.resetState();
    }

    handleCloseCreatePopup = () => {
        this.props.setCreateNotificationTypePopup({ show: false });
        this.props.setCreateNotificationTypeResult(null);
    };

    handleCloseEditPopup = () => {
        this.props.setEditNotificationTypePopup({ show: false });
        this.props.setEditNotificationTypeResult(null);
    };

    handleCreateSuccess = () => {
        this.handleCloseCreatePopup();
        this.props.getNotificationTypeGridData(this.props.notificationTypeGridParams);
    };

    handleEditSuccess = () => {
        this.handleCloseEditPopup();
        this.props.getNotificationTypeGridData(this.props.notificationTypeGridParams);
    };

    handleCloseDeletePopup = () => {
        this.props.setDeleteNotificationTypePopup({ show: false });
    };

    handleDelete = () => {
        const { notificationTypeId, name } = this.props.deleteNotificationTypePopup;
        const params = { notificationTypeId: notificationTypeId, notificationTypeName: name };
        this.props.deleteNotificationType(params).then(data => {
            this.handleCloseDeletePopup();
            this.props.getNotificationTypeGridData(this.props.notificationTypeGridParams);
            if (data.isSuccessful) {
                toast.success(LangHelper.getResource('DeleteNotificationTypeSuccessfully'));
            } else {
                toast.error(data.message);
            }
        });
    };

    render() {
        if(!this.state.policy){
            return null;
        }
        const isHost = this.state.policy === Policy.Host;

        return (
            <Fragment>
                <Filter isHost={isHost} />
                <DataGrid isHost={isHost} />
                {
                    this.props.createNotificationTypePopup.show &&
                    <NewNotificationType
                        onClose={this.handleCloseCreatePopup}
                        onSuccess={this.handleCreateSuccess}
                    />
                }
                {
                    this.props.editNotificationTypePopup.show &&
                    <EditNotificationType
                        onClose={this.handleCloseEditPopup}
                        onSuccess={this.handleEditSuccess}
                    />
                }
                {
                    this.props.deleteNotificationTypePopup.show &&
                    <ConfirmPopup
                        title={LangHelper.getResource('Confirmation')}
                        content={
                            <div>Are you sure you want to delete <strong>{this.props.deleteNotificationTypePopup.name}</strong>?</div>
                        }
                        onSubmit={this.handleDelete}
                        onClose={this.handleCloseDeletePopup}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        notificationTypeGridParams,
        createNotificationTypePopup,
        editNotificationTypePopup,
        deleteNotificationTypePopup
    } = state;
    return {
        notificationTypeGridParams,
        createNotificationTypePopup,
        editNotificationTypePopup,
        deleteNotificationTypePopup
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);