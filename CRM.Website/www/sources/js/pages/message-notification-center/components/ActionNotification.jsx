import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Col, Form, Row, Tabs, Tab, Button } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import WithNavigation from '@jsroot/components/WithNavigation';
import Site from '@jsroot/common/site';

export class ActionNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'English',
            data: null,
            sites: null,
            confirmActionDialog: { show: false, params: null, content: null },
            content: {
                content_en: null,
                content_cs: null,
                content_ch: null
            }
        }

        this.languages = [
            {
                name: "English",
                mapLabel: "content_en"
            },
            {
                name: "Simplified Chinese",
                mapLabel: "content_cs"
            },
            {
                name: "Traditional Chinese",
                mapLabel: "content_ch"
            }
        ]
    }

    componentDidMount() {
        this.getAdmNotificationDetail();
    };

    getAdmNotificationDetail = async () =>{
        const { notificationId } = this.props.actionParam;
        Site.blockUI();
        await this.props.getAdmNotificationById(notificationId).then(response => {
            const { notificationDetails, sites } = response.data;
            const notificationDetail = notificationDetails[0];
            this.setState({data: notificationDetail, sites});
            this.getContentByLanguage(notificationDetail);
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());    
    };

    getContentByLanguage = notification => {
        const content = {...this.state.content};
        content.content_en = notification.content_en;
        content.content_cs = notification.content_cs;
        content.content_ch = notification.content_ch;
        this.setState({content});
    };

    handleChangeTab = selected =>{
        this.setState({tab: selected});
    };

    handleSaveDraft = (x,y) => {

    };

    getStateData = () => {
        const stateData = {
            isLoadGrid: true,
            filterParams: this.props.actionParam?.redirectParams
        };
        return stateData;
    };

    handleClose = () => {
        this.props.navigate(Site.resolveClientUrl('MessageNotificationCenter'), { state: this.getStateData() });
    };

    handleSubmit = () => {

    };

    renderSites = (item, index) => (
        <div key={index} className='child-item'>
            <span>{item.name}: </span>
            <span>{item.data}</span>
        </div>
    );

    render() {
        const { content } = this.state;

        console.log('this.props.actionParam', this.props.actionParam);

        const totalCredit = [
            { name: '789y', data: 'y789, y889' },
            { name: 'IBC', data: '776666B, IBCIndo' },
            { name: 'MBC', data: '2222223, 22222278, 7333333' },
        ];
        const totalLicensee = [
            { name: 'Normal sites', data: 'lic1, lic2, lic3, lic4' }
        ];
        return (
            <Form noValidate onSubmit={this.handleSubmit}>
                <div className="action-notification">
                    <div className='action-content'>
                        <Form.Row bsPrefix='form-row'>
                            <Form.Group className='info-notice'>
                                <Form.Label className='infoId'>{LangHelper.getResource('NotificationID_MsgID')}</Form.Label>
                                <div>1000</div>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row bsPrefix='form-row'>
                            <Form.Group className='info-notice'>
                                <Form.Label className='infoId'>{LangHelper.getResource('Status')}</Form.Label>
                                <div className='status-button status-New'>New</div>
                            </Form.Group>
                        </Form.Row>
                        <div className="group-item">
                            <div className="group-header">{LangHelper.getResource('EventInfo')}</div>
                            <div className="group-content">
                                <div className="content-item">
                                    <Form.Group as={Row}>
                                        <Form.Label className='text-bold' htmlFor="eventDate">
                                            {LangHelper.getResource('EventDateGMT4')}
                                        </Form.Label>
                                        <div>Dec 12, 2024</div>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label className='text-bold' htmlFor="eventName">
                                            {LangHelper.getResource('EventName')}
                                        </Form.Label>
                                        <div>Team A -vs- Team B</div>
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <div className="group-item">
                            <div className="group-header">{LangHelper.getResource('Sites')}</div>
                            <div className="group-content">
                                <div className="content">
                                    <div className='content-parent'>
                                        <span className='text-bold'>
                                            {LangHelper.getResource('CreditTotalTickets')}
                                        </span>
                                        <span className='link-ticket'>500</span>
                                    </div>
                                    <div className='content-child'>
                                        {
                                            totalCredit.map((item, key) => this.renderSites(item, key))
                                        }
                                    </div>
                                    <div className='content-parent'>
                                        <span className='text-bold'>
                                            {LangHelper.getResource('LicenseeTotalTickets')}
                                        </span>
                                        <span className='link-ticket'>400</span>
                                    </div>
                                    <div className='content-child'>
                                        {
                                            totalLicensee.map((item, key) => this.renderSites(item, key))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="group-item">
                            <div className="group-header">{LangHelper.getResource('Content')}</div>
                            <div className="group-language">
                                <Col sm={12} md={12}>
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
                                                        data={content[language.mapLabel]}
                                                        username={window.currentUsername}
                                                        // onChange={value => {
                                                        //     setFieldValue(`content.${[language.mapLabel]}`, value);
                                                        //     setFieldValue(`cloneContent.${[language.mapLabel]}`, value);
                                                        // }}
                                                        isRemoveToolbarForChatbot
                                                    />
                                                </Tab>)
                                            )
                                        }
                                    </Tabs>               
                                </Col>
                            </div>
                        </div>

                        <div className="group-btn">
                            <Button className="btn-cancel" variant="primary" size="sm" onClick={this.handleClose}>{LangHelper.getResource('Cancel')}</Button>
                            <Button className="btn-save" variant="primary" size="md" onClick={event => this.handleSaveDraft(event, values)}>{LangHelper.getResource('Save as Draft')}</Button>
                            <Button className="btn-send" type="submit" variant="primary" size="sm">{LangHelper.getResource('Push')}</Button>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams } = state;
    return { gridParams };
};

const ActionNotificationNavigation = WithNavigation(ActionNotification);

export default connect(mapStateToProps, mapDispatchToProps)(ActionNotificationNavigation);