import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Filter from './Filter';
import DataGrid from './DataGrid';
import EditNoOfInquiry from '../../feedback/edit-no-of-inquiry/AppContainer';
import EditCommunicationLog from './EditCommunicationLog';
import CreateCommunicationLog from './CreateCommunicationLog';
import { FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
    static propTypes = {
        editNoOfInquiryDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editCommunicationDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        createCommunicationDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        editNoOfInquiryDialog: { show: false },
        editCommunicationDialog: { show: false },
        createCommunicationDialog: { show: false }
    };

    constructor(props) {
        super(props);
        this.state = {
            customerInfoPolicy: null,
            createUpdateFeedbackPermission: null
        };
    }

    componentDidMount(){
        getPermission(FunctionKey.CreateUpdateFeedbackAndCustomerInfo).then(response => {
            this.setState({customerInfoPolicy: response});
        });

        getPermission(FunctionKey.CreateUpdateFeedbackAndCustomerInfo).then(response => {
            this.setState({createUpdateFeedbackPermission: response});
        });
        document.title = LangHelper.getResource('CRMSystem');
    }

    componentWillUnmount(){
        this.props.resetState();
    }

    handleCloseEditNoInquiryDialog = () => {
        this.props.setEditNoOfInquiryDialog({ show: false });
    };

    handleCloseEditCommunicationDialog = isSuccessful => {
        this.props.setEditCommunicationDialog({ show: false });
        if (isSuccessful) {
            this.props.getLogsByCustomerId(this.props.gridParams);
        }
    };

    handleCloseCreateCommunicationDiaLog = isSuccessful => {
        this.props.setCreateCommunicationDialog({ show: false });
        if (isSuccessful) {
            this.props.setGridParams({ ...this.props.gridParams, pageIndex: 1, pageSize: 100 });
            this.props.getLogsByCustomerId(this.props.gridParams);
        }
    };

    render() {
        const { editNoOfInquiryDialog, editCommunicationDialog, createCommunicationDialog } = this.props;
        const {customerInfoPolicy, createUpdateFeedbackPermission} = this.state;
        if(!customerInfoPolicy || !createUpdateFeedbackPermission){
            return null;
        }

        return (
            <div>
                <Filter id={this.props.id}/>
                <DataGrid customerInfoPolicy={customerInfoPolicy} createUpdateFeedbackPermission={createUpdateFeedbackPermission} />
                {
                    editNoOfInquiryDialog.show &&
                    <EditNoOfInquiry feedbackId={editNoOfInquiryDialog.feedbackId}
                        onClose={this.handleCloseEditNoInquiryDialog}
                    />
                }
                {
                    editCommunicationDialog.show &&
                    <EditCommunicationLog feedbackId={editCommunicationDialog.feedbackId} createUpdateFeedbackPermission={createUpdateFeedbackPermission}
                        onClose={this.handleCloseEditCommunicationDialog}
                    />
                }
                {
                    createCommunicationDialog.show &&
                    <CreateCommunicationLog
                        id={this.props.id}
                        onClose={this.handleCloseCreateCommunicationDiaLog}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editNoOfInquiryDialog, editCommunicationDialog, createCommunicationDialog } = state;
    return { gridParams, editNoOfInquiryDialog, editCommunicationDialog, createCommunicationDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
