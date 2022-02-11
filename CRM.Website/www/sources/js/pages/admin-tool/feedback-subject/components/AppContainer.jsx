import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import PropTypes from 'prop-types';
import DataGrid from './DataGrid';
import NewFeedbackSubject from './NewFeedbackSubject';
import EditFeedbackSubject from './EditFeedbackSubject';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        createFeedbackSubjectPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editStatusFeedbackSubjectPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        editFeedbackSubjectPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        isHost: PropTypes.bool.isRequired,
        getFeedBackSubject: PropTypes.func,
        getAllActiveFeedbackSubject: PropTypes.func
    };

    static defaultProps = {
        isHost: false,
        createFeedbackSubjectPopup: { show: false },
        editStatusFeedbackSubjectPopup: { show: false },
        editFeedbackSubjectPopup: { show: false },
        getFeedBackSubject: function() {
            //nothing
        },
        getAllActiveFeedbackSubject: function() {
            //nothing
        }
    };

    componentDidMount() {
        this.props.getFeedBackSubject(this.props.gridParams);
        this.props.getAllActiveFeedbackSubject();
    }

    handleCloseCreatePopup = () => {
        this.props.setCreateFeedbackSubjectPopup({ show: false });
        this.props.setCreateFeedbackSubjectResult(null);
    };

    handleCreateSuccess = () => {
        this.handleCloseCreatePopup();
        this.props.getFeedBackSubject(this.props.gridParams);
    };

    handleCloseEditStatusPopup = () => {
        this.props.setEditStatusFeedbackSubjectPopup({ show: false });
    };

    handleCloseEditPopup = () => {
        this.props.setEditFeedbackSubjectPopup({ show: false });
        this.props.setEditFeedbackSubjectResult(null);
        this.props.setSelectFeedbackSubjectId(null);
    };

    handleEditSuccess = () => {
        this.handleCloseEditPopup();
        this.props.getFeedBackSubject(this.props.gridParams);
    };

    handleEditStatus = () => {
        const data = {
            templateId: this.props.editStatusFeedbackSubjectPopup.id,
            isActive: !this.props.editStatusFeedbackSubjectPopup.isActive
        };
        this.props.editStatusFeedbackSubject(data).then(response => {
            this.props.getFeedBackSubject(this.props.gridParams);
            this.handleCloseEditStatusPopup();
            if (response.data.isSuccessful) {
                if (data.isActive === true) {
                    toast.success(LangHelper.getResource('ActiveFeedBackSubjectTemplateSuccessfully'));
                } else {
                    toast.success(LangHelper.getResource('DeActiveFeedBackSubjectTemplateSuccessfully'));
                }
            } else {
                toast.error(response.data.message);
            }
        });
    };

    render() {
        return (
            <Fragment>
                <Filter isHost={this.props.isHost}/>
                {
                    this.props.createFeedbackSubjectPopup.show &&
                    <NewFeedbackSubject
                        onClose={this.handleCloseCreatePopup}
                        onSuccess={this.handleCreateSuccess}
                    />
                }
                <DataGrid isHost={this.props.isHost}/>
                {
                    this.props.editFeedbackSubjectPopup.show &&
                    <EditFeedbackSubject
                        onClose={this.handleCloseEditPopup}
                        onSuccess={this.handleEditSuccess}
                    />
                }
                {
                    this.props.editStatusFeedbackSubjectPopup.show &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            <div>Are you sure you want to <span>{this.props.editStatusFeedbackSubjectPopup.isActive ? 'deactivate' : 'activate'}
                            </span> Feedback Subject Template <strong>{'' + this.props.editStatusFeedbackSubjectPopup.id}</strong>?</div>
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleEditStatus}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCloseEditStatusPopup}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={this.handleCloseEditStatusPopup}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridParams,
        createFeedbackSubjectPopup,
        editStatusFeedbackSubjectPopup,
        editFeedbackSubjectPopup
    } = state;
    return {
        gridParams,
        createFeedbackSubjectPopup,
        editStatusFeedbackSubjectPopup,
        editFeedbackSubjectPopup
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);