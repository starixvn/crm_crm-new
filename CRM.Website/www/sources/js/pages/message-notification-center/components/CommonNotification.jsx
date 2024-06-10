import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Col, Form, Tabs, Tab, Button } from 'react-bootstrap';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import CkEditor from '@jsroot/components/ckeditor/index';
import DateTimeService from '@jsroot/common/dateTimeService';
import Site from '@jsroot/common/site';
import { filterAndSortSites, languageOptions } from '../common.functions';
import AffectedTicket from './AffectedTicket';

export class CommonNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'English',
            data: null,
            sites: null,
            confirmActionDialog: { show: false, params: null, content: null },
            affectedTicketPopup: { show: false, isCredit: true, siteTickets: null },
            isSubmitting: false,
            pushPopup: { show: false },
            savePopup: { show: false },
            activatePopup: { show: false },
            messageSuccessful: null,
            errorMessages: { isSuccessful: true, messages: [] }
        }

        this.languages = languageOptions(this.props.actionParam.isOstUser);
    }

    componentDidMount() {
        this.getAdmNotificationDetail();
        this.props.isEdit && this.props.setEditAdmNotification(null);
    };

    getAdmNotificationDetail = async () =>{
        const { notificationId } = this.props.actionParam;
        Site.blockUI();
        await this.props.getAdmNotificationById(notificationId).then(response => {
            const { notificationDetails, sites } = response.data;
            const notificationDetail = notificationDetails[0];
            this.setState({data: notificationDetail, sites});
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
    };

    getParams = status => {
        const { content_en, content_cs, content_ch, subject } = this.state.data;
        const params = {
            notificationId: this.props.actionParam.notificationId,
            newStatus: status,
            newSubject: subject,
            newContentEN: content_en,
            newContentCS: content_cs,
            newContentCH: this.props.actionParam.isOstUser ? content_ch : null,
            subject: subject
        };
        return params;
    };

    handleChangeTab = selected =>{
        this.setState({tab: selected});
    };

    handleOpenPopup = async siteType => {
        const { notificationId } = this.props.actionParam;
        Site.blockUI();
        await this.props.getSiteTicketsById(notificationId).then(response => {
            const siteTickets = response.data;
            this.setState({ affectedTicketPopup: { show: true, isCredit: siteType === 'Credit', siteTickets }})
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
    };

    handleCreateNotification = async (params, message) => {
        await this.props.editAdmNotification(params).then(() => {
            this.handleClosePopup();
            if (this.props.editAdmNotificationResult.isSuccessful) {
                this.setState({ messageSuccessful: message });
                setTimeout(() => {
                    this.props.setEditAdmNotification(null);
                    this.props.navigate(Site.resolveClientUrl('NotificationCenter'), { state: this.getStateData() });
                }, 3000);
            } else {
                this.setState({ isSubmitting: false });
            }
        });
    };

    handleSaveDraft = async event => {
        this.setState({ isSubmitting: true });
        event.preventDefault();

        const params = this.getParams('Draft');
        const message = LangHelper.getResource('UpdateNotificationSuccessfully');
        await this.handleCreateNotification(params, message);
    };

    handleSubmitConfirm = async () => {
        const status = this.props.actionParam.isOstUser ? 'Sending' : 'Active';
        const params = this.getParams(status);
        const message = status === 'Sending' ? 'SendNotificationSuccessfully' : 'ActiveNotificationSuccessfully';
        await this.handleCreateNotification(params, LangHelper.getResource(message));
    };

    handleSaveConfirm = async () => {
        const params = this.getParams(this.state.data.status);
        const message = LangHelper.getResource('UpdateNotificationSuccessfully');
        await this.handleCreateNotification(params, message);
    };

    getStateData = () => {
        const stateData = {
            isLoadGrid: true,
            filterParams: this.props.actionParam?.redirectParams
        };
        return stateData;
    };

    handleClose = () => {
        this.props.setEditAdmNotification(null);
        this.props.navigate(Site.resolveClientUrl('NotificationCenter'), { state: this.getStateData() });
    };

    handleOpenPopup = async siteType => {
        const { notificationId } = this.props.actionParam;
        Site.blockUI();
        await this.props.getSiteTicketsById(notificationId).then(response => {
            const siteTickets = response.data;
            this.setState({ affectedTicketPopup: { show: true, isCredit: siteType === 'Credit', siteTickets }})
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
    };

    handleClosePopup = () => {
        this.setState({
            affectedTicketPopup: { show: false, isCredit: true, siteTickets: null },
            pushPopup: { show: false },
            savePopup: { show: false },
            activatePopup: { show: false }
        });
    };

    renderSiteSection = (sites, title, ticketCnt) => {
        if (sites.length === 0) {
            return null;
        }
        return (
            <div>
                <div className='content-parent'>
                    <span className='text-bold'>{title}</span><span onClick={() => this.handleOpenPopup(sites[0].siteType)} className='link-ticket'>{ticketCnt}</span>
                </div>
                {sites.map((item, index) => (
                    <div key={`${item.siteGroup}-${index}`} className='text-line content-child'>
                        {item.siteGroup}: <span className={this.state.data.status === 'Failed' ? 'failed-siteName' : ''}>{item.siteNames}</span>
                    </div>
                ))}
            </div>
        );
    };

    getTicketCount = sites => sites.reduce((count, item) => count + item.ticketCnt, 0);

    renderMapSite = () => {
        const creditSites = filterAndSortSites(this.state.sites, 'Credit');
        const licenseeSites = filterAndSortSites(this.state.sites, 'Licensee');

        return (
            <div>
                {this.renderSiteSection(creditSites, LangHelper.getResource('CreditTotalTickets'), this.getTicketCount(creditSites))}
                {this.renderSiteSection(licenseeSites, LangHelper.getResource('LicenseeTotalTickets'), this.getTicketCount(licenseeSites))}
            </div>
        );
    };

    handleChange = (name, value) => {
        this.setState({
            data: {...this.state.data, [name]: value}
        });
    };

    handleClosePopup = () => {
        this.setState({
            affectedTicketPopup: { show: false, isCredit: true, siteTickets: null },
            pushPopup: { show: false },
            savePopup: { show: false },
            activatePopup: { show: false }
        });
    };

    handleActive = popup => {
        const isSuccessful = this.validateForm();
        if (isSuccessful) {
            this.setState({[popup]: { show: true }});
        }
    };

    validateForm = () => {
        const { subject, content_en, content_cs, content_ch } = this.state.data;
        const { isOstUser } = this.props.actionParam;

        const errors = [];
        let isSuccessful = true;

        if (!subject && !isOstUser) {
            errors.push(LangHelper.getResource('SubjectRequired'));
            isSuccessful = false;
        }

        if (!content_en) {
            errors.push(LangHelper.getResource('EnglishContentRequired'));
            isSuccessful = false;
        }

        if (!content_cs) {
            errors.push(LangHelper.getResource('SimplifiedChineseContentRequired'));
            isSuccessful = false;
        }

        if (!content_ch && isOstUser) {
            errors.push(LangHelper.getResource('TraditionalChineseContentRequired'));
            isSuccessful = false;
        }

        this.setState({
            errorMessages: {
                isSuccessful,
                messages: errors
            }
        });
    
        return isSuccessful;
    };

    isRenderPopupAction = () => {
        const { pushPopup, savePopup, activatePopup } = this.state;
        return pushPopup.show || savePopup.show || activatePopup.show;
    };

    renderConfirmPopup = () => {
        const popups = [
            { data: this.state.pushPopup, status: 'push', handler: 'handleSubmitConfirm' },
            { data: this.state.savePopup, status: 'update', handler: 'handleSaveConfirm' },
            { data: this.state.activatePopup, status: 'activate', handler: 'handleSubmitConfirm' }
        ];
        const activePopup = popups.find(popup => popup.data.show);
        const { status, handler } = activePopup;

        if (!activePopup) {
            return null;
        }

        return (
            <ConfirmPopup
                size='lg'
                className='confirmNotification'
                title={LangHelper.getResource('Confirmation')}
                content={
                    <div>
                        Are you sure you want to {status} this notification?
                    </div>
                }
                onSubmit={() => this[handler]()}
                onClose={this.handleClosePopup}
            />
        );
    };


    renderButton = () => {
        const isOstUser = this.props.actionParam.isOstUser;

        if (isOstUser) {
            return(
                <>
                    <Button className="btn-save" variant="primary" size="md" disabled={this.state.isSubmitting} onClick={event => this.handleSaveDraft(event)}>{LangHelper.getResource('Save as Draft')}</Button>
                    <Button className="btn-send" variant="primary" size="sm" disabled={this.state.isSubmitting} onClick={() => this.handleActive('pushPopup')}>{LangHelper.getResource('Push')}</Button>
                </>
            )
        } else {
            return (
                <>
                    <Button className="btn-save" variant="primary" size="md" disabled={this.state.isSubmitting} onClick={() => this.handleActive('savePopup')}>{LangHelper.getResource('Save')}</Button>
                    <Button className="btn-send" variant="primary" size="sm" disabled={this.state.isSubmitting} onClick={() => this.handleActive('activatePopup')}>{LangHelper.getResource('Activate')}</Button>
                </>
            )
        }
    };

    renderMessage = (result, message) =>{
        if(!result.isSuccessful){
            return result.message.split(';');
        }else{
            return [result.message || message];
        }
    };

    render = () => {
        const { data, affectedTicketPopup, messageSuccessful, errorMessages } = this.state;
        const { editAdmNotificationResult, isEdit, actionParam } = this.props;
        const { isOstUser } = actionParam;
        const headerClass = isOstUser ? 'group-header required' : 'group-header';
        const resourceKey = isOstUser ? 'Content' : 'SubjectAndContent';

        if(!data) {
            return null;
        }
        return (
            <>
                {
                    !errorMessages.isSuccessful &&
                    <ResponseMessage isSuccessful={errorMessages.isSuccessful} messages={errorMessages.messages}/>
                }
                {
                    editAdmNotificationResult &&
                    <ResponseMessage isSuccessful={editAdmNotificationResult.isSuccessful}
                        messages={this.renderMessage(editAdmNotificationResult, messageSuccessful)}
                    />
                }
                <div className="action-notification">
                    <div className='action-content'>
                        <Form.Row bsPrefix='form-row'>
                            <Form.Group className='info-notice'>
                                <Form.Label className='infoId'>{LangHelper.getResource('NotificationID_MsgID')}</Form.Label>
                                <div>{data.notificationID}</div>
                                { data.messageID && <span className='pl-2'>{`(Msg: ${data.messageID})`}</span> }
                            </Form.Group>
                            <Form.Group className='info-notice'>
                                <Form.Label className='infoId'>{LangHelper.getResource('Status')}</Form.Label>
                                <div className={`status-button status-${data.status}`}>{data.status}</div>
                            </Form.Group>
                        </Form.Row>
                        <div className="group-item">
                            <div className="group-header">{LangHelper.getResource('EventInfo')}</div>
                            <div className="group-content">
                                <Form.Group className='info-event'>
                                    <Form.Label className='text-bold' htmlFor="eventDate">
                                        {LangHelper.getResource('EventDateGMT4')}
                                    </Form.Label>
                                    <div>{data.eventDate ? DateTimeService.toShortDateFormat(data.eventDate) : null}</div>
                                </Form.Group>
                                <Form.Group className='info-event'>
                                    <Form.Label className='text-bold event-name' htmlFor="eventName">
                                        {LangHelper.getResource('EventName')}
                                    </Form.Label>
                                    <div>{data.eventName}</div>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="group-item">
                            <div className="group-header">{LangHelper.getResource('Sites')}</div>
                            <div className="group-content">
                                <div className="content">
                                    {
                                        this.renderMapSite()
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="group-item">
                            <div className={headerClass}>{LangHelper.getResource(resourceKey)}</div>
                            {
                                !isOstUser &&
                                (
                                    <Form.Group className='info-subject'>
                                        <Form.Label className='text-bold required' htmlFor="subject">
                                            {LangHelper.getResource('Subject')}
                                        </Form.Label>
                                        <Form.Control className='shadow-none' type="text" id="subject"
                                            autoComplete="off" name="subject" value={data.subject}
                                            onChange={event => this.handleChange('subject', event.target.value)}
                                        />
                                    </Form.Group>
                                )
                            }
                            <div className="group-language">
                                <Col sm={12} md={12}>
                                    {
                                        !isOstUser &&
                                        (
                                            <Form.Label className='text-bold required' htmlFor="content">
                                                {LangHelper.getResource('Content')}
                                            </Form.Label>
                                        )
                                    }
                                    <Tabs
                                        className='languages-text'
                                        id="controlled-tab"
                                        activeKey={this.state.tab}
                                        onSelect={selected => this.handleChangeTab(selected)}
                                    >
                                        {
                                            this.languages.map((language, key) =>
                                                (<Tab key={key} eventKey={language.name} title={language.name}>
                                                    <CkEditor
                                                        name={language.name}
                                                        data={data[language.mapLabel]}
                                                        username={window.currentUsername}
                                                        onChange={value => isEdit ? this.handleChange(language.mapLabel, value) : null}     
                                                        isRemoveToolbarForChatbot
                                                        isRemoveAllToolbar={actionParam.isOstUser || !isEdit}
                                                    />
                                                </Tab>)
                                            )
                                        }
                                    </Tabs>
                                </Col>
                            </div>
                        </div>
                        {
                            isEdit && (
                                <div className="group-btn">
                                    <Button className="btn-cancel" variant="primary" size="sm" onClick={() => this.handleClose()}>{LangHelper.getResource('Cancel')}</Button>
                                    {
                                        this.renderButton()
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    affectedTicketPopup.show &&
                    <AffectedTicket
                        notificationId={data.notificationID}
                        eventDate={data.eventDate}
                        eventName={data.eventName}
                        exportExcel={this.props.exportExcel}
                        isCredit={affectedTicketPopup.isCredit}
                        siteTickets={affectedTicketPopup.siteTickets}
                        onClose={this.handleClosePopup}
                    />
                }
                {
                    this.props.isEdit && this.isRenderPopupAction() &&
                    this.renderConfirmPopup()
                }
            </>
        )
    };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editAdmNotificationResult } = state;
    return { gridParams, editAdmNotificationResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonNotification);