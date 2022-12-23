import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import NewAnnouncement from './NewAnnouncement';
import ActionAnnouncement from './ActionAnnouncement';
import DataGrid from './DataGrid';
import Content from './Content';
import LangHelper from '@jsroot/common/langHelper';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import { toast } from 'react-toastify';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
           policy: null
        };
    }

    componentDidMount(){
        getPermission(FunctionKey.Announcement).then(response => {
            this.setState({policy: response});
        });
        document.title = LangHelper.getResource('Announcement');
    }

    componentWillUnmount(){
        this.props.setGridData(null);
    }

    handleCloseNewAnnouncement = () => {
        this.props.setOpenNewAnnouncementPopup({ show: false });
        this.props.setIsRefresh(true);
    }

    handleCreateSuccessAnnouncement = () =>{
        this.props.setCreateAnnouncement(null);
        this.handleCloseNewAnnouncement();
    }

    handleCloseEditAnnouncement = () => {
        this.props.setOpenEditAnnouncementPopup({ show: false });
        this.props.setIsRefresh(true);
    }

    handleEditSuccessAnnouncement = () =>{
        this.props.setEditAnnouncement(null);
        this.handleCloseEditAnnouncement();
    }

    handleCloseViewDetail = () => {
        this.props.setViewDetailPopup({ show: false });
        this.props.setIsRefresh(true);
    };

    handleCloseContent = () => {
        this.props.setContentPopup({ show: false });
        this.props.setIsRefresh(true);
    };

    handleCancel = async announcementId => {
        await this.props.cancelAnnouncementId(announcementId).then(response => {
            this.handleCloseCancelPopup();
            if(response.isSuccessful) {
                toast.success(LangHelper.getResource('CancelAnnouncementSuccessfully'));
            }else{
                toast.error(response.message);
            }
        });
    };

    handleCloseCancelPopup = () => {
        this.props.setOpenCancelAnnouncementPopup({ show: false, announcementId: ''});
        this.props.setIsRefresh(true);
    };

    render() {
        if(!this.state.policy){
            return null;
        }

        const isHost = this.state.policy === Policy.Host;
        const {newAnnouncementPopup, contentPopup, actionAnnouncementPopup, cancelAnnouncementPopup} = this.props;
        return (
            <Fragment>
                <Filter isHost={isHost}/>
                {
                    newAnnouncementPopup.show &&
                    <NewAnnouncement
                        onClose={this.handleCloseNewAnnouncement}
                        onSuccess={this.handleCreateSuccessAnnouncement}
                    />
                }
                <DataGrid isHost={isHost}/>
                {
                   contentPopup.show &&
                    <Content
                        onClose={() => this.handleCloseContent()}
                        data={this.props.contentPopup.data}
                        getLanguages={this.props.getLanguages}
                    />
                }
                {
                    actionAnnouncementPopup.show &&
                    <ActionAnnouncement
                        onClose={this.handleEditSuccessAnnouncement}
                        onSuccess={this.handleEditSuccessAnnouncement}
                    />
                }
                {
                    cancelAnnouncementPopup.show &&
                    <ConfirmPopup
                        size='lg'
                        className='cancelAnnouncement'
                        title={LangHelper.getResource('Confirmation')}
                        content={
                            <div>Are you sure you want to cancel announcement ID: <strong>{cancelAnnouncementPopup.announcementId}</strong>?</div>
                        }
                        onSubmit={() => this.handleCancel(cancelAnnouncementPopup.announcementId)}
                        onClose={this.handleCloseCancelPopup}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        newAnnouncementPopup,
        actionAnnouncementPopup,
        cancelAnnouncementPopup,
        contentPopup
    } = state;

    return {
        newAnnouncementPopup,
        actionAnnouncementPopup,
        cancelAnnouncementPopup,
        contentPopup
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);