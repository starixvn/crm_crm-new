import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import Content from './Content';
import LangHelper from '@jsroot/common/langHelper';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import DateTimeService from '@jsroot/common/dateTimeService';
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
        if (this.props.isLoadGrid) {
            if (this.props.filterParams) {
                const filterParams = this.props.filterParams;
                const params = {
                    announcementId: filterParams.announcementId,
                    fromDate: filterParams.announcementId ? null : DateTimeService.toLongDateTimeFormat(DateTimeService.startOfDay(new Date(filterParams.fromDate))),
                    toDate: filterParams.announcementId ? null : DateTimeService.toLongDateTimeFormat(DateTimeService.startOfDay(new Date(filterParams.toDate))),
                    title: filterParams.title,
                    status: filterParams.status,
                    pageIndex: filterParams.pageIndex,
                    pageSize: filterParams.pageSize
                }
                this.props.setGridParams(params);
                this.props.getGridData(params);
            } else {
                this.props.getGridData(this.props.gridParams);
            }
            window.history.replaceState(null, '');
        }
    }

    componentWillUnmount(){
        this.props.setGridData(null);
        this.props.resetState();
    }

    handleCloseContent = () => {
        this.props.setContentPopup({ show: false });
        this.props.setIsRefresh(true);
    };

    handleCancel = async (announcementId, status) => {
        await this.props.cancelAnnouncementId(announcementId, status).then(response => {
            this.handleCloseCancelPopup();
            if(response.isSuccessful) {
                toast.success(LangHelper.getResource('CancelAnnouncementSuccessfully'));
                this.props.getGridData(this.props.gridParams);
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
        const {contentPopup, cancelAnnouncementPopup} = this.props;

        return (
            <Fragment>
                <Filter isHost={isHost} isLoadGrid={this.props.isLoadGrid} filterParams={this.props.filterParams}/>
                <DataGrid isHost={isHost}/>
                {
                   contentPopup.show &&
                    <Content
                        id={contentPopup.announcementId}
                        onClose={this.handleCloseContent}
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
                        onSubmit={() => this.handleCancel(cancelAnnouncementPopup.announcementId, cancelAnnouncementPopup.status)}
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
        cancelAnnouncementPopup,
        contentPopup,
        gridParams
    } = state;

    return {
        cancelAnnouncementPopup,
        contentPopup,
        gridParams
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);