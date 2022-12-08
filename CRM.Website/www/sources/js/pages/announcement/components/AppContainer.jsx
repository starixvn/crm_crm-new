import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import NewAnnouncement from './NewAnnouncement';
import DataGrid from './DataGrid';
import Content from './Content';
import LangHelper from '@jsroot/common/langHelper';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
           policy: null
        };
    }

    componentDidMount(){
        getPermission(FunctionKey.NotificationList).then(response => {
            this.setState({policy: response});
        });
        document.title = LangHelper.getResource('Announcement');
    }

    componentWillUnmount(){
        this.props.setGridData(null);
    }

    closeConfirmPopup = () => this.props.setConfirmPopup({ show: false });

    handleCloseNewAnnouncement = () => this.props.setOpenNewAnnouncementPopup({ show: false });

    handleCreateSuccessAnnouncement = () =>{
        this.props.setCreateAnnouncement(null);
        this.handleCloseNewAnnouncement();
    }

    handleCloseViewDetail = () => {
        this.props.setViewDetailPopup({ show: false });
        this.props.setIsRefresh(true);
    };

    handleCloseContent = () => {
        this.props.setContentPopup({ show: false });
        this.props.setIsRefresh(true);
    };

    render() {
        if(!this.state.policy){
            return null;
        }

        const isHost = this.state.policy === Policy.Host;
        return (
            <Fragment>
                <Filter isHost={isHost}/>
                {
                    this.props.newAnnouncementPopup.show &&
                    <NewAnnouncement
                        onClose={this.handleCloseNewAnnouncement}
                        onSuccess={this.handleCreateSuccessAnnouncement}
                    />
                }
                <DataGrid isHost={isHost}/>
                {
                    this.props.contentPopup.show &&
                    <Content
                        onClose={() => this.handleCloseContent()}
                        data={this.props.contentPopup.data}
                    />
                }
                {
                    this.props.confirmPopup.show &&
                    <ConfirmPopup
                        size='lg'
                        title={LangHelper.getResource('Confirmation')}
                        content={
                            <div>{LangHelper.getResource('ThereAreSomeChangesConfirmMessage')}</div>
                        }
                        onSubmit={() => {
                            this.closeConfirmPopup();
                            this.props.confirmPopup.onOk();
                        }}
                        onClose={() => this.closeConfirmPopup()}
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
        contentPopup
    } = state;

    return {
        newAnnouncementPopup,
        contentPopup
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);