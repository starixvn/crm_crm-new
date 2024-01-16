import React, { Component, Fragment } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import PropTypes from 'prop-types';
import NewCommunitionSetting from './NewCommunitionSetting';
import EditCommunitionSetting from './EditCommunitionSetting';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';

export class AppContainer extends Component {
    static propTypes = {
        createCommunicationPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        deleteCommunicationPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editCommunicationPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        getAllSettings: PropTypes.func
    };

    static defaultProps = {
        createCommunicationPopup: { show: false },
        deleteCommunicationPopup: { show: false },
        editCommunicationPopup: { show: false },
        getAllSettings: function () {
            // nothing
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            policy: null
        };
    }

    componentDidMount() {
        this.props.getAllSettings();
        getPermission(FunctionKey.DefaultCommunicationSetting, Policy.Host).then(response => {
            this.setState({policy: response});
        });
        document.title = LangHelper.getResource('DefaultCommunicationSetting');
    }

    componentWillUnmount(){
        this.props.resetState();
    }

    handleCloseCreatePopup = isSuccessful => {
        this.props.setCreateCommunicationPopup({ show: false });
        this.props.setCreateCommunicationResult(null);
        if (isSuccessful) {
            this.props.getGridCommunicationSetting(this.props.gridParamsCommunication);
        }
    };

    handleCreateSuccess = () => {
        this.handleCloseCreatePopup();
        this.props.getGridCommunicationSetting(this.props.gridParamsCommunication);
    };

    handleCloseEditPopup = () => {
        this.props.setEditCommunicationPopup({ show: false });
        this.props.setSelectCommunicationId(null);
        this.props.setEditCommunicationResult(null);
    };

    handleEditSuccess = () => {
        this.handleCloseEditPopup();
        this.props.getGridCommunicationSetting(this.props.gridParamsCommunication);
    };

    handleCloseDeletePopup = () => {
        this.props.setDeleteCommunicationPopup({ show: false });
    };

    handleDelete = () => {
        this.props.deleteCommunication(this.props.deleteCommunicationPopup.id).then(data => {
            if (data.isSuccessful) {
                toast.success(LangHelper.getResource('DeleteCommunicationSuccessfully'));
            } else {
                toast.error(data.message);
            }
            this.handleCloseDeletePopup();
            this.props.getGridCommunicationSetting(this.props.gridParamsCommunication);
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
                {
                    this.props.createCommunicationPopup.show &&
                    <NewCommunitionSetting
                        onClose={this.handleCloseCreatePopup}
                        onSuccess={this.handleCreateSuccess}
                    />
                }
                <DataGrid isHost={isHost} />
                {
                    this.props.editCommunicationPopup.show &&
                    <EditCommunitionSetting
                        onClose={this.handleCloseEditPopup}
                        onSuccess={this.handleEditSuccess}
                    />
                }
                {
                    this.props.deleteCommunicationPopup.show &&
                    <SweetModalDialog size='md'
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            <div>Are you sure you want to delete <strong>{'No.' + this.props.deleteCommunicationPopup.index}</strong>?</div>
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleDelete}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCloseDeletePopup}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
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
        gridDataCommunication,
        gridParamsCommunication,
        createCommunicationPopup,
        editCommunicationPopup,
        deleteCommunicationPopup,
        deleteCommunicationResult
    } = state;
    return {
        gridDataCommunication,
        gridParamsCommunication,
        createCommunicationPopup,
        editCommunicationPopup,
        deleteCommunicationPopup,
        deleteCommunicationResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);